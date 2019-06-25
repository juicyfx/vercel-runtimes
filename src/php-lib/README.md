# @juicyfx/php-lib

> PHP compiled binaries with static shared libraries. 

## Versions

- PHP 7.2
- PHP 7.3
- PHP 7.4

## Usage

**Build**

- `make build72` - builds the Docker image with PHP 7.2 sources
- `make build73` - builds the Docker image with PHP 7.3 sources
- `make build74` - builds the Docker image with PHP 7.4 sources

**Compile**

- `make dist72` - separate PHP (+CGI, FPM) bins with extensions and share libraries to `/v7.2` folder
- `make dist73` - separate PHP (+CGI, FPM) bins with extensions and share libraries to `/v7.3` folder
- `make dist74` - separate PHP (+CGI, FPM) bins with extensions and share libraries to `/v7.4` folder

**Testing**

- `make test-php` - test PHP is properly loaded and working
- `make test-fpm` - test PHP-FPM is properly loaded and working
