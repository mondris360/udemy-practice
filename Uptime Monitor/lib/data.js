// creating a liberary  that will perform all the data operations e.g createfile, openfile, write to file e.t.case expression

// dependencies
var fs =  require("fs");
var path =  require("path");

var lib = {};
// get the base  dir where the data will be written to and normalize int
lib.baseDir = path.join(__dirname, "/../.data");

//create a file and write data to it and if the file already exists, throw error;

lib.create =  function(dir, file, data, callback){
  // the absolute path of the file to open according to the user's input
  var absolutePath = path.join(lib.baseDir, dir,file+".json");
  //open the file for writing and through error if th file already exists
  // convert the data  to json string
  var convertedData = JSON.stringify(data);
  fs.open(absolutePath,"wx",function(err,fileDescriptor){
    if(err || !fileDescriptor){
      callback("could not create file, it may already exists");
    }
    else{
        fs.writeFile(fileDescriptor, convertedData, function(err){
          if(err){
            callback("An error Occured while writing to file");
          }
          else{
            callback("file was successfully written to");
          }
          fs.close(fileDescriptor, function(err){
            if(err){
              callback("An error occured while closing the file");
            }
            else{
              callback("file has been closed successfully");
            }
          });
        });
    }

  });
};

// function to read a file

lib.read =  function(dir,fileName, callback){
  // form the file absolute pathName
  fileAbsPath = path.join(lib.baseDir, dir, "fileName + .json");
    //read the content of the fileName
    fs.readFile(fileAbsPath, "utf-8",function(err, data){
      if(err){
        callback(err);
      }
      else if(!data){
        callback("the file does not contain any data");
      }
      else{
        callback("file content was read sucessfully", data);
      }
    });

}




















module.exports = lib;
