// Define the fetch method
var fetch;

// fn: Fetching data from YouTube
fetch = function(callback) {

    var url;
    var playlistID;

    // Using testData for development
    var testData = '/test/playlist.json';

    // Assigning the test data to the URL
    url = testData;

    // Geneva Auto Show 2014 Playlist
    playlistID = 'PL-QYLnbz1Uu2IkTnDsHEGzLcOW9tRzf-y';
    url = 'https://gdata.youtube.com/feeds/api/playlists/'+playlistID+'?v=2&alt=json&max-results=40';


    // Initializing the jQuery ajax method to perform GET request
    $.ajax({

        // Assign the URL
        url: url,

        // Init the callback on success
        success: function(data) {

            if(callback && typeof callback === 'function') {
                callback(data);
            }

        }

    });
};

// Export the fetch method
module.exports = fetch;