#!/bin/bash

cd client && yarn &
cd auth-service && yarn &
cd post-service && yarn &
cd file-service && yarn &
cd common && yarn &
cd shared && yarn &

wait