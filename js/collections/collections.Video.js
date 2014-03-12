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