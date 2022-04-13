FROM atf.intranet.bb.com.br:5001/bb/lnx/lnx-node-alpine:10.16.1 AS builder
WORKDIR /app
COPY package.json .
COPY . .
RUN npm run build

FROM atf.intranet.bb.com.br:5001/nginx:stable
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./setup-env.sh /docker-entrypoint.d/setup-env.sh
RUN chmod +x /docker-entrypoint.d/setup-env.sh