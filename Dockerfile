FROM nginx:1.23.4

COPY src/* /var/www
COPY nginx.conf /etc/nginx/nginx.conf
