#!/bin/bash

echo 'Starting nginx-prometheus-exporter';
/usr/local/bin/nginx-prometheus-exporter \
    -nginx.retries 10 \
    -nginx.scrape-uri http://localhost/status &

