const fs = require("fs");
const path = require("path");
const pathToFolder = path.join(__dirname, "secret-folder");

const infoFiles = (file) => {
  let data = [];
  if (file.isFile()) {
    fs.stat(
      path.resolve(__dirname, "secret-folder", file.name),
      (err, stats) => {
        if (err) {
          return console.log(err);
        }

        data.push(file.name.split(".").slice(0, -1).join("."));
        data.push(path.extname(file.name).slice(1));
        data.push(Math.round(stats.size / 1024) + "Kb");
        console.log(data.join(" - "));
      }
    );
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
