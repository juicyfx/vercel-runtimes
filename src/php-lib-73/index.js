const FileBlob = require('@now/build-utils/file-blob.js'); // eslint-disable-line import/no-extraneous-dependencies
const glob = require('@now/build-utils/fs/glob.js'); // eslint-disable-line import/no-extraneous-dependencies

async function getPhp73() {
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

  return files;
}

module.exports = {
  getPhp73,
};
