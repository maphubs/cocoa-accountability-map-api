# Mighty Earth Cocoa Accountability Map API

Database and API for the CAM

## Configuration

- Copy .env-example to .env and change values as needed
- Copy db-server/.env-example to db-server/.env and change values as needed

## Development

1. Install dependencies

This assumes you have NodeJS v12 or higher and Yarn installed

```
yarn install
```

2. Using Docker and Docker Compose to start the database:

```
docker volume create cam-db-data
docker-compose up -d db
```

Note: wait a minute or two for the database to initialize

3. Run the db migrations with

```
./run-knex.sh migrate:latest
```

4. populate the initial H3 level 4 and 5 tables

```
node data/loadgrids.js
```

5. Load the data using instructions below

6. Start the app

```
yarn run dev
```

### to clear the data to start over

```
docker-compose down
docker volume rm cam-db-data
```

## Loading data

### install GDAL

on macOS install Homebrew then `brew install gdal`

or using the Docker image https://hub.docker.com/r/osgeo/gdal and attaching the data folder as a volume

### creating monthly data

Use `data/create_monthly_data.sh` to create monthly GeoJSON files from the EWS data update

### load grids (initial setup only, you may have already done this above)

use `node data/loadgrids.js`to populate the initial H3 level 4 and 5 tables

### insert into the database

Use `node data/load_ews_month.js` or the `load-data.sh` script in development, to load monthly updates in the database, update the script to set the months to load
