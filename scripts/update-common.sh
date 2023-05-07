#!/bin/bash

cd auth-service && yarn upgrade common &
cd post-service && yarn upgrade common &
cd file-service && yarn upgrade common &

wait