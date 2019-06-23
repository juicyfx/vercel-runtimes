# @juicyfx/php-lib-73

> PHP 7.3 compiled binaries with static shared libraries. 

## Usage

- `make build` - builds the Docker image with PHP sources
- `make distribution` - separate PHP + PHP-FPM with extensions and share libraries to `/native` folder
- `make test-php` - test PHP is properly loaded and working
- `make test-fpm` - test PHP-FPM is properly loaded and working
