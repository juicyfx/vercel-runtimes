const path = require('path');
const {
  createLambda,
  rename,
  shouldServe,
} = require('@now/build-utils');
const {
  getPhpFiles,
  getLauncherFiles,
  getIncludedFiles,
  getComposerFiles,
  getRuntime
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
  const runtime = getRuntime(config);

  const bridgeFiles = {
    ...await getPhpFiles({ workPath, config }),
    ...await getLauncherFiles(config),
  };

  const includedFiles = {
    ...await getIncludedFiles({ files, workPath, config, meta }),
    ...await getComposerFiles({ workPath, config })
  }

  const userFiles = rename(includedFiles, name => path.join('user', name));

  console.log('Entrypoint:', entrypoint);
  console.log('Runtime:', runtime);
  console.log('Config:', config);
  console.log('Work path:', workPath);
  console.log('Meta:', meta);
  console.log('User files:', Object.keys(userFiles));
  console.log('Bridge files:', Object.keys(bridgeFiles));

  const lambda = await createLambda({
    files: { ...userFiles, ...bridgeFiles },
    handler: 'launcher.launcher',
    runtime,
    environment: {
      NOW_ENTRYPOINT: entrypoint,
    },
  });

  return { [entrypoint]: lambda };
};
