#!/bin/sh

PATH=/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
export PORT="9090"
export HUBOT_HTTPD="true"
export HUBOT_NICK="niseda1ro"
export HUBOT_SLACK_TOKEN=""

./bin/hubot -a slack -n niseda1ro

