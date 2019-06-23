const FileFsRef = require('@now/build-utils/file-fs-ref.js');
const { getPhp73 } = require('@juicyfx/php-lib-73');
const path = require('path');

async function getFiles() {
  // Fetch PHP 7.3 binaries
  const files = await getPhp73();

  // Provide FCGCI client files manually
  Object.assign(files, {
    'fastcgi/connection.js': new FileFsRef({
      fsPath: require.resolve('fastcgi-client/lib/connection.js'),
    }),
    'fastcgi/consts.js': new FileFsRef({
      fsPath: require.resolve('fastcgi-client/lib/consts.js'),
    }),
    'fastcgi/stringifykv.js': new FileFsRef({
      fsPath: require.resolve('fastcgi-client/lib/stringifykv.js'),
    }),
    'fastcgi/index.js': new FileFsRef({
      fsPath: path.join(__dirname, 'fastcgi/index.js'),
    }),
    'fastcgi/port.js': new FileFsRef({
      fsPath: path.join(__dirname, 'fastcgi/port.js'),
    }),
    'launcher.js': new FileFsRef({
      fsPath: path.join(__dirname, 'launcher.js'),
    }),
  });

  return files;
}

module.exports = {
  getFiles,
};

/*
(async function () {
  await getFiles();
})();
*/
