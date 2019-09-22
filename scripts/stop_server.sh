#!/bin/bash
sudo su
docker stop $(docker ps -a -q)
 
