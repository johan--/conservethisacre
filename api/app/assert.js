const assert = require('assert');
const {log, FgRed, FgGreen} = require('./log');

const defineVars = [
  'CLEARDB_DATABASE_URL',
  'S3_BUCKET',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'S3_REGION',
  'STRIPE_PUBLIC_API_KEY',
  'STRIPE_SECRET_API_KEY'
];

const check = (prop) => {
  const value = process.env[prop];
  if(typeof value === 'undefined'){
    notDefined.push(prop);
  }
};

const notDefined = [];

defineVars.forEach(check);
console.log('CHECKING!!');
if (notDefined.length) {

  log(FgRed, 'CAN NOT START APPLICATION');
  log(FgRed, 'You must define following variables:\n');

  defineVars.forEach(v => log(FgGreen, v));

  log('\n\n');

  log('Not Defined: \n')
  notDefined.forEach(v => log(FgRed, v));

  process.exit(1);
}

process.exit(0);
