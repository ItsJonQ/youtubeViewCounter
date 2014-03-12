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
    this.models.push(model);
    return this;
};

// Exporting the collection
module.exports = Videos;