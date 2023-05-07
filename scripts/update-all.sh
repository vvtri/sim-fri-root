#!/bin/bash

cd auth-service && yarn upgrade common shared &
cd post-service && yarn upgrade common shared &
cd file-service && yarn upgrade common shared &

wait