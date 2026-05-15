const Jasmine = require('jasmine');
const jasmineRunner = new Jasmine();

jasmineRunner.loadConfig({
  spec_dir: 'spec',
  spec_files: ['**/*[sS]pec.ts'],
  random: false,
  seed: null,
  stopSpecOnExpectationFailure: false
});

console.log(`Using Jasmine version: ${jasmineRunner.jasmine.version}`)

jasmineRunner.execute();
