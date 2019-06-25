// set environment variables with dotenv files
require("dotenv").config();

// require our keys file that has links to our spotify ID and Secret
var keys = require("./keys.js");

// setting spotify request to variable spotify
var spotify = new spotify(keys.spotify);

var command = process.argv[2];

//checking command line 
if (command == "concert-this") {
    
}