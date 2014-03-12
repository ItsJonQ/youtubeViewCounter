// Utils
var fetch = require('./utils/utils.fetch');
var parse = require('./utils/utils.parse');

// Models
var VideoModel = require('./models/models.Video');

// Init
var init;

// fn: Init
// Description: Starts the application
init = function() {

    // Fetch data from YouTube
    fetch(function(data) {

        // Defining feed from data
        var feed = data.feed;
        if(!feed) return false;

        // Defining entries from the data
        var entries = feed.entry;
        if(!entries) return false;

        // Looping through all the entries (videos)
        for(var i = 0, len = entries.length; i < len; i++) {

            // Defining a single entry
            var entry = entries[i];

            // Creating a Video model from entry
            var Video = new VideoModel(parse.entry.call(entry));

            console.log(Video);

        }

    });
};

// Start the application
init();