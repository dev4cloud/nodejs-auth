## JavaScript Auth System (JWT)
This is a basic authentication system built with Express. It stores users in a Mongo database and generates JWT tokens upon login. There is a check-auth middleware that can be added to any route you want to protect from non logged users.

## Requirements
You need Node and NPM. 
Mongo DB

## Installation and run
Install all dependencies with
```
npm install
```
Configure you Mongo DB connection in nodemon.json and test/config.js

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
