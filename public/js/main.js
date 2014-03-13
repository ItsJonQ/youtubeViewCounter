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
},{"./collections/collections.Video.js":2,"./utils/utils.fetch":5}],2:[function(require,module,exports){
// Utils
var compare = require('../utils/utils.compare');
var parse = require('../utils/utils.parse');

// Models
var VideoModel = require('../models/models.Video');


// Defining the collection
var Videos;

// Creating the video collection class
Videos = function(data) {

    // Defining the Attributes for this collection
    this.attributes = {};

    // Creating a models array collection
    this.models = ko.observableArray([]);

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

        // Sorting the models by DESC order (based on Date)
        this.models().sort(function(a, b) {
            return compare.desc(a, b);
        });

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

// fn: Adding view counts from the model to the view counts in the collection
Videos.prototype.addViewCount = function(model) {

    // Return false if model is not defined
    if(!model) return false;

    // Defining the viewCount from the model
    var viewCount = model.attributes.viewCount;

    // Adding the viewCount to the collection's viewCount
    if(viewCount) {
        this.viewCount = this.viewCount + viewCount;
    }

    // Returning the collection
    return this;

};

// Exporting the collection
module.exports = Videos;
},{"../models/models.Video":3,"../utils/utils.compare":4,"../utils/utils.parse":6}],3:[function(require,module,exports){
// Defining Video (class / model)
var Video;

// Creating the Video class
Video = function(attributes) {

    this.attributes = attributes;

};

// Exporting the Video class (model)
module.exports = Video;
},{}],4:[function(require,module,exports){
// Defining the compare/sort methods
var asc;
var desc;


// Defining the sort by ASC method
asc = function(a, b) {

    if(!a || !b) return false;

    // Sort by Published date
    a = a.attributes.published;
    b = b.attributes.published;

    // Return sort
    return a - b;

};

// Defining the sort by DESC method
desc = function(a, b) {

    if(!a || !b) return false;

    // Sort by Published date
    a = a.attributes.published;
    b = b.attributes.published;

    // Return sort
    return b - a;

};

module.exports = {
    asc: asc,
    desc: desc
};
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
// Defining parse vars
var parse;
var entry;

// fn: Parse Entry
// Description: Parses an YouTube video entry to generate attributes as an object
entry = function() {

    // Defining the viewCount
    var viewCount = 0;

    // Defining the average rating
    var averageRating = 100;

    // Defining the Date
    var date = 0;

    // Update the viewCount if it is available from stats
    var stats = this.yt$statistics;
    if(stats && stats.viewCount) {
        viewCount = stats.viewCount;
    }

    // Defining the average rating
    if(this.gd$rating && this.yt$rating && this.yt$rating.numLikes) {
        averageRating = parseInt(this.yt$rating.numLikes, 10) / this.gd$rating.numRaters * 100;
        averageRating = (averageRating).toFixed(2);
    }

    // Defining the date timestamp
    if(this.published.$t) {
        date = new Date( Date.parse( this.published.$t ) );
    }

    // Return the attributes as object
    return {
        id: this.media$group.yt$videoid.$t,
        link: this.link[0].href,
        published: date,
        rating: {
            average: averageRating,
            likes: parseInt(this.yt$rating.numLikes, 10),
            dislikes: parseInt(this.yt$rating.numDislikes, 10)
        },
        title: this.title.$t,
        thumbnail: this.media$group.media$thumbnail[1].url,
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