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
        it("should return a CGDS object if a URL string is provided", function () {
            var cgds;
            cgds = new CGDS("http://www.cbioportal.org/public-portal/webservice.do");
            expect(cgds).to.be.a(CGDS);
        });
        it("should return a CGDS object if a URL object is provided", function () {
            var cgds;
            cgds = new CGDS({
                url: "http://www.cbioportal.org/public-portal/webservice.do"
            });
            expect(cgds).to.be.a(CGDS);
        });
    });

    describe("cBioPortal", function () {

        var cgds;

        beforeEach(function () {
            cgds = new CGDS("http://www.cbioportal.org/public-portal/webservice.do");
        });

        describe("getTypesOfCancer", function () {
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
                    expect(res).to.be.an(Array);
                    expect(res.length).to.be.greaterThan(0);
                    expect(Object.keys(res[0])).to.eql(["type_of_cancer_id", "name"]);
                    done();
                });
            });
        });

        describe("getCancerStudies", function () {
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
                    expect(res).to.be.an(Array);
                    expect(res.length).to.be.greaterThan(0);
                    expect(Object.keys(res[0])).to.eql(["cancer_study_id", "name", "description"]);
                    done();
                });
            });
        });

        describe("getGeneticProfiles", function () {
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
                    expect(res).to.be.an(Array);
                    expect(res.length).to.be.greaterThan(0);
                    expect(Object.keys(res[0])).to.eql(["genetic_profile_id", "genetic_profile_name", "genetic_profile_description", "cancer_study_id", "genetic_alteration_type", "show_profile_in_analysis_tab"]);
                    done();
                });
            });
        });

        describe("getCaseLists", function () {
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
                    expect(res).to.be.an(Array);
                    expect(res.length).to.be.greaterThan(0);
                    expect(Object.keys(res[0])).to.eql(["case_list_id", "case_list_name", "case_list_description", "cancer_study_id", "case_ids"]);
                    done();
                });
            });
        });

        describe("getProfileData", function () {
            it("should throw an error if a case_set_id parameter is not provided", function () {
                expect(function () {
                    cgds.getProfileData();
                }).to.throwException(function (e) {
                    expect(e).to.be.a(Error);
                    expect(e.message).to.be("Please provide a case_set_id parameter.");
                });
            });
            it("should throw an error if a genetic_profile_id parameter is not provided", function () {
                expect(function () {
                    cgds.getProfileData("brca_tcga_3way_complete");
                }).to.throwException(function (e) {
                    expect(e).to.be.a(Error);
                    expect(e.message).to.be("Please provide a genetic_profile_id parameter.");
                });
            });
            it("should throw an error if a gene_list parameter is not provided", function () {
                expect(function () {
                    cgds.getProfileData("brca_tcga_3way_complete", "brca_tcga_mutations");
                }).to.throwException(function (e) {
                    expect(e).to.be.a(Error);
                    expect(e.message).to.be("Please provide a gene_list parameter.");
                });
            });
            it("should throw an error if a callback parameter is not provided", function () {
                expect(function () {
                    cgds.getProfileData("brca_tcga_3way_complete", "brca_tcga_mutations", "TP53");
                }).to.throwException(function (e) {
                    expect(e).to.be.a(Error);
                    expect(e.message).to.be("Please provide a callback parameter.");
                });
            });
            it("should return a JSON representation of a tab-delimited file with two + N columns when requesting a single gene and a single genetic profile", function (done) {
                cgds.getCaseLists("brca_tcga", function (err, res) {
                    var numPatients;
                    expect(res[0].case_list_id).to.be("brca_tcga_3way_complete");
                    numPatients = res[0].case_ids.trim().split(" ").length;
                    cgds.getProfileData("brca_tcga_3way_complete", "brca_tcga_mutations", "TP53", function (err, res) {
                        expect(res).to.be.an(Array);
                        expect(res.length).to.be.greaterThan(0);
                        expect(Object.keys(res[0])).to.contain("GENE_ID");
                        expect(Object.keys(res[0])).to.contain("COMMON");
                        expect(Object.keys(res[0]).length).to.be(2 + numPatients);
                        done();
                    });
                });
            });
            it("should return a JSON representation of a tab-delimited file with two + N columns when requesting more than one gene and a single genetic profile", function (done) {
                cgds.getCaseLists("brca_tcga", function (err, res) {
                    var numPatients;
                    expect(res[0].case_list_id).to.be("brca_tcga_3way_complete");
                    numPatients = res[0].case_ids.trim().split(" ").length;
                    cgds.getProfileData("brca_tcga_3way_complete", "brca_tcga_mutations", ["TP53", "GATA3"], function (err, res) {
                        expect(res).to.be.an(Array);
                        expect(res.length).to.be.greaterThan(0);
                        expect(Object.keys(res[0])).to.contain("GENE_ID");
                        expect(Object.keys(res[0])).to.contain("COMMON");
                        expect(Object.keys(res[0]).length).to.be(2 + numPatients);
                        done();
                    });
                });
            });
            it("should return a JSON representation of a tab-delimited file with four + N columns when requesting a single gene and more than one genetic profile", function (done) {
                cgds.getCaseLists("brca_tcga", function (err, res) {
                    var numPatients;
                    expect(res[0].case_list_id).to.be("brca_tcga_3way_complete");
                    numPatients = res[0].case_ids.trim().split(" ").length;
                    cgds.getProfileData("brca_tcga_3way_complete", ["brca_tcga_mutations", "brca_tcga_log2CNA"], "TP53", function (err, res) {
                        expect(res).to.be.an(Array);
                        expect(res.length).to.be.greaterThan(0);
                        expect(Object.keys(res[0])).to.contain("GENETIC_PROFILE_ID");
                        expect(Object.keys(res[0])).to.contain("ALTERATION_TYPE");
                        expect(Object.keys(res[0])).to.contain("GENE_ID");
                        expect(Object.keys(res[0])).to.contain("COMMON");
                        expect(Object.keys(res[0]).length).to.be(4 + numPatients);
                        done();
                    });
                });
            });
            it("should fail if multiple genes and multiple genetic profiles are used at the same time", function () {
                expect(function () {
                    cgds.getProfileData("brca_tcga_3way_complete", ["brca_tcga_mutations", "brca_tcga_log2CNA"], ["TP53", "GATA3"], function () {});
                }).to.throwException(function (e) {
                    expect(e).to.be.a(Error);
                    expect(e.message).to.be("You can specify multiple genes or multiple genetic profiles, but not both at once!");
                });
            });

        });

        describe("getMutationData", function () {
            it("should throw an error if a genetic_profile_id parameter is not provided", function () {
                expect(function () {
                    cgds.getMutationData();
                }).to.throwException(function (e) {
                    expect(e).to.be.a(Error);
                    expect(e.message).to.be("Please provide a genetic_profile_id parameter.");
                });
            });
            it("should throw an error if a gene_list parameter is not provided", function () {
                expect(function () {
                    cgds.getMutationData("brca_tcga_mutations");
                }).to.throwException(function (e) {
                    expect(e).to.be.a(Error);
                    expect(e.message).to.be("Please provide a gene_list parameter.");
                });
            });
            it("should throw an error if a callback parameter is not provided", function () {
                expect(function () {
                    cgds.getMutationData("brca_tcga_mutations", "TP53");
                }).to.throwException(function (e) {
                    expect(e).to.be.a(Error);
                    expect(e.message).to.be("Please provide a callback parameter.");
                });
            });
            it("should return a JSON representation of a tab-delimited file with 18 columns when requesting a single gene and a single genetic profile", function (done) {
                cgds.getMutationData("brca_tcga_mutations", "TP53", function (err, res) {
                    expect(res).to.be.an(Array);
                    expect(res.length).to.be.greaterThan(0);
                    expect(Object.keys(res[0])).to.eql(["entrez_gene_id", "gene_symbol", "case_id", "sequencing_center", "mutation_status", "mutation_type", "validation_status", "amino_acid_change", "functional_impact_score", "xvar_link", "xvar_link_pdb", "xvar_link_msa", "chr", "start_position", "end_position", "reference_allele", "variant_allele", "genetic_profile_id"]);
                    done();
                });
            });
            it("should return a JSON representation of a tab-delimited file with 18 columns when requesting more than one gene and a single genetic profile", function (done) {
                cgds.getMutationData("brca_tcga_mutations", ["TP53", "GATA3"], function (err, res) {
                    expect(res).to.be.an(Array);
                    expect(res.length).to.be.greaterThan(0);
                    expect(Object.keys(res[0])).to.eql(["entrez_gene_id", "gene_symbol", "case_id", "sequencing_center", "mutation_status", "mutation_type", "validation_status", "amino_acid_change", "functional_impact_score", "xvar_link", "xvar_link_pdb", "xvar_link_msa", "chr", "start_position", "end_position", "reference_allele", "variant_allele", "genetic_profile_id"]);
                    done();
                });
            });
            it("should return a JSON representation of a tab-delimited file with 18 columns when requesting a single gene and more than one genetic profile", function (done) {
                cgds.getMutationData(["brca_tcga_mutations", "brca_tcga_log2CNA"], "TP53", function (err, res) {
                    expect(res).to.be.an(Array);
                    expect(res.length).to.be.greaterThan(0);
                    expect(Object.keys(res[0])).to.eql(["entrez_gene_id", "gene_symbol", "case_id", "sequencing_center", "mutation_status", "mutation_type", "validation_status", "amino_acid_change", "functional_impact_score", "xvar_link", "xvar_link_pdb", "xvar_link_msa", "chr", "start_position", "end_position", "reference_allele", "variant_allele", "genetic_profile_id"]);
                    done();
                });
            });
            it("should return a JSON representation of a tab-delimited file with 18 columns when requesting more than one gene and more than one genetic profile", function (done) {
                cgds.getMutationData(["brca_tcga_mutations", "brca_tcga_log2CNA"], ["TP53", "GATA3"], function (err, res) {
                    expect(res).to.be.an(Array);
                    expect(res.length).to.be.greaterThan(0);
                    expect(Object.keys(res[0])).to.eql(["entrez_gene_id", "gene_symbol", "case_id", "sequencing_center", "mutation_status", "mutation_type", "validation_status", "amino_acid_change", "functional_impact_score", "xvar_link", "xvar_link_pdb", "xvar_link_msa", "chr", "start_position", "end_position", "reference_allele", "variant_allele", "genetic_profile_id"]);
                    done();
                });
            });
            it("should return a JSON representation of a tab-delimited file with 18 columns when requesting a single gene, a single genetic profile, and a case list", function (done) {
                cgds.getMutationData("brca_tcga_mutations", "TP53", "brca_tcga_3way_complete", function (err, res) {
                    expect(res).to.be.an(Array);
                    expect(res.length).to.be.greaterThan(0);
                    expect(Object.keys(res[0])).to.eql(["entrez_gene_id", "gene_symbol", "case_id", "sequencing_center", "mutation_status", "mutation_type", "validation_status", "amino_acid_change", "functional_impact_score", "xvar_link", "xvar_link_pdb", "xvar_link_msa", "chr", "start_position", "end_position", "reference_allele", "variant_allele", "genetic_profile_id"]);
                    done();
                });
            });
        });

        describe("getClinicalData", function () {
            it("should throw an error if a case_set_id parameter is not provided", function () {
                expect(function () {
                    cgds.getClinicalData();
                }).to.throwException(function (e) {
                    expect(e).to.be.a(Error);
                    expect(e.message).to.be("Please provide a case_set_id parameter.");
                });
            });
            it("should throw an error if a callback parameter is not provided", function () {
                expect(function () {
                    cgds.getClinicalData("brca_tcga");
                }).to.throwException(function (e) {
                    expect(e).to.be.a(Error);
                    expect(e.message).to.be("Please provide a callback parameter.");
                });
            });
            it("should return a JSON representation of a tab-delimited file with six columns", function (done) {
                cgds.getClinicalData("brca_tcga_3way_complete", function (err, res) {
                    expect(res).to.be.an(Array);
                    expect(res.length).to.be.greaterThan(0);
                    expect(Object.keys(res[0])).to.eql(["case_id", "overall_survival_months", "overall_survival_status", "disease_free_survival_months", "disease_free_survival_status", "age_at_diagnosis"]);
                    done();
                });
            });
        });

    });

});
