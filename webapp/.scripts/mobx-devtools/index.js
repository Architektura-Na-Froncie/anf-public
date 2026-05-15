const { execSync } = require('child_process');
const fs = require('fs');

// mobx-devtools depends on electron@10.1.3, which does not support Apple M1,
// see: https://github.com/mobxjs/mobx-devtools/issues/111
// mobx-devtools does not work correctly on newer versions of electron,
// see: https://github.com/mobxjs/mobx-devtools/issues/106

if (process.arch === 'arm64') {
  console.log('Standalone mobx-devtools does not support Apple M1.');
  console.log('Switch to Rosetta emulation mode.\n');
  process.exit(1);
}

if (!fs.existsSync(__dirname + '/node_modules/mobx-devtools')) {
  execSync('npm install', { stdio: 'inherit', cwd: __dirname });
}

execSync('npx mobx-devtools ' + process.argv.slice(2).join(' '), { stdio: 'inherit', cwd: __dirname });
