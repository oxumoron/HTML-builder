const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'text.txt');
const {stdout, stdin, exit}= require('process');
const writeStream = fs.createWriteStream(
  pathToFile,
  'utf8'
);

stdout.write('How do you do?');

stdin.on('data',(data)=>{
  if(data.toString().trim() === 'exit'){
    stdout.write('Bye!');
    exit();
  }

  writeStream.write(data);
})
