const DEFAULTS_MODE = 'server';
const DEFAULTS_V = '7.3';

function getMode(config) {
    return !config || !config.mode ? DEFAULTS_MODE : config.mode;
}

function getVersion(config) {
    return !config || !config.v ? DEFAULTS_V : config.v;
}

function getPhpNpm(config) {
    const version = getVersion(config).replace('.', '');
    return `@juicyfx/php-lib-${version}`;
}

exports.getMode = getMode;
exports.getVersion = getVersion;
exports.getPhpNpm = getPhpNpm;