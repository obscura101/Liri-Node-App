//NPM Packages installed 
require("dotenv").config();
var keys = require("./keys.js");
var request = require("request")
var Spotify = require("node-spotify-api");
var moment = require("moment");
        moment().format();
var fs = require("fs");
var axios = require("axios");

//Save spotify key to a variable
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv;
var userInput = "";
var text = "";

//Get user input for song/artist/movie name from process.argv[3]
for (var i = 3; i < nodeArgs.length; i++) {
    //If userInput is more than 1 word
    if (i > 3 && i < nodeArgs.length) {
        userInput = userInput + "%20" + nodeArgs[i];
    }
    //If userInput is only 1 word
    else {
        userInput += nodeArgs[i];
    }
}

//Remove %20 when pushing to log.txt
for (var i = 3; i < nodeArgs.length; i++) {
    text = userInput.replace(/%20/g, " ");
}

var action = process.argv[2];


function runLiri() {
    //Switch-case will direct which function gets run. Activity 15. 
    switch (action) {
        
        case "concert-this":
            //Append userInput to log.txt. Activity 14.
                fs.appendFile("log.txt", text + "\n----------------\n", function (error) {
                    if (error) {
                    console.log(error);
                    };
                });
            
        //Run request to bandsintown with the specified artist
            var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

                axios.get(queryURL)
                .then(function(response) {
                    // console.log(response)
                    for (var i = 0; i < response.length; i++);
                        console.log("Venue: " + response.data[i].venue.name);
                        console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
        
                    var date = response.data[i].datetime;
                    date = moment(date).format("MM/DD/YYYY");
                        console.log("Date: " + date)
                        fs.appendFileSync("log.txt", "Venue: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.city + ", " + 
                                        response.data[i].venue.country + "\nDate: " + date + "\n----------------\n", function (error) {
                            if (error) {
                                //console.log(error);
                            }});
                })
                .catch(function(error) {
                    if (error.response) {
                        //console.log("Error");
                    }
                })
        break;
        
        case "spotify-this-song":
        //If statement for no song provided
            if (!userInput) {
                userInput = "The%20Sign";
                text = userInput.replace(/%20/g, " ");
            }
            //Append userInput to log.txt
            fs.appendFile("log.txt", text + "\n----------------\n", function (error) {
                if (error) {
                    console.log(error);
                };
            });
        
            // From Node-Spotify-API
            spotify.search({
                type: "track",
                query: userInput
            }, function (err, data) {
                if (err) {
                    console.log("Error occured: " + err)
                }
                
                var info = data.tracks.items
                for (var i = 0; i < info.length; i++) {
                    var albumObject = info[i].album;
                    var trackName = info[i].name
                    var preview = info[i].preview_url
                    var artistsInfo = albumObject.artists
                    for (var j = 0; j < artistsInfo.length; j++) {
                        console.log("Artist: " + artistsInfo[j].name)
                        console.log("Song Name: " + trackName)
                        console.log("Preview of Song: " + preview)
                        console.log("Album Name: " + albumObject.name)
                        console.log("----------------")
                       
                        fs.appendFile("log.txt", "Artist: " + artistsInfo[j].name + "\nSong Name: " + trackName + "\nPreview of Song: " + preview + "\nAlbum Name: " 
                            + albumObject.name + "\n----------------\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                    }
                }
            })

        break;
            
        case "movie-this":
             //If statement for no movie provided
             if (!userInput) {
                userInput = "Mr%20Nobody";
                text = userInput.replace(/%20/g, " ");
            }

            //Append userInput to log.txt. Activity 14. 
            fs.appendFile("log.txt", text + "\n----------------\n", function (error) {
                if (error) {
                    console.log(error);
                };
            });
            //Run request to OMDB
            var queryURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=2433905a";

            axios.get(queryURL).then(
                function(response) {
                    console.log("Title: " + response.data.Title)
                    console.log("Release Year: " + response.data.Year)
                    console.log("IMDB Rating: " + response.data.Ratings[0].Value)
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
                    console.log("Country: " + response.data.Country)
                    console.log("Language: " + response.data.Language)
                    console.log("Plot: " + response.data.Plot)
                    console.log("Actors: " + response.data.Actors)
                    
                  
                    fs.appendFile("log.txt", "Title: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nIMDB Rating: " + response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " +
                    response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n----------------\n",
                        function(error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                })
                .catch(function(error) {
                    if (error.response) {
                        console.log("Error");
                    }
                });
                
            break;
    }
}

if (action == "do-what-it-says") {
    var fs = require("fs");
    //Read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }
        //Split data into array
        var textArr = data.split(",");
        action = textArr[0];
        userInput = textArr[1];
        text = userInput.replace(/%20/g, " ");
        runLiri();
    })
}
        

runLiri();