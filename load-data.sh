#!/bin/sh
export $(cat .env | grep -v ^# | xargs) && \
node data/load_ews_month.js