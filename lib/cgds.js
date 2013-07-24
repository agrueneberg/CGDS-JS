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
 // Drop comments.
    lines = lines.filter(function (line) {
        if (line.charAt(0) === "#") {
            return false;
        } else {
            return true;
        }
    });
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
    if (typeof url === "string") {
        this.url = url;
    } else if (url !== null && typeof url === "object" && url.hasOwnProperty("url") === true) {
        this.url = url.url;
    } else {
        throw new Error("Please provide a URL parameter.");
    }
};

CGDS.prototype.getTypesOfCancer = function (callback) {
    if (callback === undefined) {
        throw new Error("Please provide a callback parameter.");
    }
    get(this.url + "?cmd=getTypesOfCancer", function (err, res) {
        callback(null, toJSON(res));
    });
};

CGDS.prototype.getCancerStudies = function (callback) {
    if (callback === undefined) {
        throw new Error("Please provide a callback parameter.");
    }
    get(this.url + "?cmd=getCancerStudies", function (err, res) {
        callback(null, toJSON(res));
    });
};

CGDS.prototype.getGeneticProfiles = function (cancerStudyId, callback) {
    if (cancerStudyId === undefined) {
        throw new Error("Please provide a cancer_study_id parameter.");
    }
    if (callback === undefined) {
        throw new Error("Please provide a callback parameter.");
    }
    get(this.url + "?cmd=getGeneticProfiles&cancer_study_id=" + cancerStudyId, function (err, res) {
        callback(null, toJSON(res));
    });
};

CGDS.prototype.getCaseLists = function (cancerStudyId, callback) {
    if (cancerStudyId === undefined) {
        throw new Error("Please provide a cancer_study_id parameter.");
    }
    if (callback === undefined) {
        throw new Error("Please provide a callback parameter.");
    }
    get(this.url + "?cmd=getCaseLists&cancer_study_id=" + cancerStudyId, function (err, res) {
        callback(null, toJSON(res));
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
    get(this.url + "?cmd=getProfileData&case_set_id=" + caseSetId + "&genetic_profile_id=" + geneticProfileId + "&gene_list=" + geneList, function (err, res) {
        callback(null, toJSON(res));
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
    get(url, function (err, res) {
        callback(null, toJSON(res));
    });
};

CGDS.prototype.getClinicalData = function (caseSetId, callback) {
    if (caseSetId === undefined) {
        throw new Error("Please provide a case_set_id parameter.");
    }
    if (callback === undefined) {
        throw new Error("Please provide a callback parameter.");
    }
    get(this.url + "?cmd=getClinicalData&case_set_id=" + caseSetId, function (err, res) {
        callback(null, toJSON(res));
    });
};

module.exports = CGDS;
