#!/bin/bash

cd client && git add . && git cmm '$1' & 
cd auth-service && git add . && git cmm '$1' &
cd base-service && git add . && git cmm '$1' &
cd common-service && git add . && git cmm '$1' &
cd post-service && git add . && git cmm '$1' &
cd file-service && git add . && git cmm '$1' &
cd message-service && git add . && git cmm '$1' &
cd friend-service && git add . && git cmm '$1' &
cd shared-service && git add . && git cmm '$1' &
cd file-service && git add . && git cmm '$1' &

wait

git add . && git cmm '$1'