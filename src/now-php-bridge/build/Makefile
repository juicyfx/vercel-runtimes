DOCKER_IMAGE=juicyfx-now-php

build:
	docker build -t ${DOCKER_IMAGE} .

compile:
	$(MAKE) build
	rm -rf ../native
	mkdir -p ../native/modules
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/sbin/php-fpm > ../native/php-fpm
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/bcmath.so > ../native/modules/bcmath.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/bz2.so > ../native/modules/bz2.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/calendar.so > ../native/modules/calendar.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/ctype.so > ../native/modules/ctype.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/curl.so > ../native/modules/curl.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/dom.so > ../native/modules/dom.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/exif.so > ../native/modules/exif.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/fileinfo.so > ../native/modules/fileinfo.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/ftp.so > ../native/modules/ftp.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/gd.so > ../native/modules/gd.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/gettext.so > ../native/modules/gettext.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/iconv.so > ../native/modules/iconv.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/imap.so > ../native/modules/imap.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/intl.so > ../native/modules/intl.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/json.so > ../native/modules/json.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/mbstring.so > ../native/modules/mbstring.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/mysqli.so > ../native/modules/mysqli.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/mysqlnd.so > ../native/modules/mysqlnd.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/opcache.so > ../native/modules/opcache.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/pdo.so > ../native/modules/pdo.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/pdo_mysql.so > ../native/modules/pdo_mysql.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/pdo_pgsql.so > ../native/modules/pdo_pgsql.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/pdo_sqlite.so > ../native/modules/pdo_sqlite.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/pgsql.so > ../native/modules/pgsql.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/phar.so > ../native/modules/phar.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/simplexml.so > ../native/modules/simplexml.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/soap.so > ../native/modules/soap.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/sockets.so > ../native/modules/sockets.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/sodium.so > ../native/modules/sodium.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/sqlite3.so > ../native/modules/sqlite3.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/tokenizer.so > ../native/modules/tokenizer.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/wddx.so > ../native/modules/wddx.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/xml.so > ../native/modules/xml.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/xmlreader.so > ../native/modules/xmlreader.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/xmlrpc.so > ../native/modules/xmlrpc.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/xmlwriter.so > ../native/modules/xmlwriter.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/xsl.so  > ../native/modules/xsl.so
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/now/php.ini > ../native/php.ini
	docker run --rm ${DOCKER_IMAGE} /bin/cat /opt/now/php-fpm.ini > ../native/php-fpm.ini
	chmod +x ../native/php-fpm

test:
	$(MAKE) build
	docker run -it --rm ${DOCKER_IMAGE} /bin/bash /opt/now/test.sh
