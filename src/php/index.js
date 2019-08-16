exports.shouldServe = deprecation;
exports.build = deprecation;

function deprecation() {
  console.error(`
    @juicyfx/php is now offically deprecated and
    transfered into better now-php builder.
    Take a look at https://github.com/juicyfx/now-php
  `);

  process.exit(255);
}
