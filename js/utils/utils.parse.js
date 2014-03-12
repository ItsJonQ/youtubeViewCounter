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