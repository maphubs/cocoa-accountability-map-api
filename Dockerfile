FROM node:12-alpine as builder
WORKDIR /app
RUN apk update && \
    apk add --no-cache git python3 make gcc g++
COPY package.json yarn.lock /app/
RUN yarn --production --pure-lockfile && \
    yarn global add modclean && yarn run modclean
COPY . .

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app .
RUN chmod +x /app/docker-entrypoint.sh && \
    mkdir -p /app/temp
VOLUME ["/app/temp"]
EXPOSE 4005
CMD /app/docker-entrypoint.sh