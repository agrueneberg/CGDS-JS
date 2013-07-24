CGDS-JS
=======

A Node.js module for querying the Cancer Genomics Data Server (CGDS), hosted by the Computational Biology Center at Memorial-Sloan-Kettering Cancer Center (MSKCC). Read more about this service at the [cBio Cancer Genomics Portal](http://www.cbioportal.org/public-portal/).

Usage
-----

1. Install it:

        npm install cgds

2. Require it:

        var CGDS = require("cgds");

3. Instantiate a CGDS client:

        var cgds = new CGDS("http://www.cbioportal.org/public-portal/webservice.do");

4. See API for a list of methods.

API
---

See [Web API](http://www.cbioportal.org/public-portal/web_api.jsp) for more details.

### `getTypesOfCancer(callback)`
Retrieves a list of all the clinical types of cancer.

### `getCancerStudies(callback)`
Retrieves meta-data regarding cancer studies.

### `getGeneticProfiles(cancer_study_id, callback)`
Retrieves meta-data regarding all genetic profiles, e.g. mutation or copy number profiles, stored about a specific cancer study.

### `getCaseLists(cancer_study_id, callback)`
Retrieves meta-data regarding all case lists stored about a specific cancer study.

### `getProfileData(case_set_id, genetic_profile_id, gene_list, callback)`
Retrieves genomic profile data for one or more genes.

### `getMutationData(genetic_profile_id, case_set_id, gene_list, callback)`
Retrieves the full set of annotated extended mutation data.

### `getClinicalData(case_set_id, callback)`
Retrieves overall survival, disease free survival and age at diagnosis for specified cases.
