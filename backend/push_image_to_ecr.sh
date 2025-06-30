#!/bin/bash

if [[ ! "$1" =~ ^(production|staging|pilot)$ ]]; then
    echo "Error: Argument must be either 'production', 'staging', or 'pilot'"
    exit 1
fi

aws ecr get-login-password --region ap-southeast-1 --profile nusc-predict | docker login --username AWS --password-stdin 545009827605.dkr.ecr.ap-southeast-1.amazonaws.com
docker tag nusc-predict:latest 545009827605.dkr.ecr.ap-southeast-1.amazonaws.com/nusc-predict:$1
docker push 545009827605.dkr.ecr.ap-southeast-1.amazonaws.com/nusc-predict:$1