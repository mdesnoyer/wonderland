
/*globals jasmine*/

jasmine.VERBOSE = true;

var jasmineReporters = require('jasmine-reporters');
var reporter = new jasmineReporters.JUnitXmlReporter({
    consolidateAll: false,
    filePrefix: "test-results-",
    savePath: "test_output",
});
jasmine.getEnv().addReporter(reporter);
