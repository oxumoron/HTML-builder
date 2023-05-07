const fs = require("fs");
const path = require("path");
const pathToFolder = path.join(__dirname, "files");
const pathToCopyFolder = path.join(pathToFolder, "files-copy");

fs.mkdir(pathToCopyFolder, { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("Directory created successfully!");
});

const infoFiles = (file) => {
  if (file.isFile()) {
    const pathItem = path.join(pathToFolder, file.name);
    const pathToCopyItem = path.join(pathToCopyFolder, file.name);

    fs.copyFile(pathItem, pathToCopyItem, (err) => {
      if (err) throw err;
      console.log(`${file.name} was copied`);
    });
  }
};

fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
  if (err) {
    return console.log(err);
  }

  files.forEach((item) => {
    infoFiles(item);
  });
});
