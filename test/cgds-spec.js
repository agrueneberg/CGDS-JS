var expect, CGDS;

expect = require("expect.js");
CGDS = require("../lib/cgds.js");

describe("CDGS-JS", function () {

    describe("Constructor", function () {
        it("should throw an error if a URL parameter is not provided", function () {
            expect(function () {
                new CGDS();
            }).to.throwException(function (e) {
                expect(e).to.be.a(Error);
                expect(e.message).to.be("Please provide a URL parameter.");
            });
        });
        it("should return a CGDS object", function () {
            var cgds;
            cgds = new CGDS("http://www.cbioportal.org/public-portal/webservice.do");
            expect(cgds).to.be.a(CGDS);
        });
    });

    describe("getTypesOfCancer", function () {
        var cgds;
        beforeEach(function () {
            cgds = new CGDS("http://www.cbioportal.org/public-portal/webservice.do");
        });
        it("should throw an error if a callback parameter is not provided", function () {
            expect(function () {
                cgds.getTypesOfCancer();
            }).to.throwException(function (e) {
                expect(e).to.be.a(Error);
                expect(e.message).to.be("Please provide a callback parameter.");
            });
        });
        it("should return a JSON representation of a tab-delimited file with two columns", function (done) {
            cgds.getTypesOfCancer(function (err, res) {
                expect(res).to.be.a(Array);
                expect(res.length).to.be.greaterThan(0);
                expect(Object.keys(res[0])).to.eql(["type_of_cancer_id", "name"]);
                done();
            });
        });
    });

    describe("getCancerStudies", function () {
        var cgds;
        beforeEach(function () {
            cgds = new CGDS("http://www.cbioportal.org/public-portal/webservice.do");
        });
        it("should throw an error if a callback parameter is not provided", function () {
            expect(function () {
                cgds.getCancerStudies();
            }).to.throwException(function (e) {
                expect(e).to.be.a(Error);
                expect(e.message).to.be("Please provide a callback parameter.");
            });
        });
        it("should return a JSON representation of a tab-delimited file with three columns", function (done) {
            cgds.getCancerStudies(function (err, res) {
                expect(res).to.be.a(Array);
                expect(res.length).to.be.greaterThan(0);
                expect(Object.keys(res[0])).to.eql(["cancer_study_id", "name", "description"]);
                done();
            });
        });
    });

    describe("getGeneticProfiles", function () {
        var cgds;
        beforeEach(function () {
            cgds = new CGDS("http://www.cbioportal.org/public-portal/webservice.do");
        });
        it("should throw an error if a cancer_study_id parameter is not provided", function () {
            expect(function () {
                cgds.getGeneticProfiles();
            }).to.throwException(function (e) {
                expect(e).to.be.a(Error);
                expect(e.message).to.be("Please provide a cancer_study_id parameter.");
            });
        });
        it("should throw an error if a callback parameter is not provided", function () {
            expect(function () {
                cgds.getGeneticProfiles("brca_tcga");
            }).to.throwException(function (e) {
                expect(e).to.be.a(Error);
                expect(e.message).to.be("Please provide a callback parameter.");
            });
        });
        it("should return a JSON representation of a tab-delimited file with six columns", function (done) {
            cgds.getGeneticProfiles("brca_tcga", function (err, res) {
                expect(res).to.be.a(Array);
                expect(res.length).to.be.greaterThan(0);
                expect(Object.keys(res[0])).to.eql(["genetic_profile_id", "genetic_profile_name", "genetic_profile_description", "cancer_study_id", "genetic_alteration_type", "show_profile_in_analysis_tab"]);
                done();
            });
        });
    });

    describe("getCaseLists", function () {
        var cgds;
        beforeEach(function () {
            cgds = new CGDS("http://www.cbioportal.org/public-portal/webservice.do");
        });
        it("should throw an error if a cancer_study_id parameter is not provided", function () {
            expect(function () {
                cgds.getCaseLists();
            }).to.throwException(function (e) {
                expect(e).to.be.a(Error);
                expect(e.message).to.be("Please provide a cancer_study_id parameter.");
            });
        });
        it("should throw an error if a callback parameter is not provided", function () {
            expect(function () {
                cgds.getCaseLists("brca_tcga");
            }).to.throwException(function (e) {
                expect(e).to.be.a(Error);
                expect(e.message).to.be("Please provide a callback parameter.");
            });
        });
        it("should return a JSON representation of a tab-delimited file with five columns", function (done) {
            cgds.getCaseLists("brca_tcga", function (err, res) {
                expect(res).to.be.a(Array);
                expect(res.length).to.be.greaterThan(0);
                expect(Object.keys(res[0])).to.eql(["case_list_id", "case_list_name", "case_list_description", "cancer_study_id", "case_ids"]);
                done();
            });
        });
    });

});
