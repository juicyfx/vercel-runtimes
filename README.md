<h1 align=center>JuicyFx Now Builders</h1>

<p align=center>
The main goal is to provide experimental Now Builders on steroids. <br/>
Mainly for PHP with focus on latest versions and more proprietal configurations.
</p>

<p align=center>
🕹 <a href="https://f3l1x.io">f3l1x.io</a> | 💻 <a href="https://github.com/f3l1x">f3l1x</a> | 🐦 <a href="https://twitter.com/xf3l1x">@xf3l1x</a>
</p>

## 🐘 PHP

**PHP**

- Server ✅🏎
- CGI ✅
- CLI ✅
- FPM ✅🐥

**PHP versions**

- PHP 7.2 ✅
- PHP 7.3 ✅
- PHP 7.4 ✅
- PHP 8.0 🔥

> PHP 5.5, 5.6, 7.0 or 7.1 are not supported.

**Extensions**

Preinstalled: apcu, bcmath, bz2, calendar, Core, ctype, curl, date, dom, ds, exif, fileinfo, filter, ftp, gettext, hash, iconv, json, libxml, mbstring, mysqli, mysqlnd, openssl, pcntl, pcre, PDO, pdo_mysql, pdo_pgsql, pdo_sqlite, phalcon, Phar, readline, Reflection, session, SimpleXML, soap, sockets, sodium, SPL, sqlite3, ssh2, standard, swoole, tokenizer, xml, xmlreader, xmlrpc, xmlwriter, xsl, Zend OPcache, zlib

> List of all installable extensions is on this page https://blog.remirepo.net/pages/PECL-extensions-RPM-status.

### 📦 Packages

**PHP builders**

| Package | Stable | Canary | Description |
|---------|--------|--------|-------------|
| [`@juicyfx/php`](src/php)| `0.0.6` | `@canary` | Final PHP builder. |
| [`@juicyfx/php-bridge`](src/php-bridge)| `0.0.2` | `@canary` | PHP builder bridge with DevServer, FPM, CGI and CLI. |
| [`@juicyfx/php-bref`](src/php-bref)| `0.0.1` | `@canary` | Final PHP builder with Bref.sh. (Only with PHP 7.3) |
| [`@juicyfx/php-caddy`](src/php-caddy)| `0.0.1` | `@canary` | Final PHP builder with Caddy server with FASTCGI. (Only with PHP 7.3) |

**PHP libraries**

| Package | Stable | Canary | Description |
|---------|--------|--------|-------------|
| [`@juicyfx/php-lib-72`](src/php-lib-71) | `0.0.4` | `@canary` | PHP 7.1 binaries and shared libraries. |
| [`@juicyfx/php-lib-73`](src/php-lib-72) | `0.0.4` | `@canary` | PHP 7.2 binaries and shared libraries. |
| [`@juicyfx/php-lib-74`](src/php-lib-74) | `0.0.4` | `@canary` | PHP 7.3 binaries and shared libraries. |

**Speed**

- Server - ~5ms 🏎
- CGI - ~28ms
- CLI - ~24ms
- FPM - ~270ms 🐥

### ⚙️ Usage

There is prepared builder for your PHP lambdas `@juicyfx/php`.

**Minimal**

```
{
  "version": 2,
  "builds": [
    { 
      "src": "index.php", 
      "use": "@juicyfx/php",
    }
  ]
}
```

> 🚧Everything is HOT right now, so you should rather test the `@juicyfx/php@canary` version. 

**Config**

```
{
  "version": 2,
  "builds": [
    { 
      "src": "index.php", 
      "use": "@juicyfx/php",
      "config": {
        "v": "7.3"
        "mode": "server",
      }
    }
  ]
}
```

- `v` [optional]
  - Set the PHP version.
  - Type: string
  - Default: 7.3
  - Values: 7.2 | 7.3 | 7.4
- `mode` [optional]
  - Set the PHP launcher (bridge). 
  - Type: string
  - Default: server
  - Values: server | cgi | cli | fpm

### 🚀 Roadmap

- Support Composer
- Support `now dev`
- Resolve known issues (**HELP WANTED**)

### 🤔 Known Issues

