#!/bin/bash


cd client && git add . && git $1 -m "'"$2"'" && git push & 
cd auth-service && git add . && git $1 -m "'"$2"'" && git push &
cd base-service && git add . && git $1 -m "'"$2"'" && git push &
cd common-service && git add . && git $1 -m "'"$2"'" && git push &
cd post-service && git add . && git $1 -m "'"$2"'" && git push &
cd file-service && git add . && git $1 -m "'"$2"'" && git push &
cd message-service && git add . && git $1 -m "'"$2"'" && git push &
cd friend-service && git add . && git $1 -m "'"$2"'" && git push &
cd shared-service && git add . && git $1 -m "'"$2"'" && git push &
cd file-service && git add . && git $1 -m "'"$2"'" && git push &

wait

git add . && git $1 -m "'"$2"'" && git push
echo git $1 -m "'"$2"'"