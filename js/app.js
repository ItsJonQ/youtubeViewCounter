// Utils
var fetch = require('./utils/utils.fetch');

// Collection
var Videos = require('./collections/collections.Video.js');

// Init
var init;

// fn: Init
// Description: Starts the application
init = function() {

    // Fetch data from YouTube
    fetch(function(data) {

        console.log(data);

        // Defining feed from data
        var feed = data.feed;
        if(!feed) return false;

        // Defining entries from the data
        var entries = feed.entry;
        if(!entries) return false;

        // Creating the video Collection
        var videos = new Videos(entries);

        ko.applyBindings(videos);

        console.log(videos);

    });
};

// Start the application
init();