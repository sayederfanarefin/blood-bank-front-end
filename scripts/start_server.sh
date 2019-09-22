#!/bin/bash
# bash /var/www/brandbastion/bin/development.sh
sudo su
cd /var/www/brandbastion/frontend-app
docker-compose build
docker-compose up -d
