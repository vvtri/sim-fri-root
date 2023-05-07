#!/bin/bash

cd auth-service && yarn upgrade shared &
cd post-service && yarn upgrade shared &
cd file-service && yarn upgrade shared &

wait