"use strict";

var http, url, get, toJSON, CGDS;

http = require("http");
url = require("url");

get = function (uri, callback) {
    var options;
    options = url.parse(uri);
    http.get(options, function (res) {
        var body;
        body = new Buffer(0);
        res.on("data", function (chunk) {
            var buffer;
            buffer = new Buffer(body.length + chunk.length);
            body.copy(buffer);
            chunk.copy(buffer, body.length);
            body = buffer;
        });
        res.on("end", function () {
            callback(null, body.toString("utf8"));
        });
    });
};

toJSON = function (data) {
    var lines, columns;
 // Split lines.
    lines = data.split(/\r?\n/);
 // Drop the first line.
    lines.shift();
 // Convert to JSON.
    columns = lines.shift().split(/\t/);
    lines = lines.map(function (line) {
        var obj;
        obj = {};
        line.split(/\t/).forEach(function (column, idx) {
            obj[columns[idx]] = column;
        });
        return obj;
    });
    return lines;
};

CGDS = function (url) {
    if (url === undefined) {
        throw new Error("Please provide a URL parameter.");
    }
    this.url = url;
};

CGDS.prototype.getCancerStudies = function (callback) {
    if (callback === undefined) {
        throw new Error("Please provide a callback parameter.");
    }
    get(this.url + "?cmd=getCancerStudies", function (err, res) {
        callback(null, toJSON(res));
    });
};

module.exports = CGDS;
