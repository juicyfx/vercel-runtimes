const fs = require('fs');
const { spawn } = require('child_process');
const { join: pathJoin } = require('path');
const { parse: parseUrl } = require('url');

function normalizeEvent(event) {
  if (event.Action === 'Invoke') {
    const invokeEvent = JSON.parse(event.body);

    const {
      method, path, headers, encoding,
    } = invokeEvent;

    let { body } = invokeEvent;

    if (body) {
      if (encoding === 'base64') {
        body = Buffer.from(body, encoding);
      } else if (encoding === undefined) {
        body = Buffer.from(body);
      } else {
        throw new Error(`Unsupported encoding: ${encoding}`);
      }
    }

    return {
      method,
      path,
      headers,
      body,
    };
  }

  const {
    httpMethod: method, path, headers, body,
  } = event;

  return {
    method,
    path,
    headers,
    body,
  };
}

function isDirectory(p) {
  return new Promise((resolve) => {
    fs.stat(p, (error, s) => {
      if (error) {
        resolve(false);
        return;
      }

      if (s.isDirectory()) {
        resolve(true);
        return;
      }

      resolve(false);
    });
  });
}

async function transformFromAwsRequest({
  method, path, headers, body,
}) {
  const { pathname, search } = parseUrl(path);

  let filename = pathJoin(
    '/var/task/user',
    process.env.NOW_ENTRYPOINT || pathname,
  );
  if (await isDirectory(filename)) {
    if (!filename.endsWith('/')) {
      filename += '/';
      requestUri = pathname + '/' + (search || '');
    }
    filename += 'index.php';
  }

  return { filename, stdin: body };
}

function query({ filename, stdin }) {
  console.log(`Spawning: php ${filename}`);

  return new Promise((resolve) => {
    var response = '';

    const php = spawn(
      './php',
      ['-c', 'php.ini', filename],
      {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: '/var/task/native',
        env: {
          LD_LIBRARY_PATH: '/var/task/native/modules:' + (process.env.LD_LIBRARY_PATH || '')
        }
      },
    );

    // Output
    php.stdout.on('data', function (data) {
      response += data.toString()
    });

    // Logging
    php.stderr.on('data', function (data) {
      console.errror(`STDERR: ${data}`);
    });

    // PHP script execution end
    php.on('close', function (code) {
      if (code !== 0) {
        resolve(`PHP process error code ${code}: ${response}`);
      } else {
        resolve(response);
      }
    });

    php.on('error', function (err) {
      resolve(`PHP process error ${err}`);
      return;
    });

    php.on('exit', function (code, signal) {
      if (code !== 0) {
        resolve(`PHP process error code ${code} and signal ${signal}: ${response}`);
      } else {
        resolve(response);
      }
    });
  })
}

function transformToAwsResponse(body) {
  return {
    statusCode: 200,
    body: Buffer.from(body).toString('base64'),
    encoding: 'base64',
  };
}

async function launcher(event) {
  const awsRequest = normalizeEvent(event);
  const input = await transformFromAwsRequest(awsRequest);
  const output = await query(input);
  return transformToAwsResponse(output);
}

exports.launcher = launcher;

// (async function() {
//   console.log(await launcher({
//     httpMethod: 'GET',
//     path: '/index.php'
//   }));
// })();
