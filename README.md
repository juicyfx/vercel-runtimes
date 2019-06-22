<h1 align=center>JuicyFx Now Builders</h1>

<p align=center>
The main goal is to provide experimental Now Builders on steroids. <br/>
Mainly for PHP with focus on latest versions and more proprietal configurations.
</p>

<p align=center>
🕹 <a href="https://f3l1x.io">f3l1x.io</a> | 💻 <a href="https://github.com/f3l1x">f3l1x</a> | 🐦 <a href="https://twitter.com/xf3l1x">@xf3l1x</a>
</p>

## 📚 Resources

- `now builders`: https://github.com/zeit/now-builders
- `@now/php`: https://zeit.co/docs/v2/deployments/official-builders/php-now-php/
- `bref.sh`: https://github.com/brefphp/bref
- `stackery`: https://github.com/stackery/php-lambda-layer
- `umutc`: https://github.com/umutc/aws-lambda-layer-php73/

## 🐘 PHP

**PHP versions**

- PHP 7.1 ❌
- PHP 7.2 ❌
- PHP 7.3 ✅
- PHP 7.4 🔜
- PHP 8.0 🔥

**Packages**

| Package | Stable | Canary | Description |
|---------|--------|--------|-------------|
| [`@juicyfx/php`](src/now-php)| ❌ | `@juicyfx/php@0.0.1-canary.12` | High-level PHP wrapper based on PHP bridge which defines entrypoints, lambda and user files. |
| [`@juicyfx/php-bridge`](src/now-php-bridge) | ❌ | `@juicyfx/php-bridge0.0.1-canary.47`| Low-level PHP wrapper with compiled PHP binaries and shared libraries. Provide FCGI client for PHP builder. |

**Extensions**

- bcmath, bz2, calendar, Core, ctype, curl, date, dom, exif, fileinfo, filter, ftp, gettext, hash, iconv, json, libxml, mbstring, mysqli, mysqlnd, openssl, pcntl, pcre, PDO, pdo_mysql, pdo_pgsql, pdo_sqlite, Phar, readline, Reflection, session, SimpleXML, soap, sockets, sodium, SPL, sqlite3, standard, tokenizer, wddx, xml, xmlreader, xmlrpc, xmlwriter, xsl, Zend OPcache, zlib

### ⚙️ Usage

There is prepared builder for your PHP lambdas `@juicyfx/php`.

```
{
    "version": 2,
    "builds": [
      { "src": "index.php", "use": "@juicyfx/php@0.0.1-canary.12" }
    ]
  }
```

### 🚀 Roadmap

- Support more PHP versions 7.2, 7.3, 7.4
- Resolve known issues (**HELP WANTED**)

### 🤔 Known Issues

- Uncaught Exception - socket hang up
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

- index - https://now-builders-php-f3l1x.juicyfx1.now.sh
- phpinfo - https://now-builders-php-f3l1x.juicyfx1.now.sh/phpinfo.php
- dumps - https://now-builders-php-f3l1x.juicyfx1.now.sh/dump.php
- Tracy Debugger - https://now-builders-php-f3l1x.juicyfx1.now.sh/tracy.php
- Nette Checker - https://now-builders-php-f3l1x.juicyfx1.now.sh/checker.php

![](docs/phpinfo.png)


## 📝 License

Copyright © 2019 [f3l1x](https://github.com/f3l1x).
This project is [MIT](LICENSE) licensed.