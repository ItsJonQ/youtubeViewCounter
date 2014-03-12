(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

        // Defining feed from data
        var feed = data.feed;
        if(!feed) return false;

        // Defining entries from the data
        var entries = feed.entry;
        if(!entries) return false;

        // Creating the video Collection
        var videos = new Videos(entries);

        console.log(videos);

    });
};

// Start the application
init();
},{"./collections/collections.Video.js":2,"./utils/utils.fetch":4}],2:[function(require,module,exports){
// Utils
var parse = require('../utils/utils.parse');
// Models
var VideoModel = require('../models/models.Video');


// Defining the collection
var Videos;

// Creating the video collection class
Videos = function(data) {

    // Creating a models array collection
    this.models = [];

    // Defining the viewCountTotal
    this.viewCount = 0;

    // Init method
    this.initialize = function(data) {

        if(!data) return false;

        // Looping through all the entries (videos)
        for(var i = 0, len = data.length; i < len; i++) {

            // Defining a single entry
            var entry = data[i];

            // Creating a Video model from entry
            var Video = new VideoModel(parse.entry.call(entry));

            this.add(Video);

        }

    };

    // Executing the init method on creation
    this.initialize(data);

};

// fn: Adding models to the collection
Videos.prototype.add = function(model) {

    // Return false if model is not defined
    if(!model) return false;

    // Pushing the model to the collection
    this.models.push(model);

    // Adding video view count to total
    this.addViewCount(model);

    // Returning the collection
    return this;
};

Videos.prototype.addViewCount = function(model) {

    // Return false if model is not defined
    if(!model) return false;

    var viewCount = model.attributes.viewCount;
    if(viewCount) {
        this.viewCount = this.viewCount + viewCount;
    }

    return this;

};

// Exporting the collection
module.exports = Videos;
},{"../models/models.Video":3,"../utils/utils.parse":5}],3:[function(require,module,exports){
// Defining Video (class / model)
var Video;

// Creating the Video class
Video = function(attributes) {

    this.attributes = attributes;

};

// Exporting the Video class (model)
module.exports = Video;
},{}],4:[function(require,module,exports){
// Define the fetch method
var fetch;

// fn: Fetching data from YouTube
fetch = function(callback) {

    // Using testData for development
    var testData = '/test/playlist.json';

    // Assigning the test data to the URL
    var url = testData;

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
},{}],5:[function(require,module,exports){
// Defining parse vars
var parse;
var entry;

// fn: Parse Entry
// Description: Parses an YouTube video entry to generate attributes as an object
entry = function() {

    // Defining the viewCount
    var viewCount = 0;

    // Update the viewCount if it is available from stats
    var stats = this.yt$statistics;
    if(stats && stats.viewCount) {
        viewCount = stats.viewCount;
    }

    // Return the attributes as object
    return {
        link: this.link[0].href,
        published: this.published.$t,
        title: this.title.$t,
        thumbnail: this.media$group.media$thumbnail[2].url,
        viewCount: parseInt(viewCount, 10)
    };

};

// Establishing the parse method object
parse = {
    entry: entry
};

// Exporting parse
module.exports = parse;
},{}]},{},[1])