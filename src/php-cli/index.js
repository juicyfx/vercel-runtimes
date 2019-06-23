const FileFsRef = require('@now/build-utils/file-fs-ref.js');
const { getPhp73 } = require('@juicyfx/php-lib-73');
const path = require('path');

async function getFiles() {
  // Fetch PHP 7.3 binaries
  const files = await getPhp73();

  // Provide launcher files manually
  Object.assign(files, {
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
