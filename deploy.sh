#!/usr/bin/env bash

source /home/riccardo.delucia/docker-compose/bin/activate
cd /home/riccardo.delucia/deploy/iorio-apps

docker login -u riccardo.delucia -p $DEPLOY_TOKEN_COMBIO_DEV01
docker-compose pull
docker-compose down
docker-compose -p iorio_apps up --no-build -d
