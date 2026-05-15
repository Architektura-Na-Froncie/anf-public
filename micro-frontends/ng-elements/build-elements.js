const fs = require('fs-extra');
const concat = require('concat');

const projectName = 'ng-elements';

(async function build() {
  const files = ['runtime', 'polyfills', 'main']
    .map(f => `./dist/${projectName}/${f}.js`);

  await fs.ensureDir('demo');
  await concat(files, `demo/${projectName}.js`);
})();
