// learning  file system

var fs = require("fs");
fs.readFile("info.txt", "utf-8", function(err, data){
  if(err) throw err;
  else{
    console.log(data);
    callback(300, console.log("hello"))
  };
});
