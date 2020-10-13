#!/bin/sh
docker commit cam-api_db_1 quay.io/maphubs/cam-api-db:v1.0.0
docker push quay.io/maphubs/cam-api-db:v1.0.0