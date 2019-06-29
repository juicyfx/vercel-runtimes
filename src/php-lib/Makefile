DIST_PHP=72
DIST_PHP_V=$(subst 7,7.,${DIST_PHP})
DIST_PATH=./v${DIST_PHP_V}/native

DOCKER_IMAGE=juicyfx/now-php-${DIST_PHP}
DOCKER_CONTAINER=juicyfx-now-php-${DIST_PHP}

.PHONY: build72 build73 build74 dist72 dist73 dist74 

# ######################
# Building Docker images
# ######################

build-all: build72 build73 build74

build72:
	$(MAKE) __build DIST_PHP=72

build73:
	$(MAKE) __build DIST_PHP=73

build74:
	$(MAKE) __build DIST_PHP=74

__build:
	docker build -t ${DOCKER_IMAGE} -f ./build/Dockerfile.php${DIST_PHP} ./build

# #################################################
# Separate PHP bins + shared libs from Docker image
# #################################################

dist72:
	$(MAKE) __distribution DIST_PHP=72

dist73:
	$(MAKE) __distribution DIST_PHP=73

dist74:
	$(MAKE) __distribution DIST_PHP=74

dist-all: dist72 dist73 dist74

__distribution:
	$(MAKE) __build DIST_PHP=${DIST_PHP}

	# Cleanup distribution folder
	rm -rf ${DIST_PATH}
	mkdir -p ${DIST_PATH}/modules

	# Remove old PHP container
	docker rm --force ${DOCKER_CONTAINER} || true
	# Run new one PHP container
	docker run -it -d --name ${DOCKER_CONTAINER} ${DOCKER_IMAGE} /bin/bash

	# Copy php, php-cgi, php-fpm binaries
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/bin/php > ${DIST_PATH}/php
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/bin/php-cgi > ${DIST_PATH}/php-cgi
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/sbin/php-fpm > ${DIST_PATH}/php-fpm
	
	# Make these binaries executable
	chmod +x ${DIST_PATH}/php
	chmod +x ${DIST_PATH}/php-cgi
	chmod +x ${DIST_PATH}/php-fpm
	
	# Copy php.ini & php-fpm.ini
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/now/php.ini > ${DIST_PATH}/php.ini
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/now/php-fpm.ini > ${DIST_PATH}/php-fpm.ini

	# Copy all compiled extensions
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/apcu.so > ${DIST_PATH}/modules/apcu.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/bcmath.so > ${DIST_PATH}/modules/bcmath.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/bz2.so > ${DIST_PATH}/modules/bz2.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/calendar.so > ${DIST_PATH}/modules/calendar.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ctype.so > ${DIST_PATH}/modules/ctype.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/curl.so > ${DIST_PATH}/modules/curl.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/dom.so > ${DIST_PATH}/modules/dom.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ds.so > ${DIST_PATH}/modules/ds.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/exif.so > ${DIST_PATH}/modules/exif.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/fileinfo.so > ${DIST_PATH}/modules/fileinfo.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ftp.so > ${DIST_PATH}/modules/ftp.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/gd.so > ${DIST_PATH}/modules/gd.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/gettext.so > ${DIST_PATH}/modules/gettext.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/iconv.so > ${DIST_PATH}/modules/iconv.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/imap.so > ${DIST_PATH}/modules/imap.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/intl.so > ${DIST_PATH}/modules/intl.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/json.so > ${DIST_PATH}/modules/json.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/mbstring.so > ${DIST_PATH}/modules/mbstring.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/mysqli.so > ${DIST_PATH}/modules/mysqli.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/mysqlnd.so > ${DIST_PATH}/modules/mysqlnd.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/opcache.so > ${DIST_PATH}/modules/opcache.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo.so > ${DIST_PATH}/modules/pdo.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo_mysql.so > ${DIST_PATH}/modules/pdo_mysql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo_pgsql.so > ${DIST_PATH}/modules/pdo_pgsql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pdo_sqlite.so > ${DIST_PATH}/modules/pdo_sqlite.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/pgsql.so > ${DIST_PATH}/modules/pgsql.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/phar.so > ${DIST_PATH}/modules/phar.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/simplexml.so > ${DIST_PATH}/modules/simplexml.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/soap.so > ${DIST_PATH}/modules/soap.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/sockets.so > ${DIST_PATH}/modules/sockets.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/sodium.so > ${DIST_PATH}/modules/sodium.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/sqlite3.so > ${DIST_PATH}/modules/sqlite3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/ssh2.so > ${DIST_PATH}/modules/ssh2.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/swoole.so > ${DIST_PATH}/modules/swoole.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/tokenizer.so > ${DIST_PATH}/modules/tokenizer.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xml.so > ${DIST_PATH}/modules/xml.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xmlreader.so > ${DIST_PATH}/modules/xmlreader.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xmlrpc.so > ${DIST_PATH}/modules/xmlrpc.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xmlwriter.so > ${DIST_PATH}/modules/xmlwriter.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/xsl.so > ${DIST_PATH}/modules/xsl.so

	 # PHP < 7.4
	if [ "${DIST_PHP}" != "74" ]; then \
		docker exec ${DOCKER_CONTAINER} /bin/cat /opt/remi/php${DIST_PHP}/root/usr/lib64/php/modules/phalcon.so > ${DIST_PATH}/modules/phalcon.so; \
	fi;

	# Copy static libraries. Needed by the extensions above.
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcrypt.so.1 > ${DIST_PATH}/modules/libcrypt.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libargon2.so.0 > ${DIST_PATH}/modules/libargon2.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsystemd.so.0 > ${DIST_PATH}/modules/libsystemd.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libxml2.so.2 > ${DIST_PATH}/modules/libxml2.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblz4.so.1 > ${DIST_PATH}/modules/liblz4.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libdw.so.1 > ${DIST_PATH}/modules/libdw.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblzma.so.5 > ${DIST_PATH}/modules/liblzma.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libgcrypt.so.11 > ${DIST_PATH}/modules/libgcrypt.so.11
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libgpg-error.so.0 > ${DIST_PATH}/modules/libgpg-error.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libelf.so.1 > ${DIST_PATH}/modules/libelf.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libbz2.so.1 > ${DIST_PATH}/modules/libbz2.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libexslt.so.0 > ${DIST_PATH}/modules/libexslt.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsqlite3.so.0 > ${DIST_PATH}/modules/libsqlite3.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsodium.so.23 > ${DIST_PATH}/modules/libsodium.so.23
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libpq.so.5 > ${DIST_PATH}/modules/libpq.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libonig.so.5 > ${DIST_PATH}/modules/libonig.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libldap_r-2.4.so.2 > ${DIST_PATH}/modules/libldap_r-2.4.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libxslt.so.1 > ${DIST_PATH}/modules/libxslt.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libc-client.so.2007 > ${DIST_PATH}/modules/libc-client.so.2007
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libgd.so.3 > ${DIST_PATH}/modules/libgd.so.3
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/liblber-2.4.so.2 > ${DIST_PATH}/modules/liblber-2.4.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcurl.so.4 > ${DIST_PATH}/modules/libcurl.so.4
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsasl2.so.3 > ${DIST_PATH}/modules/libsasl2.so.3
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libedit.so.0 > ${DIST_PATH}/modules/libedit.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libncurses.so.5 > ${DIST_PATH}/modules/libncurses.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libtinfo.so.5 > ${DIST_PATH}/modules/libtinfo.so.5
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libnghttp2.so.14 > ${DIST_PATH}/modules/libnghttp2.so.14
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libidn2.so.0 > ${DIST_PATH}/modules/libidn2.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libssh2.so.1 > ${DIST_PATH}/modules/libssh2.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libldap-2.4.so.2 > ${DIST_PATH}/modules/libldap-2.4.so.2
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libpam.so.0 > ${DIST_PATH}/modules/libpam.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libssl3.so > ${DIST_PATH}/modules/libssl3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libsmime3.so > ${DIST_PATH}/modules/libsmime3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libnss3.so > ${DIST_PATH}/modules/libnss3.so
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libunistring.so.0 > ${DIST_PATH}/modules/libunistring.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libaudit.so.1 > ${DIST_PATH}/modules/libaudit.so.1
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcap-ng.so.0 > ${DIST_PATH}/modules/libcap-ng.so.0
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libicui18n.so.62 > ${DIST_PATH}/modules/libicui18n.so.62
	docker exec ${DOCKER_CONTAINER} /bin/cat /usr/lib64/libcap-ng.so.0 > ${DIST_PATH}/modules/libcap-ng.so.0

	# Remove temporary PHP container
	docker rm --force ${DOCKER_CONTAINER} || true

# #################################################
# Separate PHP bins + shared libs from Docker image
# #################################################

publish72:
	cd ./v7.2 && npm publish --access public

publish72-canary:
	cd ./v7.2 && \
	npm version prerelease && \
	npm publish --access public --tag canary

publish73:
	cd ./v7.3 && npm publish --access public

publish73-canary:
	cd ./v7.3 && \
	npm version prerelease && \
	npm publish --access public --tag canary

publish74:
	cd ./v7.4 && npm publish --access public

publish74-canary:
	cd ./v7.4 && \
	npm version prerelease && \
	npm publish --access public --tag canary

publish-all: publish72 publish73 publish74

publish-all-canary: publish72-canary publish73-canary publish74-canary

# #######################################
# Testing isolated PHP libs + shared libs
# #######################################

test-runtime:
	docker run \
		-it \
		--rm \
		-v $(CURDIR)/v7.3/native:/opt/now/ \
		-e LD_LIBRARY_PATH=/opt/now/modules:/var/lang/lib:/lib64:/usr/lib64:/var/runtime:/var/runtime/lib:/var/task:/var/task/lib:/opt/lib \
		-w /opt/now \
		--entrypoint /bin/bash \
		lambci/lambda:nodejs10.x
