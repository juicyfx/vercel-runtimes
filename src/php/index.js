const path = require('path');
const {
  createLambda,
  rename,
  glob,
  download,
  shouldServe,
} = require('@now/build-utils');
const {
  getPhpFiles,
  getLauncherFiles
} = require('@juicyfx/php-bridge');

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


// ###########################
// EXPORTS
// ###########################

exports.config = {
  maxLambdaSize: '30mb',
};

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

exports.shouldServe = shouldServe;
