mkdir -p /opt/now/modules

cp /usr/bin/php73 /opt/now/php
cp /opt/remi/php73/root/usr/sbin/php-fpm /opt/now/php-fpm
cp /opt/remi/php73/root/usr/lib64/php/modules/bcmath.so /opt/now/modules/bcmath.so
cp /opt/remi/php73/root/usr/lib64/php/modules/bz2.so /opt/now/modules/bz2.so
cp /opt/remi/php73/root/usr/lib64/php/modules/calendar.so /opt/now/modules/calendar.so
cp /opt/remi/php73/root/usr/lib64/php/modules/ctype.so /opt/now/modules/ctype.so
cp /opt/remi/php73/root/usr/lib64/php/modules/curl.so /opt/now/modules/curl.so
cp /opt/remi/php73/root/usr/lib64/php/modules/dom.so /opt/now/modules/dom.so
cp /opt/remi/php73/root/usr/lib64/php/modules/exif.so /opt/now/modules/exif.so
cp /opt/remi/php73/root/usr/lib64/php/modules/fileinfo.so /opt/now/modules/fileinfo.so
cp /opt/remi/php73/root/usr/lib64/php/modules/ftp.so /opt/now/modules/ftp.so
cp /opt/remi/php73/root/usr/lib64/php/modules/gd.so /opt/now/modules/gd.so
cp /opt/remi/php73/root/usr/lib64/php/modules/gettext.so /opt/now/modules/gettext.so
cp /opt/remi/php73/root/usr/lib64/php/modules/iconv.so /opt/now/modules/iconv.so
cp /opt/remi/php73/root/usr/lib64/php/modules/imap.so /opt/now/modules/imap.so
cp /opt/remi/php73/root/usr/lib64/php/modules/intl.so /opt/now/modules/intl.so
cp /opt/remi/php73/root/usr/lib64/php/modules/json.so /opt/now/modules/json.so
cp /opt/remi/php73/root/usr/lib64/php/modules/mbstring.so /opt/now/modules/mbstring.so
cp /opt/remi/php73/root/usr/lib64/php/modules/mysqli.so /opt/now/modules/mysqli.so
cp /opt/remi/php73/root/usr/lib64/php/modules/mysqlnd.so /opt/now/modules/mysqlnd.so
cp /opt/remi/php73/root/usr/lib64/php/modules/opcache.so /opt/now/modules/opcache.so
cp /opt/remi/php73/root/usr/lib64/php/modules/pdo.so /opt/now/modules/pdo.so
cp /opt/remi/php73/root/usr/lib64/php/modules/pdo_mysql.so /opt/now/modules/pdo_mysql.so
cp /opt/remi/php73/root/usr/lib64/php/modules/pdo_pgsql.so /opt/now/modules/pdo_pgsql.so
cp /opt/remi/php73/root/usr/lib64/php/modules/pdo_sqlite.so /opt/now/modules/pdo_sqlite.so
cp /opt/remi/php73/root/usr/lib64/php/modules/pgsql.so /opt/now/modules/pgsql.so
cp /opt/remi/php73/root/usr/lib64/php/modules/phar.so /opt/now/modules/phar.so
cp /opt/remi/php73/root/usr/lib64/php/modules/simplexml.so /opt/now/modules/simplexml.so
cp /opt/remi/php73/root/usr/lib64/php/modules/soap.so /opt/now/modules/soap.so
cp /opt/remi/php73/root/usr/lib64/php/modules/sockets.so /opt/now/modules/sockets.so
cp /opt/remi/php73/root/usr/lib64/php/modules/sodium.so /opt/now/modules/sodium.so
cp /opt/remi/php73/root/usr/lib64/php/modules/sqlite3.so /opt/now/modules/sqlite3.so
cp /opt/remi/php73/root/usr/lib64/php/modules/tokenizer.so /opt/now/modules/tokenizer.so
cp /opt/remi/php73/root/usr/lib64/php/modules/wddx.so /opt/now/modules/wddx.so
cp /opt/remi/php73/root/usr/lib64/php/modules/xml.so /opt/now/modules/xml.so
cp /opt/remi/php73/root/usr/lib64/php/modules/xmlreader.so /opt/now/modules/xmlreader.so
cp /opt/remi/php73/root/usr/lib64/php/modules/xmlrpc.so /opt/now/modules/xmlrpc.so
cp /opt/remi/php73/root/usr/lib64/php/modules/xmlwriter.so /opt/now/modules/xmlwriter.so
cp /opt/remi/php73/root/usr/lib64/php/modules/xsl.so  /opt/now/modules/xsl.so

rm -rf /usr/bin/php73
rm -rf /opt/remi/php73/root/usr/sbin/php-fpm
rm -rf /opt/remi/php73/root/usr/lib64/php/
rm -rf /etc/opt/remi/php73/php.d

./php-fpm --help
./php -v
./php -m
./php -c php.ini test.php

echo "if you see 'can't connect to local mysql' - it is good - mysql library is found and used"
echo "if you see 'call to undefined function mysqli_connect' - it is bad - something went wrong"
