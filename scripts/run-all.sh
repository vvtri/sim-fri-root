#!/bin/bash

cd reverse-proxy && yarn dev &  
cd client && yarn dev &
cd auth-service && yarn dev &
cd post-service && yarn dev &
cd file-service && yarn dev &
cd message-service && yarn dev &
cd friend-service && yarn dev &
cd noti-service && yarn dev &

wait
