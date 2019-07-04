const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const { promisify } = require('util');
const {
  runNpmInstall,
  glob,
  download
} = require('@now/build-utils');
const launchers = require('./launchers');
const configuration = require('./config');
const writeFile = promisify(fs.writeFile);

async function installPhp({ workPath, config }) {
  console.log(`🐘 Installing PHP ${configuration.getVersion(config)} lib.`);

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

  console.log(`🐘 Installing PHP ${configuration.getVersion(config)} lib OK.`);
}

async function getPhpFiles({ workPath, config }) {
  await installPhp({ workPath, config });

  // Resolve dynamically installed PHP lib package in tmp folder
  const phpLibPkgPath = workPath
    + '/node_modules/'
    + configuration.getPhpNpm(config);

  const phpLibPkg = require(phpLibPkgPath);

  // Every PHP version MUST have getFiles method!
  const files = await phpLibPkg.getFiles();
  const mode = configuration.getMode(config);

  if (mode === 'server') {
    delete files['php/php-cgi'];
    delete files['php/php-fpm'];
    delete files['php/php-fpm.ini'];

  } else if (mode === 'fpm') {
    delete files['php/php'];
    delete files['php/php-cgi'];

  } else if (mode === 'cli') {
    delete files['php/php-cgi'];
    delete files['php/php-fpm'];
    delete files['php/php-fpm.ini'];

  } else if (mode === 'cgi') {
    delete files['php/php'];
    delete files['php/php-fpm'];
    delete files['php/php-fpm.ini'];

  } else {
    throw new Error(`Invalid config.mode "${config.mode}" given. Supported modes are server|cgi|cli|fpm.`);
  }

  // Install composer dependencies
  if (config && config.composer === true) {
    console.log('🐘 Installing Composer deps.');
    await runComposerInstall(workPath, phpLibPkgPath);
    console.log('🐘 Installing Composer deps OK.');
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

async function getIncludedFiles({ files, workPath, config, meta }) {
  // Download all files to workPath
  const downloadedFiles = await download(files, workPath, meta);

  let includedFiles = {};
  if (config && config.includeFiles) {
    // Find files for each glob
    for (const pattern of config.includeFiles) {
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

async function runComposerInstall(workPath, pkgDir) {
  const phpDir = path.join(pkgDir, 'php');
  const libDir = path.join(pkgDir, 'lib');

  await spawnAsync('npm', ['install', '@now/php-bridge@canary'], workPath);

  console.log(fs.readdirSync(workPath + '/node_modules/@now/php-bridge/native'));
  console.log(fs.readdirSync(workPath + '/node_modules/@now/php-bridge/native'));

  try {
    await spawnAsync(
      './php',
      [path.join(phpDir, 'composer'), 'install', '--profile', '--no-dev', '--no-interaction', '--no-scripts', '--ignore-platform-reqs'],
      workPath + '/node_modules/@now/php-bridge/native',
      {
        env: {
          LD_LIBRARY_PATH: `${workPath + '/node_modules/@now/php-bridge/native'}:${process.env.LD_LIBRARY_PATH}`
        }
      }
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

function spawnAsync(command, args, cwd, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      cwd,
      ...opts
    });

    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Exited with ${code || signal}`));
      }
    });
  })
}

module.exports = {
  installPhp,
  getPhpFiles,
  getLauncherFiles,
  getIncludedFiles,
  runComposerInstall
};

// (async () => {
//   await runComposerInstall(process.env.NOW_PHP);
// })();
