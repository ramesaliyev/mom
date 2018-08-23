#!/bin/bash

# CAUTION 
# This script will purge poc related things from docker.

# To run this file first do;
# > chmod u+x reset-poc-docker.sh
# Then;
# > ./reset-poc-docker.sh

# You can also copy/paste this into terminal window.

$(docker stop poc_postgresql_server)
$(docker stop poc_postgresql_adminer)
$(docker stop poc_rabbitmq)
$(docker stop poc_redis_server)
$(docker stop poc_redis_commander)
$(docker stop poc_sandbox)
$(docker stop poc_panel)

$(docker rm poc_postgresql_server)
$(docker rm poc_postgresql_adminer)
$(docker rm poc_rabbitmq)
$(docker rm poc_redis_server)
$(docker rm poc_redis_commander)
$(docker rm poc_sandbox)
$(docker rm poc_panel)

$(docker rmi mom-based-architecture-poc_sandbox)
$(docker rmi mom-based-architecture-poc_panel)

$(docker volume rm mom-based-architecture-poc_poc_volume_postgresql)
$(docker volume rm mom-based-architecture-poc_poc_volume_rabbitmq)
$(docker volume rm mom-based-architecture-poc_poc_volume_redis)

$(docker network rm mom-based-architecture-poc_poc_network)