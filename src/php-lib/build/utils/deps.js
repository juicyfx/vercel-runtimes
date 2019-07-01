const util = require('util');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const lambda = require('../data/lambda.json');

const readdir = util.promisify(fs.readdir);

const PHP_EXT_DIR = '/opt/now/modules'
const PHP_DIR = '/opt/now'

// ###########################

async function listExts() {
    const files = await readdir(PHP_EXT_DIR);
    return files.map(f => path.join(PHP_EXT_DIR, f));
}

async function listPhp() {
    return [
        path.join(PHP_DIR, 'php'),
        path.join(PHP_DIR, 'php-cgi'),
        path.join(PHP_DIR, 'php-fpm'),
    ]
}

function atLambda(lib) {
    const folders = Object.keys(lambda);
    for (folder of folders) {
        if (lambda[folder].includes(lib)) {
            // console.log(`Library ${lib} found on Lambda`);
            return true;
        }
    }

    return false;
}

function analyzeLib(file) {
    const regex = /^\s*([a-zA-Z0-9\.\-_]+)\s=>\s(.+)$/gm;
    const parseLinks = raw => {
        // linux-vdso.so.1 (0x00007fff65bc9000)
        // libexslt.so.0 => not found
        // libxslt.so.1 => not found
        // libxml2.so.2 => /lib64/libxml2.so.2 (0x00007f12e673c000)
        // libz.so.1 => /lib64/libz.so.1 (0x00007f12e6526000)
        // libdl.so.2 => /lib64/libdl.so.2 (0x00007f12e6322000)
        // libm.so.6 => /lib64/libm.so.6 (0x00007f12e5fd7000)
        // libc.so.6 => /lib64/libc.so.6 (0x00007f12e5c21000)
        // liblzma.so.5 => /lib64/liblzma.so.5 (0x00007f12e59fb000)
        // /lib64/ld-linux-x86-64.so.2 (0x00007f12e6cac000)
        // libpthread.so.0 => /lib64/libpthread.so.0 (0x00007f12e57dd000)

        const matches = [];

        while ((match = regex.exec(raw)) !== null) {
            if (match.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            matches.push({
                src: match[1],
                dest: match[2],
                fs: match[2] !== 'not found',
                lambda: atLambda(match[1])
            });
        }

        return matches;
    };

    return new Promise((resolve, reject) => {
        let out = '';

        const ldd = spawn('ldd', [file], {
            stdio: ['pipe', 'pipe', 'pipe']
        });

        ldd.stdout.on('data', function (data) {
            out += data.toString()
        });

        ldd.on('close', function (code, signal) {
            resolve({
                lib: file,
                links: parseLinks(out)
            });
        });

        ldd.on('error', function (err) {
            reject(`Process errored ${err}`);
        });
    })
}

(async () => {
    const files = [
        ...await listPhp(),
        ...await listExts()
    ];

    const missing = {};

    for (file of files) {
        const analysis = await analyzeLib(file);

        analysis.links
            .filter(link => !link.lambda)
            .forEach(link => {
                if (!missing[link.src]) {
                    missing[link.src] = { lib: link.src, deps: [] }
                }
                missing[link.src].deps.push(analysis.lib);
            });
    }

    console.log(`Total missing ${Object.keys(missing).length} shared libs`);
    Object.keys(missing).sort().forEach(item => {
        console.log(`- ${item}`);
    })
})();