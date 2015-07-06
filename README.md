# UCSC mobile portal

## Instructions:
* Install bower using ```sudo npm install bower -g```. Then run bower in the portal directory to install 
  front-end dependencies: ```bower install```.
* Install gulp using ```sudo npm install gulp -g```. Then install the gulp plugins: ```npm install```.
* Run ```gulp``` to compile, minify, lint and test front-end assets.
* Run ```gulp debug default``` while you are developing so that you can use the unminified version of your assets.
* Run ```gulp server``` or ```gulp debug server``` if you want the default task run and your files served by a 
  development HTTP server (includes livereload!)
* Run ```gulp test``` to execute a single run of tests.
