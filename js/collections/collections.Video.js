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

            this.add(Video);

        }

        // Sorting the models by DESC order (based on Date)
        this.models().sort(function(a, b) {
            return compare.desc(a, b);
        });

        // Setting the attributes for the collection
        this.setAttributes(feed);

        ko.applyBindings(this);

        return this;

    };

    // Setting the attributes for the collection
    this.setAttributes = function(data) {

        // Creating the attributes object
        var attributes = {
            link: data.link[0].href,
            title: data.title.$t,
            videos: this.models().length,
            viewCount: this.viewCount
        };

        // Setting the attributes to the collection, and making it observable (KO)
        this.attributes = ko.observable(attributes);

        // Returning the collection
        return this;
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