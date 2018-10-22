## AuthSysJS
This is a scafolded express application with a basic authentication system built in. It stores users in a Mongo database and generates JWT tokens upon login. There is a check-auth middleware that can be added to any route you want to protect from non logged users.

## Requirements
Node and NPM. 
Mongo database connection details

## Installation and run
Install all dependencies with
```
npm install
```
Configure you Mongo DB connection in config/*.js

Configure

Check all tests pass with
```
npm run test
```

To run it in local
```
npm start
```


## Author

* **Antonio Ufano** - *Initial work* - @uF4No
