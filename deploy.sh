#! /bin/bash

yarn build
cp index.html firebase/functions/static/
cp -r dist firebase/functions/static/
cp deploy_config.json firebase/functions/config.json
cd ./firebase
firebase deploy