#!/bin/bash
cd /home/zao

if [! -d "competition-system"]; then
  git clone https://github.com/lyandzao/competition-system.git
fi

cd competition-system
git pull
yarn
yarn build
docker stop competition-system
docker rm competition-system
docker rmi -f cs
docker build -t cs .
docker run --name competition-system -d -p 80:80 cs