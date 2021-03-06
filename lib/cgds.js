"use strict";

var http, https, url, get, toJSON, CGDS;

http = require("http");
https = require("https");
url = require("url");

get = function (uri, proxy, callback) {
    var options, responseHandler, req;
    if (typeof proxy === "function") {
        callback = proxy;
        proxy = undefined;
    }
    if (proxy !== undefined) {
        options = url.parse(proxy + encodeURIComponent(uri));
    } else {
        options = url.parse(uri);
    }
    responseHandler = function (res) {
        var body;
     // Browserify does not seem to work well with buffers ("no method copy"),
     // therefore fall back to strings.
        body = "";
        res.on("data", function (chunk) {
            body += chunk;
        });
        res.on("end", function () {
            callback(null, body);
        });
    };
    // Don't use http.get until https://github.com/substack/https-browserify/pull/1
    // is fixed.
    options.method = "GET";
    // Setting withCredentials to false is required until
    // https://github.com/substack/http-browserify/pull/47 is fixed.
    options.withCredentials = false;
    if (options.protocol === "https:") {
        options.port = 443;
        req = https.request(options, responseHandler);
    } else {
        options.port = 80;
        req = http.request(options, responseHandler);
    }
    req.end();
};

toJSON = function (data, callback) {
    var lines, errorTerms, errorOccured, columns;
 // Split lines.
    lines = data.split(/\r?\n/);
 // Drop comments and empty lines.
    lines = lines.filter(function (line) {
        if (line.charAt(0) === "#" || line === "") {
            return false;
        } else {
            return true;
        }
    });
 // If the first line starts with "Error: " or in some buggy cases with the whole
 // error string after dropping the comments, then it is likely to be an error.
    errorTerms = ["Error: ", "No genetic profile available for genetic_profile_id: "];
    errorOccured = errorTerms.some(function (errorTerm) {
        if (lines[0].lastIndexOf(errorTerm, 0) === 0) {
            return true;
        } else {
            return false;
        }
    });
    if (errorOccured === true) {
        callback({
            message: lines[0]
        }, null);
    } else {
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
        callback(null, lines);
    }
};

CGDS = function (url) {
    var defaultUrl;
    defaultUrl = "http://www.cbioportal.org/public-portal/webservice.do";
    if (url !== undefined) {
        if (typeof url === "string") {
            this.url = url;
        } else if (url !== null && typeof url === "object") {
            if (url.hasOwnProperty("url") === true) {
                this.url = url.url;
            } else {
                this.url = defaultUrl;
            }
            if (url.hasOwnProperty("proxy") === true) {
                this.proxy = url.proxy;
            }
        } else {
            throw new Error("Please provide a URL parameter.");
        }
    } else {
        this.url = defaultUrl;
    }
};

CGDS.prototype.getTypesOfCancer = function (callback) {
    if (callback === undefined) {
        throw new Error("Please provide a callback parameter.");
    }
    get(this.url + "?cmd=getTypesOfCancer", this.proxy, function (err, res) {
        toJSON(res, callback);
    });
};

CGDS.prototype.getCancerStudies = function (callback) {
    if (callback === undefined) {
        throw new Error("Please provide a callback parameter.");
    }
    get(this.url + "?cmd=getCancerStudies", this.proxy, function (err, res) {
        toJSON(res, callback);
    });
};

CGDS.prototype.getGeneticProfiles = function (cancerStudyId, callback) {
    if (cancerStudyId === undefined) {
        throw new Error("Please provide a cancer_study_id parameter.");
    }
    if (callback === undefined) {
        throw new Error("Please provide a callback parameter.");
    }
    get(this.url + "?cmd=getGeneticProfiles&cancer_study_id=" + cancerStudyId, this.proxy, function (err, res) {
        toJSON(res, callback);
    });
};

CGDS.prototype.getCaseLists = function (cancerStudyId, callback) {
    if (cancerStudyId === undefined) {
        throw new Error("Please provide a cancer_study_id parameter.");
    }
    if (callback === undefined) {
        throw new Error("Please provide a callback parameter.");
    }
    get(this.url + "?cmd=getCaseLists&cancer_study_id=" + cancerStudyId, this.proxy, function (err, res) {
        toJSON(res, callback);
    });
};

CGDS.prototype.getProfileData = function (caseSetId, geneticProfileId, geneList, callback) {
    if (caseSetId === undefined) {
        throw new Error("Please provide a case_set_id parameter.");
    }
    if (geneticProfileId === undefined) {
        throw new Error("Please provide a genetic_profile_id parameter.");
    }
    if (geneList === undefined) {
        throw new Error("Please provide a gene_list parameter.");
    }
    if (callback === undefined) {
        throw new Error("Please provide a callback parameter.");
    }
    if (Array.isArray(geneticProfileId) && Array.isArray(geneList)) {
        throw new Error("You can specify multiple genes or multiple genetic profiles, but not both at once!");
    }
 // Convert geneticProfileId to string.
    if (Array.isArray(geneticProfileId) === true) {
        geneticProfileId = geneticProfileId.join("+");
    }
 // Convert geneList to string.
    if (Array.isArray(geneList) === true) {
        geneList = geneList.join("+");
    }
    get(this.url + "?cmd=getProfileData&case_set_id=" + caseSetId + "&genetic_profile_id=" + geneticProfileId + "&gene_list=" + geneList, this.proxy, function (err, res) {
        toJSON(res, callback);
    });
};

CGDS.prototype.getMutationData = function (geneticProfileId, geneList, caseSetId, callback) {
    var url;
    if (geneticProfileId === undefined) {
        throw new Error("Please provide a genetic_profile_id parameter.");
    }
    if (geneList === undefined) {
        throw new Error("Please provide a gene_list parameter.");
    }
    if (typeof caseSetId === "function") {
        callback = caseSetId;
        caseSetId = undefined;
    }
    if (callback === undefined) {
        throw new Error("Please provide a callback parameter.");
    }
 // Convert geneticProfileId to string.
    if (Array.isArray(geneticProfileId) === true) {
        geneticProfileId = geneticProfileId.join("+");
    }
 // Convert geneList to string.
    if (Array.isArray(geneList) === true) {
        geneList = geneList.join("+");
    }
    url = this.url + "?cmd=getMutationData&genetic_profile_id=" + geneticProfileId + "&gene_list=" + geneList;
    if (caseSetId !== undefined) {
        url = url + "&case_set_id=" + caseSetId;
    }
    get(url, this.proxy, function (err, res) {
        toJSON(res, callback);
    });
};

CGDS.prototype.getClinicalData = function (caseSetId, callback) {
    if (caseSetId === undefined) {
        throw new Error("Please provide a case_set_id parameter.");
    }
    if (callback === undefined) {
        throw new Error("Please provide a callback parameter.");
    }
    get(this.url + "?cmd=getClinicalData&case_set_id=" + caseSetId, this.proxy, function (err, res) {
        toJSON(res, callback);
    });
};

module.exports = CGDS;
