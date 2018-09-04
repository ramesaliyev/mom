#!/bin/bash

# CAUTION 
# This script will purge poc related things from docker.

# To run this file first do;
# > chmod u+x reset-poc-docker.sh
# Then;
# > ./reset-poc-docker.sh

# You can also copy/paste this into terminal window.

$(docker stop poc_socket)
$(docker stop poc_panel)
$(docker stop poc_api)
$(docker stop poc_sandbox)
$(docker stop poc_worker)
$(docker stop poc_postgresql_adminer)
$(docker stop poc_exmathservice)
$(docker stop poc_rabbitmq_server)
$(docker stop poc_postgresql_server)
$(docker stop poc_redis_commander)
$(docker stop poc_redis_server)

$(docker rm poc_socket)
$(docker rm poc_panel)
$(docker rm poc_api)
$(docker rm poc_sandbox)
$(docker rm poc_worker)
$(docker rm poc_postgresql_adminer)
$(docker rm poc_exmathservice)
$(docker rm poc_rabbitmq_server)
$(docker rm poc_postgresql_server)
$(docker rm poc_redis_commander)
$(docker rm poc_redis_server)

$(docker rmi mom_socket)
$(docker rmi mom_panel)
$(docker rmi mom_api)
$(docker rmi mom_exmathservice)
$(docker rmi mom_worker)

$(docker volume rm mom_poc_volume_postgresql)
$(docker volume rm mom_poc_volume_rabbitmq)
$(docker volume rm mom_poc_volume_redis)

$(docker network rm mom_poc_network)