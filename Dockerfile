## PHASE 1 - COMPILE

FROM node:14.19.2-alpine as BUILD

WORKDIR /usr/src

COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn run build

# PHASE 2 - SERVE APP UNDER NGINX

FROM nginx:1.21.6

ARG EXPORTER_TAR=nginx-prometheus-exporter_0.10.0_linux_amd64.tar.gz
ARG EXPORTER_FILE=nginx-prometheus-exporter
ARG VERSION=v0.10.0

RUN curl https://github.com/nginxinc/nginx-prometheus-exporter/releases/download/${VERSION}/${EXPORTER_TAR} \
    --output ${EXPORTER_TAR} && tar -xvf ${EXPORTER_TAR} -C /usr/local/bin/ ${EXPORTER_FILE} && rm ${EXPORTER_TAR}

COPY config/docker-start.sh /docker-entrypoint.d
RUN chmod +x /docker-entrypoint.d/docker-start.sh

WORKDIR /srv/app

COPY --from=BUILD /usr/src/dist /srv/app
COPY config/*.html ./
COPY config/default.conf /etc/nginx/conf.d
