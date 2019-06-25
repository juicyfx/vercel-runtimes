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

- Server ✅🚧🚧
- CGI ✅🚧🚧
- CLI ✅🚧
- FPM ✅🚧🚧🚧

**PHP versions**

- PHP 5.6 ❌
- PHP 7.1 ❌
- PHP 7.2 ❌
- PHP 7.3 ✅
- PHP 7.4 🔜
- PHP 8.0 🔥

**Extensions**

bcmath, bz2, calendar, Core, ctype, curl, date, dom, exif, fileinfo, filter, ftp, gettext, hash, iconv, json, libxml, mbstring, mysqli, mysqlnd, openssl, pcntl, pcre, PDO, pdo_mysql, pdo_pgsql, pdo_sqlite, Phar, readline, Reflection, session, SimpleXML, soap, sockets, sodium, SPL, sqlite3, standard, tokenizer, wddx, xml, xmlreader, xmlrpc, xmlwriter, xsl, Zend OPcache, zlib

### 📦 Packages

**PHP builders**

| Package | Stable | Canary | Description |
|---------|--------|--------|-------------|
| [`@juicyfx/php`](src/php)| `0.0.2` | `0.0.3-canary.7` | PHP builder based on PHP FPM. |

**PHP bridges**

| Package | Stable | Canary | Description |
|---------|--------|--------|-------------|
| [`@juicyfx/php-server`](src/php-cli) | `0.0.1` | `0.0.1-canary.3` | PHP Development Server launcher. |
| [`@juicyfx/php-cgi`](src/php-fpm) | `0.0.1` | `0.0.1-canary.4` | PHP CGI launcher. |
| [`@juicyfx/php-cli`](src/php-cli) |`0.0.1` | `0.0.1-canary.1` | PHP CLI launcher. |
| [`@juicyfx/php-fpm`](src/php-fpm) | `0.0.3` | `0.0.3-canary.1` | PHP FPM launcher with Node.js FCGI client. |

**PHP libraries**

| Package | Stable | Canary | Description |
|---------|--------|--------|-------------|
| [`@juicyfx/php-lib-73`](src/php-lib-73) | `0.0.3` | `0.0.3-canary.0` | PHP 7.3 binaries and shared libraries. |

**Speed**

- Server - ~6ms 🏎
- CGI - ~28ms
- CLI - ~24ms
- FPM - ~270ms 😢

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

**Config**

```
{
  "version": 2,
  "builds": [
    { 
      "src": "index.php", 
      "use": "@juicyfx/php",
      "config": {
        "mode": "server"
      }
    }
  ]
}
```

- `mode` [optional]
  - Set the PHP launcher (bridge). 
  - Type: string
  - Default: server
  - Values: server | cgi | cli | fpm

### 🚀 Roadmap

- Support more PHP versions 7.1, 7.2, 7.4, 8.0
- Support more PHP extensions
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

**CGI**

- phpinfo - https://now-builders-php-cgi-f3l1x.juicyfx1.now.sh/

**CLI**

- phpinfo - https://now-builders-php-cli-f3l1x.juicyfx1.now.sh/

**FPM**

- index - https://now-builders-php-fpm-f3l1x.juicyfx1.now.sh/
- phpinfo - https://now-builders-php-fpm-f3l1x.juicyfx1.now.sh/phpinfo.php
- dumps - https://now-builders-php-fpm-f3l1x.juicyfx1.now.sh/dump.php
- Tracy Debugger - https://now-builders-php-fpm-f3l1x.juicyfx1.now.sh/tracy.php
- Nette Checker - https://now-builders-php-fpm-f3l1x.juicyfx1.now.sh/checker.php


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

## 📝 License

Copyright © 2019 [f3l1x](https://github.com/f3l1x).
This project is [MIT](LICENSE) licensed.