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

        // Creating the video Collection
        var videos = new Videos(data);

    });
};

// Start the application
init();