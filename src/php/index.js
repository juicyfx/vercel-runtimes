const path = require('path');
const {
  createLambda,
  rename,
  shouldServe,
} = require('@now/build-utils');
const {
  getPhpFiles,
  getLauncherFiles,
  getIncludedFiles
} = require('@juicyfx/php-bridge');

// ###########################
// EXPORTS
// ###########################

exports.config = {
  maxLambdaSize: '30mb',
};

exports.analyze = ({ files, entrypoint }) => files[entrypoint].digest;

exports.shouldServe = shouldServe;

exports.build = async ({
  files, entrypoint, workPath, config, meta,
}) => {
  const includedFiles = await getIncludedFiles({ files, workPath, config, meta });

  const userFiles = rename(includedFiles, name => path.join('user', name));
  const bridgeFiles = {
    ...await getPhpFiles({ workPath, config }),
    ...await getLauncherFiles(config),
  };

  console.log('Entrypoint:', entrypoint);
  console.log('Config:', config);
  console.log('Work path:', workPath);
  console.log('Meta:', meta);
  console.log('User files:', Object.keys(userFiles));
  console.log('Bridge files:', Object.keys(bridgeFiles));

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
