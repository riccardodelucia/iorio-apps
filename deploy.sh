#!/usr/bin/env bash

source /home/riccardo.delucia/docker-compose/bin/activate
cd /home/riccardo.delucia/deploy/iorio-apps

#docker login -u riccardo.delucia -p 5B6DrTsrp9JBVqYDStPF gitlab.fht.org:5050/riccardo.delucia/iorio-apps/iorio_apps
docker-compose pull
docker-compose down
docker-compose -p iorio_apps up --no-build -d
