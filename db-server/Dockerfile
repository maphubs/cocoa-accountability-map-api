FROM postgis/postgis:12-3.0-alpine

RUN mkdir -p /docker-entrypoint-initdb.d
COPY script/*.sh  /docker-entrypoint-initdb.d/
COPY cluster_setup.sh /var/lib/postgresql/
RUN chmod +x /var/lib/postgresql/cluster_setup.sh