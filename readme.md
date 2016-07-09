#The Jerk Project  
The Jerk project is two parts:  

###Jerkless:  
A hybrid iOS app that tracks "jerks" (changes in acceleration). It has two settings: city and mountain mode.  
![alt text](https://github.com/blakeface/jerkless/blob/master/client_server/public/images/start.png "Landing screen")  
![alt text](https://github.com/blakeface/jerkless/blob/master/client_server/public/images/giphy.gif "Recording screen")  
![alt text](https://github.com/blakeface/jerkless/blob/master/client_server/public/images/summary.png "Summary screen")  

###Jerkmaps:  
Maps out the Jerkless data and color-codes each geo-point. It also contains a hidden bonus feature...  

Installation:    
$ npm install -g ionic  
$ npm install  
$ cd ionic

To run with an emulator:   
$ ionic emulate ios  

To run with on a browser:  
$ ionic serve ios  


*NOTE*: Due to interpretation differences, Jerkless will display differently between a browser, emulator, and iOS device. Jerkless is configured to show best on an iOS device.


Specs:  
Ionic, iOS accelerometer and geo-locator, Node.js, Angular, Mapbox
