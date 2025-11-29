const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(process.cwd(), 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.log('\n\x1b[33m%s\x1b[0m', '⚠ package.json not found.');
  console.log('\x1b[31m%s\x1b[0m', 'You are in the wrong directory.');
  console.log('Please navigate to the folder containing your React project (e.g., dsa-portal).');
  console.log('\nTry running:\n');
  console.log('  \x1b[36mcd dsa-portal\x1b[0m');
  console.log('\nThen try your npm command again.\n');
} else {
  console.log('\x1b[32m%s\x1b[0m', '✔ package.json found. You are in the correct directory.');
}
