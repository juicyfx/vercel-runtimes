const FileBlob = require('@now/build-utils/file-blob.js');
const glob = require('@now/build-utils/fs/glob.js');

async function getFiles() {
  // Lookup for PHP bins, modules and shared libs
  const files = {
    ...await glob('php/**', __dirname),
    ...await glob('lib/**', __dirname),
  };

  // Replace paths in php.ini file
  const phpini = await FileBlob.fromStream({
    stream: files['php/php.ini'].toStream(),
  });

  phpini.data = phpini.data
    .toString()
    .replace(/\/opt\/now\/modules/g, '/var/task/php/modules');
  files['php/php.ini'] = phpini;

  // Dump content of php.ini to known enabled extensions
  console.log('🐘 PHP.ini', phpini.data.toString());

  return files;
}

module.exports = {
  getFiles,
};
