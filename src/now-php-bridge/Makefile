DOCKER_IMAGE=juicyfx-now-php
DOCKER_CONTAINER=juicyfx-now-php

.PHONY: build compile fresh publish 

build:
	docker build -t ${DOCKER_IMAGE} ./build

distribution:
	$(MAKE) build
	rm -rf ./native
	mkdir -p ./native/modules
	docker rm --force ${DOCKER_CONTAINER} || true
	docker run -it -d --name ${DOCKER_CONTAINER} ${DOCKER_IMAGE} /bin/bash
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/bin/php73 > ./native/php
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/sbin/php-fpm > ./native/php-fpm
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/bcmath.so > ./native/modules/bcmath.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/bz2.so > ./native/modules/bz2.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/calendar.so > ./native/modules/calendar.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/ctype.so > ./native/modules/ctype.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/curl.so > ./native/modules/curl.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/dom.so > ./native/modules/dom.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/exif.so > ./native/modules/exif.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/fileinfo.so > ./native/modules/fileinfo.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/ftp.so > ./native/modules/ftp.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/gd.so > ./native/modules/gd.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/gettext.so > ./native/modules/gettext.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/iconv.so > ./native/modules/iconv.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/imap.so > ./native/modules/imap.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/intl.so > ./native/modules/intl.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/json.so > ./native/modules/json.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/mbstring.so > ./native/modules/mbstring.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/mysqli.so > ./native/modules/mysqli.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/mysqlnd.so > ./native/modules/mysqlnd.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/opcache.so > ./native/modules/opcache.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/pdo.so > ./native/modules/pdo.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/pdo_mysql.so > ./native/modules/pdo_mysql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/pdo_pgsql.so > ./native/modules/pdo_pgsql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/pdo_sqlite.so > ./native/modules/pdo_sqlite.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/pgsql.so > ./native/modules/pgsql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/phar.so > ./native/modules/phar.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/simplexml.so > ./native/modules/simplexml.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/soap.so > ./native/modules/soap.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/sockets.so > ./native/modules/sockets.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/sodium.so > ./native/modules/sodium.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/sqlite3.so > ./native/modules/sqlite3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/tokenizer.so > ./native/modules/tokenizer.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/wddx.so > ./native/modules/wddx.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/xml.so > ./native/modules/xml.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/xmlreader.so > ./native/modules/xmlreader.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/xmlrpc.so > ./native/modules/xmlrpc.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/xmlwriter.so > ./native/modules/xmlwriter.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php73/root/usr/lib64/php/modules/xsl.so  > ./native/modules/xsl.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/now/php.ini > ./native/php.ini
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/now/php-fpm.ini > ./native/php-fpm.ini
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcrypt.so.1  > ./native/modules/libcrypt.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libargon2.so.0  > ./native/modules/libargon2.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsystemd.so.0  > ./native/modules/libsystemd.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libxml2.so.2  > ./native/modules/libxml2.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblz4.so.1  > ./native/modules/liblz4.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libdw.so.1  > ./native/modules/libdw.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblzma.so.5  > ./native/modules/liblzma.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libgcrypt.so.11  > ./native/modules/libgcrypt.so.11
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libgpg-error.so.0  > ./native/modules/libgpg-error.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libelf.so.1  > ./native/modules/libelf.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libbz2.so.1  > ./native/modules/libbz2.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libexslt.so.0  > ./native/modules/libexslt.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsqlite3.so.0  > ./native/modules/libsqlite3.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsodium.so.23  > ./native/modules/libsodium.so.23
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libpq.so.5  > ./native/modules/libpq.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libonig.so.5  > ./native/modules/libonig.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libldap_r-2.4.so.2  > ./native/modules/libldap_r-2.4.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libxslt.so.1  > ./native/modules/libxslt.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libc-client.so.2007  > ./native/modules/libc-client.so.2007
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libgd.so.3  > ./native/modules/libgd.so.3
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblber-2.4.so.2  > ./native/modules/liblber-2.4.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcurl.so.4  > ./native/modules/libcurl.so.4
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsasl2.so.3  > ./native/modules/libsasl2.so.3
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libedit.so.0  > ./native/modules/libedit.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libncurses.so.5  > ./native/modules/libncurses.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libtinfo.so.5  > ./native/modules/libtinfo.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libnghttp2.so.14  > ./native/modules/libnghttp2.so.14
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libidn2.so.0  > ./native/modules/libidn2.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libssh2.so.1  > ./native/modules/libssh2.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libldap-2.4.so.2  > ./native/modules/libldap-2.4.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libpam.so.0  > ./native/modules/libpam.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libssl3.so  > ./native/modules/libssl3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsmime3.so  > ./native/modules/libsmime3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libnss3.so  > ./native/modules/libnss3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libunistring.so.0  > ./native/modules/libunistring.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libaudit.so.1  > ./native/modules/libaudit.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcap-ng.so.0  > ./native/modules/libcap-ng.so.0
	docker rm --force ${DOCKER_CONTAINER} || true
	chmod +x ./native/php-fpm
	chmod +x ./native/php

test-php:
	$(MAKE) build
	docker run -it --rm ${DOCKER_IMAGE} /bin/bash /opt/now/test.sh

test-fpm:
	$(MAKE) build
	docker run -it --rm ${DOCKER_IMAGE} /bin/bash /opt/now/test-fpm.sh

fresh:
	docker run \
		-it \
		--rm \
		-v $(CURDIR)/native:/opt/now/ \
		-e LD_LIBRARY_PATH=/opt/now/modules:/var/lang/lib:/lib64:/usr/lib64:/var/runtime:/var/runtime/lib:/var/task:/var/task/lib:/opt/lib \
		-w /opt/now \
		--entrypoint /bin/bash \
		lambci/lambda:nodejs10.x

publish:
	npm publish --access public

publish-dry:
	npm publish --access public --dry