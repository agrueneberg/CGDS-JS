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

});
