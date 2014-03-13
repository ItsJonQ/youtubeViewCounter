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