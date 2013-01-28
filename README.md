Green Road Prototyp
================
This is a really rough prototype for our carpooling app



Installation
------------
1.  Clone or download the repo

2.  install nodeJs (https://github.com/joyent/node/wiki/Installation) and npm

3.  cd into the directory

4.  install dependencies locally by 
```sh
    npm install -l
```

5. 
 ```sh
    node app.js
```

6.  go to "localhost:3000" on your browser

Suggestions
------------
1.  install nodemon module.



Suggestions
------------

Current API
------------
DRIVERS API
GET     /drivers/routes/route_ID    show the route information
POST    /drivers/routes             create a new driver request (passing in driver UID, START, and END)
PUT     /drivers/routes/route_ID    update a driver's route request


RIDERS API
GET     /riders/rider_ID            show a rider request
GET     /riders                     show all rider requests
POST    /riders                     create a new rider request (passing in rider UID, START, and END)
PUT     /riders/rider_ID            update a rider's request

USER general API
GET     /users
GET     /users/user_id

NOTE: Right now i'm assuming a user can only be either a driver or a rider. And a rider can only have one ride request at a time.
NOTE: right now I'm testing with a few dummy users

TODO
------------
API for 
1. get/set potential riders (MOST IMPORTANT)
2. rider pick up 
3. estimate time for rider
4. update current location

Requirements
------------
*  nodejs
*  express
*  googlemaps module 