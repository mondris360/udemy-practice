// this app will allow users to monitor a specific url and get alert via sms
// when the website is down or back online.

// this is the major file for the API

//create  the http server
//dependencies
const http =  require("http");
const https =  require("https");
const url = require("url");
// decode data  to a specific format
const stringDecoder =  require("string_decoder").StringDecoder
// import the app configuration file
config =  require("./config");
// import file system module
const fs = require("fs");
//import the data.js library we created inside the lib dir
const dataOperation = require("./lib/data.js")

dataOperation.create("users","records",{
    "fullname":"Okundolor Mondris",
    "gender":"Male",
    "username":"justmondris",
    "password":"123234"
}, function(err){
  if(err){
    console.log(err)
  }

});


// create the http server  and parse the request and response to the server
const httpServer = http.createServer(function(request, response){
unifiedServer(request, response);
});

// specify the port the created  http server will listen on
httpServer.listen(config.httpPort, function(){
  console.log("HTTP  Server is running on port  " + config.httpPort + " in  " + config.envName + " Mode");
});

// specify the https options parameters

var options = {
  "cert": fs.readFileSync("./https/cert.pem"),
  "key": fs.readFileSync("./https/key.pem")
}

//create the https server
const httpsServer =  https.createServer(options, function(request, response){
  unifiedServer(request, response);
});

// specify the port the https server will listen on
httpsServer.listen(config.httpsPort, function(){
  console.log(" HTTPS Server is running on port  " + config.httpsPort + " in  " + config.envName + " Mode");
});


// both http and https server will use the following server 877l7Wco8C2LsQdgO4X5Bq6QAIUcbrOnpNaFChzjEBTubU
var unifiedServer  = function(request, response){
   // parse the url i.e break it into its various components
   const parsedUrl =  url.parse(request.url, true) // note: true means call the  query string module and use it to parse the query inside the url
   const pathName =  parsedUrl.pathname;
   // remove  /  from the begining and the ending part of the pathname
   const trimmedPathName = pathName.replace(/^\/+|\/+$/g, "");
   // get the HTTP method used
   const method = request.method.toLowerCase();
   // get the Query string in the request as an object
   const queryStrObj =  parsedUrl.query;
   // get the http headers as an Object
   const headers =  request.headers;
   // create a string decoder Object and specify the format you are decoding to
   var decoder = new stringDecoder("utf-8");

   // add an event listener to the request and accumulate all the data the server is releasing gradually
   var dataContainer  = "";
   request.on("data", function(data){
      //grab the piece of data and  add it to the dataContainer
      dataContainer += decoder.write(data);
  });
    // do this once we have reached the end of the data

   request.on("end", function(){
      // add the end of the data to the data Container
      dataContainer += decoder.end();
      // choose the handler to use
      chosenHandler = trimmedPathName in router ? router[trimmedPathName] : handlers.notFound;
      // construct the data object to be sent to the handlers
      var data = {
          "path" : trimmedPathName,
          "merthod":method,
          "query": queryStrObj,
          "headers" : headers,
          "payload": dataContainer
      };
      //route the request to the handler specified in the router
      chosenHandler(data, function(statusCode, payload){
         //use the status code called back by the handler or default to 200
        statusCode = typeof(statusCode) == "number" ? statusCode: 200;
        // use the payload called back by the handler or default to an empty Object

        payload =  typeof(payload) == "object" ? payload : {};

        // convert the payload to a string
        var payloadString =  JSON.stringify(payload);
        //tell the client the format of the request msg e.g json, html e.t.c
         response.setHeader("Content-Type", "application/json");
         response.writeHead(statusCode);
         response.end(payloadString);
         console.log("server returned this response: ", statusCode, payloadString);
      });

    });
 };


//  creating route handlers

handlers = {};

// ping hander
handlers.ping = function(data, callback){
  callback(200);
};

handlers.notFound =  function(data, callback){
  callback(404);
};


router = {
  ping: handlers.ping
};
