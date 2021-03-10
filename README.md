# Mighty Earth Cocoa Accountability Map API

Database and API for the CAM

## Configuration

* Copy .env-example to .env and change values as needed
* Copy db-server/.env-example to db-server/.env and change values as needed

## Development

Using Docker and Docker Compose to start the database:

`docker volume create cam-db-data`

`docker-compose up -d db`

Start the app with: `yarn run dev`

## Loading data

* Use `create_monthly_data.sh` to create monthly GeoJSON files from the EWS data update

* Use `load_ews__month.js` to load monthly updates in the database

