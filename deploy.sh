#!/bin/sh
NODE_ENV=production
PACKAGE_VERSION=`node -p "require('./version.json').version"`

#docker build
docker pull node:12-alpine
docker build . --rm -t quay.io/maphubs/cam-api:v$PACKAGE_VERSION

#commit version tag
git add version.json
git commit  -m "version $PACKAGE_VERSION"
git tag v$PACKAGE_VERSION
git push origin
git push origin v$PACKAGE_VERSION

#push Docker image to repo
docker push quay.io/maphubs/cam-api:v$PACKAGE_VERSION
