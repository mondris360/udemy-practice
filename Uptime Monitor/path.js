// learning  file system

fs = require("fs");
fs.readFile("info.txt", function(error, data){
  if(error) throw error;
  else{
    console.log(data);
  }
  console.log("i got here first");
})
