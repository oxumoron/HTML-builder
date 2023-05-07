const fs = require("fs");
const path = require("path");
const bundle = path.join(__dirname, "project-dist", "bundle.css");
const styles = path.join(__dirname, "styles");

fs.readdir(styles, "utf-8", (error, files) => {
  if (error) throw error;

  fs.writeFile(bundle, "", (error) => {
    if (error) throw error;
  });

  files.forEach((file) => {
    if (file.split(".")[1] === "css") {
      const stream = fs.createReadStream(path.join(styles, file));

      stream.on("data", (data) => {
        fs.appendFile(bundle, data, (error) => {
          if (error) throw error;
        });
      });
    }
  });
});