- PHP-FPM - Uncaught Exception - socket hang up
    - This is known issue and I would apreaciate any help. 

    ```
    START RequestId: 1811b891-d871-4260-9ea3-1277c24a2d59 Version: $LATEST
    2019-06-22T16:50:54.848Z	1811b891-d871-4260-9ea3-1277c24a2d59	INFO	Starting PHP
    2019-06-22T16:50:55.076Z	1811b891-d871-4260-9ea3-1277c24a2d59	ERROR	Uncaught Exception	{"errorType":"Error","errorMessage":"socket hang up","code":"ECONNRESET","stack":["Error: socket hang up","    at createHangUpError (_http_client.js:323:15)","    at Socket.socketOnEnd (_http_client.js:426:23)","    at Socket.emit (events.js:194:15)","    at endReadableNT (_stream_readable.js:1125:12)","    at process._tickCallback (internal/process/next_tick.js:63:19)"]}
    END RequestId: 1811b891-d871-4260-9ea3-1277c24a2d59
    REPORT RequestId: 1811b891-d871-4260-9ea3-1277c24a2d59	
    Duration: 270.75 ms  Billed Duration: 300 ms   Memory Size: 3008 MB  Max Memory Used: 115 MB	
    RequestId: 1811b891-d871-4260-9ea3-1277c24a2d59 Process exited before completing request
    ```

### 👀 Examples

**Server**

- phpinfo - https://now-builders-php-server-f3l1x.juicyfx1.now.sh/
- hello - https://now-builders-php-server-f3l1x.juicyfx1.now.sh/hello.php
- test - https://now-builders-php-server-f3l1x.juicyfx1.now.sh/test.php

**CGI**

- phpinfo - https://now-builders-php-cli-f3l1x.juicyfx1.now.sh/
- hello - https://now-builders-php-cli-f3l1x.juicyfx1.now.sh/hello.php
- test - https://now-builders-php-cli-f3l1x.juicyfx1.now.sh/test.php

**CLI**

- phpinfo - https://now-builders-php-cli-f3l1x.juicyfx1.now.sh/
- hello - https://now-builders-php-cli-f3l1x.juicyfx1.now.sh/hello.php
- test - https://now-builders-php-cli-f3l1x.juicyfx1.now.sh/test.php

**FPM**

- phpinfo - https://now-builders-php-fpm-f3l1x.juicyfx1.now.sh/
- hello - https://now-builders-php-fpm-f3l1x.juicyfx1.now.sh/hello.php
- test - https://now-builders-php-fpm-f3l1x.juicyfx1.now.sh/test.php

**Extensions**

- ds -  https://now-builders-php-ext-f3l1x.juicyfx1.now.sh/ds.php
- phalcon -  https://now-builders-php-ext-f3l1x.juicyfx1.now.sh/phalcon.php

**Versions**

- PHP versions - https://now-builders-php-version-f3l1x.juicyfx1.now.sh/

**Nette**

- guide - https://now-builders-php-nette-f3l1x.juicyfx1.now.sh/
- phpinfo - https://now-builders-php-nette-f3l1x.juicyfx1.now.sh/phpinfo.php
- dump - https://now-builders-php-nette-f3l1x.juicyfx1.now.sh/debp.php
- Tracy Debugger - https://now-builders-php-nette-f3l1x.juicyfx1.now.sh/tracy.php
- Nette Checker - https://now-builders-php-nette-f3l1x.juicyfx1.now.sh/checker.php

**Bref**

- phpinfo - https://now-builders-php-bref-f3l1x.juicyfx1.now.sh/
- Nette Framework - https://now-builders-php-bref-nette-f3l1x.juicyfx1.now.sh/

![](docs/phpinfo.png)

## 📚 Resources

- `now builders`: https://github.com/zeit/now-builders
- `@now/php`: https://zeit.co/docs/v2/deployments/official-builders/php-now-php/
- `bref.sh`: https://github.com/brefphp/bref
- `stackery`: https://github.com/stackery/php-lambda-layer
- https://github.com/umutc/aws-lambda-layer-php73/
- https://github.com/ArtisanHost/php-cgi-lambda-build-script
- https://github.com/stechstudio/php-lambda
- https://github.com/araines/serverless-php
- https://read.acloud.guru/serverless-php-630bb3e950f5

## 📝 License

Copyright © 2019 [f3l1x](https://github.com/f3l1x).
This project is [MIT](LICENSE) licensed.