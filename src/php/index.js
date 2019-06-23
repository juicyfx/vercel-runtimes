const {
  createLambda,
  rename,
  glob,
  download,
  shouldServe,
} = require('@now/build-utils');
const path = require('path');
// PHP modes
const phpfpm = require('@juicyfx/php-fpm');
const phpcgi = require('@juicyfx/php-cgi');
const phpcli = require('@juicyfx/php-cli');

exports.config = {
  maxLambdaSize: '20mb',
};

exports.shouldServe = shouldServe;

async function getIncludedFiles({ files, workPath, config, meta }) {
  // Download all files to workPath
  const downloadedFiles = await download(files, workPath, meta);

  let includedFiles = {};
  if (config && config.includeFiles) {
    // Find files for each glob
    // eslint-disable-next-line no-restricted-syntax
    for (const pattern of config.includeFiles) {
      // eslint-disable-next-line no-await-in-loop
      const matchedFiles = await glob(pattern, workPath);
      Object.assign(includedFiles, matchedFiles);
    }
    // explicit and always include the entrypoint
    Object.assign(includedFiles, {
      [entrypoint]: files[entrypoint],
    });
  } else {
    // Backwards compatibility
    includedFiles = downloadedFiles;
  }

  return includedFiles;
}

async function getBridgeFiles(config) {
  let files;

  if (!config || !config.mode || config.mode === 'cgi') {
    files = await phpcgi.getFiles();
    delete files['native/php'];
    delete files['native/php-fpm'];
    delete files['native/php-fpm.ini'];

  } else if (config.mode === 'fpm') {
    files = await phpfpm.getFiles();
    delete files['native/php'];
    delete files['native/php-cgi'];

  } else if (config.mode === 'cli') {
    files = await phpcli.getFiles();
    delete files['native/php-cgi'];
    delete files['native/php-fpm'];
    delete files['native/php-fpm.ini'];

  } else {
    throw new Error(`Invalid config.mode given ${config.mode}. Supported are cgi|fpm|cli.`);
  }

  return files;
}

exports.build = async ({
  files, entrypoint, workPath, config, meta,
}) => {
  const includedFiles = await getIncludedFiles({ files, workPath, config, meta });
  console.log('Included files:', Object.keys(includedFiles));

  const userFiles = rename(includedFiles, name => path.join('user', name));
  const bridgeFiles = await getBridgeFiles(config);

  console.log('User files:', Object.keys(userFiles));
  console.log('Bridge files:', Object.keys(bridgeFiles));
  console.log('Entrypoint:', entrypoint);

  const lambda = await createLambda({
    files: { ...userFiles, ...bridgeFiles },
    handler: 'launcher.launcher',
    runtime: 'nodejs10.x',
    environment: {
      NOW_ENTRYPOINT: entrypoint,
    },
  });

  return { [entrypoint]: lambda };
};

