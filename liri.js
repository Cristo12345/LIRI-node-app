//getting axios and dotenv package 
require("dotenv");
var axios = require("axios");
require("moment");

var fs = require("fs");

//API's
var Spotify = require("node-spotify-api");


// set environment variables with dotenv files
require("dotenv").config();

// require our keys file that has links to our spotify ID and Secret
var keys = require("./keys.js");

// setting spotify request to variable spotify
var spotify = new Spotify(keys.spotify);

//getting command from command line
var command = process.argv[2];

// rather than making a separate search tag for each command, i just made a general one
// to be used by all querys. Lose the "Mr Nobody" search but saves a bit of space and time.
var query = process.argv.slice(3).join(" ");
console.log(query);

//checking command line 
switch (command) {
    case "spotify-this-song":

        spotify.search({
                type: "track",
                query: query
            })
            .then(function (response) {
                var track = response.tracks.items[0];
                console.log("Artsit: " + track.artists[0].name);
                console.log("Name: " + track.name);
                console.log("Album: " + track.album.name);
                console.log("Link: " + track.preview_url);
            })
            .catch(function (err) {
                console.log(err);
            })
        break;


    case "movie-this":
        queryURL = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
        // console.log(queryURL);

        axios.get(queryURL).then(
            function (response) {
                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("Runtime: " + response.data.Runtime);
            }
        )

        break;

    // concert-this only works for artists that have an event listed on BandsInTown
    case "concert-this":

        queryURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";

        axios.get(queryURL).then(
            function (response) {
                // console.log("Venue: " + response.venue.name);
                // console.log("QueryURL: " + queryURL)
                console.log("Venue Name: " + response.data[0].venue.name);
                console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
                console.log("Date: " + response.data[0].datetime);
            }
        )
        break;


    // this part mainly pseudocoded due to laziness
    // if working correctly, "do-what-it-says" should lead to an infinite loop if random.text has "do-what-it-says" written in it
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            console.log(data);
            dataArray = data.split(",");

            console.log(dataArray);
        });
        break;


        // to get do-what-it-says to work just have to put all our previous code into functions and evoke them in this switch case
        // depending on whatever value the first element of this array has ie, the command

        //I am very lazy right now so this is the basic pseudocode for it 
        
        // switch (dataArray[0]) {
        //     case "spotify-this-song":
        //         spotifyThis(dataArray[1]);
        //         break;
        //     case "movie-this":
        //         movieThis(dataArray[1]);
        //         break;
        //         ... do the same for other functions


        // })
}