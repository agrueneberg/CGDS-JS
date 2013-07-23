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

});
