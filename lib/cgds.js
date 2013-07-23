"use strict";

var CGDS;

CGDS = function (url) {
    if (url === undefined) {
        throw new Error("Please provide a URL parameter.");
    }
    this.url = url;
};

module.exports = CGDS;
