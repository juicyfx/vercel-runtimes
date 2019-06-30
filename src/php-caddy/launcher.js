const http = require('http');
const { spawn } = require('child_process');
const { parse } = require('url');
const { whenPortOpens } = require('./port.js');

let connFpm;
let connCaddy;

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

async function transformFromAwsRequest({
    method, path, headers, body,
}) {
    const { pathname, search } = parse(path);

    const filename = process.env.NOW_ENTRYPOINT || pathname;
    const uri = pathname + (search || '');

    return { filename, uri, method, headers, body };
}

async function startFpm() {
    console.log(`Spawning: PHP-FPM`);

    const fpm = spawn(
        './php-fpm',
        ['-c', 'php.ini', '--fpm-config', 'php-fpm.ini', '--nodaemonize'],
        {
            stdio: 'inherit',
            cwd: '/var/task/native',
            env: {
                LD_LIBRARY_PATH: '/var/task/native/modules:' + (process.env.LD_LIBRARY_PATH || '')
            }
        },
    );

    fpm.on('close', function (code, signal) {
        console.log(`PHP-FPM process closed code ${code} and signal ${signal}`);
    });

    fpm.on('error', function (err) {
        console.error(`PHP-FPM process errored ${err}`);
    });

    process.on('exit', () => {
        fpm.kill();
        fpm = null;
    })

    await whenPortOpens(9000, 400);

    connFpm = fpm;
}

async function startCaddy() {
    console.log(`Spawning: Caddy`);

    const caddy = spawn(
        './caddy',
        ['-conf', 'Caddyfile', '-root', '/var/task/user'],
        {
            stdio: 'inherit',
            cwd: '/var/task',
        },
    );

    caddy.on('close', function (code, signal) {
        console.log(`Caddy process closed code ${code} and signal ${signal}`);
    });

    caddy.on('error', function (err) {
        console.error(`Caddy process errored ${err}`);
    });

    process.on('exit', () => {
        caddy.kill();
        caddy = null;
    })

    await whenPortOpens(8000, 400);

    connCaddy = caddy;
}

async function query({ filename, uri, headers, method, body }) {
    if (!connFpm) {
        await startFpm();
    }
    if (!connCaddy) {
        await startCaddy();
    }

    return new Promise(resolve => {
        const options = {
            hostname: '127.0.0.1',
            port: 8000,
            path: `${uri}`,
            method,
            headers,
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (d) => {
                data += d;
            });
            res.on('end', () => {
                resolve({
                    body: data,
                    headers: res.headers,
                    statusCode: res.statusCode
                });
            });
        });

        req.on('error', (error) => {
            console.error('HTTP errored', error);
            resolve({
                body: 'HTTP error',
                headers: {},
                statusCode: 500
            });
        });

        if (body) {
            req.write(body);
        }

        req.end();
    });
}

function transformToAwsResponse({ body, headers, statusCode }) {
    return {
        statusCode,
        headers,
        body
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
