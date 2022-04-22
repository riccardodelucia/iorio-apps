#!/usr/bin/env bash

source /home/riccardo.delucia/docker-compose/bin/activate
cd /home/riccardo.delucia/deploy/iorio-apps
docker-compose pull
docker-compose down
docker-compose -p iorio_apps up --no-build -d