prepare:
	git clone git@github.com:brefphp/bref.git bref

build:
	# Just build from Docker hub
	sed -i -e 's/distribution: build/distribution:/g' bref/runtime/php/Makefile

	# Create binaries
	cd bref/runtime/php && make distribution

	# Ensure folder
	mkdir -p native

	# Extract binaries
	tar zxvf bref/runtime/export/php-73-fpm.zip -C native 

	# Replace PHP paths
	sed -i -e "s/\/opt\/bin\/php/\/var\/task\/native\/bref\/bin\/php/g" ./native/bootstrap

publish:
	npm publish --access public

publish-canary:
	npm version prerelease
	npm publish --access public --tag canary
