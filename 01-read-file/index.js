const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'text.txt');

const stream = fs.ReadStream(
  pathToFile,
  'utf8'
);
// let data = '';
// stream.on('data', partData => data += partData);
// stream.on('end', () => process.stdout.write(data));

stream.on('data', (data) => console.log(data));
stream.on('error', (err) => console.log(`Err: ${err}`));