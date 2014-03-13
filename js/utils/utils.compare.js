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