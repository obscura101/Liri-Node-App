# About this App

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

1. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.
2. Data is retrieved by using the `axios` package to the Bands in Town, Spotify and OMDB APIs. 
3. Liri will display the current Concert Dates, Song Information and Movie Details from said APIs.  
3. To make this work Liri takes in the following commands from terminal (see samples below): 

# concert-this
Upcoming concerts by band.
<p>
    <img src="https://raw.githubusercontent.com/obscura101/Liri-Node-App/master/Images/Concert-This.png" width="1000"/>
  
</p>

# spotify-this-song
Choose a song and Spotify will search it. 
<p>
    <img src="https://raw.githubusercontent.com/obscura101/Liri-Node-App/master/Images/spotify-this-song.png" width="1000"/>
  
</p>

# movie-this
Retrieve movie information from the OMDB API.  
<p>
    <img src="https://raw.githubusercontent.com/obscura101/Liri-Node-App/master/Images/Movie-this.png" width="1000"/>
  
</p>

# do-what-it-says
This is a call from an internal random.txt package that Spotify will run.  In this example Spotify will search "I want it That Way."
<p>
    <img src="https://raw.githubusercontent.com/obscura101/Liri-Node-App/master/Images/do-what-it-says.png" width="1000"/>
  
</p>

# default-to
If no search criteria is provided, the Spotify search defaults to the popular 90s hit "The Sign" by Ace of Base. 

<p>
    <img src="https://raw.githubusercontent.com/obscura101/Liri-Node-App/master/Images/default-to.png"/>
  
</p>

# Mr. Nobody

If no movie search criteria is provided, OMBD search defaults to Mr. Nobody.  

<p>
    <img src="https://raw.githubusercontent.com/obscura101/Liri-Node-App/master/Images/mr.nobody.png"/>
  
</p>


