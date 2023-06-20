#!/bin/bash

cd auth-service && npm run migration:generate --name=$1 &
cd post-service && npm run migration:generate --name=$1 &
cd file-service && npm run migration:generate --name=$1 &
cd friend-service && npm run migration:generate --name=$1 &
cd message-service && npm run migration:generate --name=$1 &
cd noti-service && npm run migration:generate --name=$1 &

wait