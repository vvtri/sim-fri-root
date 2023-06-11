#!/bin/bash


cd client && git add . && git cmm "'"$2"'" && git push & 
cd auth-service && git add . && git cmm "'"$2"'" && git push &
cd base-service && git add . && git cmm "'"$2"'" && git push &
cd common && git add . && git cmm "'"$2"'" && git push &
cd post-service && git add . && git cmm "'"$2"'" && git push &
cd file-service && git add . && git cmm "'"$2"'" && git push &
cd message-service && git add . && git cmm "'"$2"'" && git push &
cd friend-service && git add . && git cmm "'"$2"'" && git push &
cd shared && git add . && git cmm "'"$2"'" && git push &
cd file-service && git add . && git cmm "'"$2"'" && git push &

wait

git add . && git cmm "'"$2"'" && git push
