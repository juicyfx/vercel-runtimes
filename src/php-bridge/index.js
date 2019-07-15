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
  const phpPkg = getPhpPkg({ workPath, config });
  const phpLibPkg = require(phpPkg);

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

async function getIncludedFiles({ files, entrypoint, workPath, config, meta }) {
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

async function getComposerFiles({ workPath, config }) {
  if (!config || config.composer !== true) {
    console.log('🐘 Skip Composer (config.composer not provided)');
    return [];
  }

  if (configuration.getVersion(config) === '7.4') {
    console.log('🐘 Skip Composer (calling PHP 7.4 is not supported at this moment)');
    return [];
  }

  console.log('🐘 Installing Composer deps.');

  // Install composer dependencies
  await runComposerInstall({ workPath, config });

  console.log('🐘 Installing Composer deps OK.');

  return await glob('vendor/**', workPath);
}

async function runComposerInstall({ workPath, config }) {
  const pkgDir = getPhpPkg({ workPath, config });
  const phpDir = path.join(pkgDir, "php");

  await runPhp(
    { workPath, config },
    [
      `-dextension_dir=${phpDir}/modules`,
      `${phpDir}/composer`,
      'install',
      '--profile',
      '--no-dev',
      '--no-interaction',
      '--no-scripts',
      '--ignore-platform-reqs'
    ],
  );
}

async function runPhp({ workPath, config }, args) {
  const phpPkg = getPhpPkg({ workPath, config });
  const phpDir = path.join(phpPkg, "php");
  const libDir = path.join(phpPkg, "lib");

  try {
    await spawnAsync(
      'php',
      [
        `-dextension_dir=${phpDir}/modules`,
        ...args
      ],
      workPath,
      {
        env: {
          COMPOSER_HOME: '/tmp',
          PATH: `${phpDir}:${process.env.PATH}`,
          LD_LIBRARY_PATH: `${libDir}:/usr/lib64:/lib64:${process.env.LD_LIBRARY_PATH}`
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

function getRuntime(config) {
  return configuration.getRuntime(config);
}

function getPhpPkg({ workPath, config }) {
  return workPath
    + '/node_modules/'
    + configuration.getPhpNpm(config);
}

module.exports = {
  getPhpFiles,
  getLauncherFiles,
  getIncludedFiles,
  getComposerFiles,
  getRuntime,
  // Special functions!
  installPhp,
  runComposerInstall,
  runPhp,
};

// (async () => {
//   await runComposerInstall(process.env.NOW_PHP);
// })();
