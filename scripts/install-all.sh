#!/bin/bash

(cd client && yarn)
(cd auth-service && yarn)
(cd post-service && yarn)
(cd file-service && yarn)
(cd friend-service && yarn)
(cd message-service && yarn)
(cd common && yarn)
(cd shared && yarn)
(cd noti-service && yarn)

wait