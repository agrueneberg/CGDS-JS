CGDS-JS
=======

A Node.js and browser module for querying the Cancer Genomics Data Server (CGDS), hosted by the Computational Biology Center at Memorial-Sloan-Kettering Cancer Center (MSKCC). Read more about this service at the [cBio Cancer Genomics Portal](http://www.cbioportal.org/public-portal/).

Example
-------

    var CGDS, cgds;
    CGDS = require("cgds");
    cgds = new CGDS("http://www.cbioportal.org/public-portal/webservice.do");
    cgds.getMutationData("brca_tcga_mutations", ["TP53", "GATA3"], "brca_tcga_all", function (err, res) {
        console.log(res);
    });

Usage
-----

### Node.js

1. Install it:

        npm install cgds

2. Require it:

        var CGDS = require("cgds");

3. Instantiate a CGDS client:

        var cgds = new CGDS("http://www.cbioportal.org/public-portal/webservice.do");

4. See below for a list of methods.

### Browser

1. Include it:

        <script src="http://agrueneberg.github.io/CGDS-JS/cgds.min.js"></script>

2. Require it:

        var CGDS = require("cgds");

3. Instantiate a CGDS client (you will need a CORS proxy such as [Proxer](https://github.com/agrueneberg/Proxer) for this):

        var cgds = new CGDS({
            url: "http://www.cbioportal.org/public-portal/webservice.do",
            proxy: "http://example.com/corsproxy?url="
        });

4. See below for a list of methods.

Methods
-------

See [Web API](http://www.cbioportal.org/public-portal/web_api.jsp) for more details.

### getTypesOfCancer
Retrieves a list of all the clinical types of cancer.

###### Parameters
1. `callback`

### getCancerStudies
Retrieves meta-data regarding cancer studies.

###### Parameters
1. `callback`

### getGeneticProfiles
Retrieves meta-data regarding all genetic profiles, e.g. mutation or copy number profiles, stored about a specific cancer study.

###### Parameters
1. `cancer_study_id`
2. `callback`

### getCaseLists
Retrieves meta-data regarding all case lists stored about a specific cancer study.

###### Parameters
1. `cancer_study_id`
2. `callback`

### getProfileData
Retrieves genomic profile data for one or more genes.

###### Parameters
1. `case_set_id`
2. `genetic_profile_id`
3. `gene_list`
4. `callback`

### getMutationData
Retrieves the full set of annotated extended mutation data.

###### Parameters
1. `genetic_profile_id`
2. `gene_list`
3. `case_set_id` (optional)
4. `callback`

### getClinicalData
Retrieves overall survival, disease free survival and age at diagnosis for specified cases.

###### Parameters
1. `case_set_id`
2. `callback`
