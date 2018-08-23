#!/bin/bash

# CAUTION 
# This script will purge everything from docker.

# To run this file first do;
# > chmod u+x reset-all-docker.sh
# Then;
# > ./reset-all-docker.sh

# You can also copy/paste this into terminal window.

$(docker stop -f $(docker ps -aq)) / 
$(docker rm -f $(docker ps -aq)) / 
$(docker rmi -f $(docker images -aq)) /  
$(docker network rm $(docker network ls -q)) / 
$(docker volume rm $(docker volume ls -q)) / 