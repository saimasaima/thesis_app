Oldie but a New D
===

project info should go here.

[http://oldiebutanewd.com](http://oldiebutanewd.com)

##Installation and Setup
####for development
1. clone repo
* `cd /to/repo/folder`
* `npm install`
* nodemon app.js


####for production server
1. clone repo locally
* `cd /to/repo/folder`
* `npm install`
* `npm install pm2 -g`

####PM2 Commands

[PM2 Process Manager](https://github.com/Unitech/pm2)

* `pm2 start app.js`
* `pm2 dump`
* `pm2 restart all`
* `pm2 stop all`

---
##Updating Server 

1. login to server
  * `$ ssh iot@oldiebutanewd.com`
2. change directory to repo
  * `$ cd thesis_app`
3. pull the latest from github
  * `$ git pull origin master`
4. restart the app via PM2
  * `$ pm2 restart all`

--- 
##Credits