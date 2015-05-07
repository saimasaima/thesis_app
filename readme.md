Oldie but a New D
===

Oldie But A New D is an informational web art piece connecting the glory of Detroit with the realities of Detroit today. This project allows one to become aware of the cultural and economic changes Detroit is facing currently. Oldie but a New D uses Diego Rivera’s Detroit Industry Murals as a figurative and literal framework to show the comparison.

[http://oldiebutanewd.com](http://oldiebutanewd.com)

##Installation and Setup
####for development
1. pull the repo, install libs, run app.
* `$ git clone https://github.com/saimasaima/thesis_app.git`
* `$ cd /thesis_app`
* `$ npm install`
* `$ nodemon app.js`


####for production server
1. login to server
* `$ git clone https://github.com/saimasaima/thesis_app.git`
* `$ cd /to/repo/folder`
* `$ npm install`
* `$ npm install pm2 -g`

####PM2 Commands

[PM2 Server Process Manager](https://github.com/Unitech/pm2)

* `$ pm2 start app.js`
* `$ pm2 dump`
* `$ pm2 restart all`
* `$ pm2 list`
* `$ pm2 logs`
* `$ pm2 stop all`


---
##Updating Server 

1. login to server
  * `$ ssh USERNAME@oldiebutanewd.com`
2. change directory to repo
  * `$ cd thesis_app`
3. pull the latest from github
  * `$ git pull origin master`
4. restart the app via PM2
  * `$ pm2 restart all`
5. monitor the app console
  * `$ pm2 logs`

--- 
##Credits