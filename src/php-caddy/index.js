const {
  glob,
  download,
  createLambda,
  shouldServe,
  rename,
} = require('@now/build-utils'); // eslint-disable-line import/no-extraneous-dependencies
const FileFsRef = require('@now/build-utils/file-fs-ref.js');
const path = require('path');
const { getFiles } = require('@juicyfx/php-lib-73');

exports.config = {
  maxLambdaSize: '45mb',
};

exports.analyze = ({ files, entrypoint }) => files[entrypoint].digest;

exports.build = async ({
  workPath, files, entrypoint, config,
}) => {
  const downloadedFiles = await download(files, workPath);
  const userFiles = rename(downloadedFiles, name => path.join('user', name));

  console.log('Files:', Object.keys(userFiles));
  console.log('Entrypoint:', entrypoint);

  const bridgeFiles = {
    ...await getFiles(),
    ...{
      'launcher.js': new FileFsRef({
        fsPath: path.join(__dirname, 'launcher.js'),
      }),
      'port.js': new FileFsRef({
        fsPath: path.join(__dirname, 'port.js'),
      }),
      'caddy': new FileFsRef({
        mode: 0o755,
        fsPath: path.join(__dirname, 'caddy/caddy'),
      }),
      'Caddyfile': new FileFsRef({
        fsPath: path.join(__dirname, 'caddy/Caddyfile'),
      }),
    }
  };

  console.log('Bridge files', Object.keys(bridgeFiles));

  console.log('Lambda creating');

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

exports.shouldServe = shouldServe;
