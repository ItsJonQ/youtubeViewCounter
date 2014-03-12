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