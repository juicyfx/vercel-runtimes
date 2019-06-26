const {
  glob,
  download,
  createLambda,
  shouldServe,
} = require('@now/build-utils'); // eslint-disable-line import/no-extraneous-dependencies
const FileFsRef = require('@now/build-utils/file-fs-ref.js');
const path = require('path');
const { getFiles } = require('@juicyfx/php-bref-lib-73');

exports.config = {
  maxLambdaSize: '45mb',
};

exports.analyze = ({ files, entrypoint }) => files[entrypoint].digest;

exports.build = async ({
  workPath, files, entrypoint, config,
}) => {
  const downloadedFiles = await download(files, workPath);

  console.log('Files:', Object.keys(downloadedFiles));
  console.log('Entrypoint:', entrypoint);

  const bridgeFiles = {
    ...await getFiles(),
    ...await glob('**', workPath),
    ...{
      'bootstrap': new FileFsRef({
        mode: 0o755,
        fsPath: path.join(__dirname, 'bootstrap'),
      }),
    }
  };

  console.log('Bridge files', Object.keys(bridgeFiles));

  console.log('Lambda creating');

  const lambda = await createLambda({
    files: bridgeFiles,
    handler: entrypoint,
    runtime: 'provided',
  });

  console.log('Lambda created');

  return {
    [entrypoint]: lambda,
  };
};

exports.shouldServe = shouldServe;
