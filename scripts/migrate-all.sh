#!/bin/bash

cd auth-service && npm run migration:up &
cd post-service && npm run migration:up &
cd file-service && npm run migration:up &
cd friend-service && npm run migration:up &
cd message-service && npm run migration:up &
cd noti-service && npm run migration:up &

wait