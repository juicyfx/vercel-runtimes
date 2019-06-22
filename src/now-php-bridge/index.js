const FileBlob = require('@now/build-utils/file-blob.js'); // eslint-disable-line import/no-extraneous-dependencies
const FileFsRef = require('@now/build-utils/file-fs-ref.js'); // eslint-disable-line import/no-extraneous-dependencies
const glob = require('@now/build-utils/fs/glob.js'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

async function getFiles() {
  // Lookup for all files in native folder
  const files = await glob('native/**', __dirname);

  // Replace paths in php.ini file
  const phpini = await FileBlob.fromStream({
    stream: files['native/php.ini'].toStream(),
  });
  phpini.data = phpini.data
    .toString()
    .replace(/\/opt\/now\/modules/g, '/var/task/native/modules');
  files['native/php.ini'] = phpini;

  console.log(phpini.data.toString());

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