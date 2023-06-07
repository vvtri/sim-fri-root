#!/bin/bash

(cd client && yarn upgrade common shared)
(cd auth-service && yarn upgrade common shared)
(cd post-service && yarn upgrade common shared)
(cd file-service && yarn upgrade common shared)
(cd message-service && yarn upgrade common shared)
(cd friend-service && yarn upgrade common shared)
(cd common && yarn upgrade shared)

# cd client && yarn upgrade common shared &
# cd auth-service && yarn upgrade common shared &
# cd post-service && yarn upgrade common shared &
# cd file-service && yarn upgrade common shared &
# cd message-service && yarn upgrade common shared &
# cd friend-service && yarn upgrade common shared &
# cd common && yarn upgrade shared &
# wait
