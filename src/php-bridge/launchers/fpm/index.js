const FileFsRef = require('@now/build-utils/file-fs-ref.js');
const path = require('path');

function getFiles() {
  // Provide FCGCI client files manually
  return {
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
    'launcher.js': new FileFsRef({
      fsPath: path.join(__dirname, 'launcher.js'),
    })
  };
}

module.exports = {
  getFiles,
};
