const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const {
  runNpmInstall
} = require('@now/build-utils');
const launchers = require('./launchers');
const configuration = require('./config');
const writeFile = promisify(fs.writeFile);

async function installPhp({ workPath, config }) {
  console.log(`Installing PHP ${configuration.getVersion(config)} libs 🚀`);

  // Install defined PHP version on the fly into the tmp folder
  const packageJson = {
    dependencies: {
      [configuration.getPhpNpm(config)]: 'canary',
    }
  };

  const packageJsonPath = path.join(workPath, 'package.json');
  await writeFile(packageJsonPath, JSON.stringify(packageJson));

  await runNpmInstall(path.dirname(packageJsonPath), [
    '--prod',
    '--prefer-offline',
  ]);

  console.log('Installing PHP libs ✅');
}

async function getPhpFiles({ workPath, config }) {
  await installPhp({ workPath, config });

  // Resolve dynamically installed PHP lib package in tmp folder
  const phpLibPkgPath = path.dirname(path.join(workPath, 'package.json'))
    + '/node_modules/'
    + configuration.getPhpNpm(config);

  const phpLibPkg = require(phpLibPkgPath);

  // Every PHP version MUST have getFiles method!
  const files = await phpLibPkg.getFiles();
  const mode = configuration.getMode(config);

  if (mode === 'server') {
    delete files['native/php-cgi'];
    delete files['native/php-fpm'];
    delete files['native/php-fpm.ini'];

  } else if (mode === 'fpm') {
    delete files['native/php'];
    delete files['native/php-cgi'];

  } else if (mode === 'cli') {
    delete files['native/php-cgi'];
    delete files['native/php-fpm'];
    delete files['native/php-fpm.ini'];

  } else if (mode === 'cgi') {
    delete files['native/php'];
    delete files['native/php-fpm'];
    delete files['native/php-fpm.ini'];

  } else {
    throw new Error(`Invalid config.mode "${config.mode}" given. Supported modes are server|cgi|cli|fpm.`);
  }

  return files;
}

function getLauncherFiles(config) {
  const mode = configuration.getMode(config);

  switch (mode) {
    case "server":
      return launchers.getServerFiles();
    case "fpm":
      return launchers.getFpmFiles();
    case "cli":
      return launchers.getCliFiles();
    case "cgi":
      return launchers.getCgiFiles();
    default:
      throw new Error(`Invalid config.mode "${config.mode}" given. Supported modes are server|cgi|cli|fpm.`);
  }
}

module.exports = {
  installPhp,
  getPhpFiles,
  getLauncherFiles,
}
