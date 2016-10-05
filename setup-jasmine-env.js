
/*globals jasmine*/

jasmine.VERBOSE = true;

var jasmineReporters = require('jasmine-reporters');
var reporter = new jasmineReporters.JUnitXmlReporter("output/");
jasmine.getEnv().addReporter(reporter);
