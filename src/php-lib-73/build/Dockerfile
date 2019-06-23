FROM amazonlinux:2.0.20190508

RUN yum install -y \
        https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm \
        https://rpms.remirepo.net/enterprise/remi-release-7.rpm \
        epel-release \
        yum-utils && \
    yum-config-manager --enable epel remi-php73 && \
    yum update -y && \
    yum upgrade -y

RUN yum install -y patchelf

RUN yum install -y \
        php73-php-bcmath \
        php73-php-cli \
        php73-php-cgi \
        php73-php-fpm \
        php73-php-gd \
        php73-php-imap \
        php73-php-intl \
        php73-php-json \
        php73-php-mbstring \
        php73-php-mysqli \
        php73-php-mysqlnd \
        php73-php-opcache \
        php73-php-pdo \
        php73-php-pgsql \
        php73-php-soap \
        php73-php-sodium \
        php73-php-tokenizer \
        php73-php-xml \
        php73-php-xmlrpc

# $ORIGIN refers to the current directory, don't evaluate it, use the single quotes
RUN patchelf --set-rpath '$ORIGIN' /usr/bin/php73
RUN patchelf --set-rpath '$ORIGIN' /usr/bin/php73-cgi
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/sbin/php-fpm
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/bcmath.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/bz2.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/calendar.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/ctype.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/curl.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/dom.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/exif.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/fileinfo.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/ftp.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/gd.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/gettext.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/iconv.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/imap.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/intl.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/json.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/mbstring.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/mysqli.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/mysqlnd.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/pdo.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/pdo_mysql.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/pdo_pgsql.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/pdo_sqlite.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/pgsql.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/phar.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/simplexml.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/soap.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/sockets.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/sodium.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/sqlite3.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/tokenizer.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/wddx.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/xml.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/xmlreader.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/xmlrpc.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/xmlwriter.so
RUN patchelf --set-rpath '$ORIGIN' /opt/remi/php73/root/usr/lib64/php/modules/xsl.so

WORKDIR /opt/now

ADD ./conf /opt/now/
ADD ./scripts /opt/now/
