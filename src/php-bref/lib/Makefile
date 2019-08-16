prepare:
	git clone git@github.com:brefphp/bref.git bref

sync:
	git -C reset --hard HEAD
	git -C bref pull

build:
	# Just build from Docker hub
	sed -i '' -e 's/export\/php%.zip: build/export\/php%.zip:/g' bref/runtime/Makefile

	# Create binaries
	cd bref/runtime && make export/php-73-fpm.zip

	# Ensure folder
	mkdir -p native

	# Extract binaries
	tar zxvf bref/runtime/export/php-73-fpm.zip -C native

	# Replace PHP paths
	#sed -i '' -e "s/\/opt\/bin\/php/\/var\/task\/native\/bref\/bin\/php/g" ./native/bootstrap

	# Use our tuned bootstrap
	cp bootstrap ./native/bootstrap

publish:
	npm publish --access public

publish-canary:
	npm version prerelease
	npm publish --access public --tag canary
