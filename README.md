
# Development
## install dependencies
```
$ yarn install
```

## Run local server
```
$ yarn start
```

# Deploy with basic auth
## Setup firebase
``` bash
$ mkdir firebase
$ cd firebase
$ firebase init    # check Hosting and Functions
```
edit firebase/firebase.json
``` json firebase/firebase.json
{
  "hosting": {
    "public": "public",
    "rewrites": [
      {
        "source": "**",
        "function": "app"
      }
    ],
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

edit firebase/functions/index.js

``` js firebase/functions/index.js
const functions = require('firebase-functions')
const express = require('express')
const basicAuth = require('basic-auth-connect')

const app = express()

// load auth info form config file
const config = require('./config.json')
const USERNAME = config['userName']? config['userName'] : 'user'
const PASSWORD = config['password']? config['password'] : 'password'

app.all('/*', basicAuth(function(user, password) {
  return user === USERNAME && password === PASSWORD;
}));

app.use(express.static(__dirname + '/static/'))

exports.app = functions.https.onRequest(app)
```

install modules
``` bash
$ cd functions
$ npm install --save express basic-auth-connect
$ cd ..
```

remove files from public
``` bash
$ cd public
$ rm index.html 404.html
```


## Deploy
```
$ deploy.sh
```

Modify basic auth setting defined in deploy_config.json before deployment
``` json deploy_config.json
{
    "userName": "user", 
    "password": "password"
}

```



