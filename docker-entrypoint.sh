#!/bin/sh

#run any pending database migrations
node --max-old-space-size=$NODE_MEM_SIZE node_modules/knex/bin/cli.js --knexfile=src/knexfile.js migrate:latest --env production

#start server
node --max-old-space-size=$NODE_MEM_SIZE src/server.js