// creating different configuration settings to be used for different
// environments
// i.e the app can run on different environment by using different settings

//creating the environment Container

var environment = {};

// creating the development environment  as property name and its config setings as the property value (object)

environment.development = {
  "envName": "Development",
  "httpPort":5050,
  "httpsPort":5051
};

// creating the staging environment  as property name and its config setings as the property value (object)

environment.staging = {
  "envName":"staging",
  "httpPort":2020,
  "httpsPort":2021
};

// creating the production environment  as property name and its config setings as the property value (object)

environment.production = {
  "envName": "production",
  "httpPort": 3000,
  "httpsPort":3001
};


// check if the specified environment during runtime, is among the different environments that are specified in the app config file
// if yes, export and  use the environment name otherwise,  default to development environments

var currentEnvironment = typeof(process.env.NODE_ENV) == "string" ? process.env.NODE_ENV.toLowerCase() : "";

// export the specified environment obj if it exists in the environment  if  not, export the default environment: development environment
var envToExport = currentEnvironment in environment ? environment[currentEnvironment] : environment.development;

module.exports = envToExport;
