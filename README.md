# Mighty Earth Cocoa Accountability Map API

Database and API for the CAM

## Configuration

- Copy .env-example to .env and change values as needed
- Copy db-server/.env-example to db-server/.env and change values as needed

## Development

1. Using Docker and Docker Compose to start the database:

```
docker volume create cam-db-data
docker-compose up -d db
```

2. Run the db migrations with

```
run-knex.sh
```

3. populate the initial H3 level 4 and 5 tables

```
node data/loadgrids.js
```

4. Load the data using instructions below

5. Start the app

```
yarn run dev
```

## Loading data

### install GDAL

on macOS install Homebrew then `brew install gdal`

or using the Docker image https://hub.docker.com/r/osgeo/gdal and attaching the data folder as a volume

### creating monthly data

Use `create_monthly_data.sh` to create monthly GeoJSON files from the EWS data update

### load grids (initial setup only)

use `node data/loadgrids.js` to populate the initial H3 level 4 and 5 tables

### insert into the database

Use `node data/load_ews_month.js` to load monthly updates in the database, update the script to set the months to load
