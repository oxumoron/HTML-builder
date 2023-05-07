const fs = require("fs");
const path = require("path");
const assets = path.join(__dirname, "assets");
const components = path.join(__dirname, "components");
const styles = path.join(__dirname, "styles");
const prod = path.join(__dirname, "project-dist");
const assetsCopy = path.join(prod, "assets");

fs.readdir(styles, { withFileTypes: true }, async (error, files) => {
  if (error) throw error;

  files.forEach((file, index) => {
    const filePath = path.join(styles, file.name);

    if (file.isFile() && file.name.split(".")[1] === "css") {
      fs.readFile(filePath, "utf8", (error, data) => {
        if (error) throw error;

        if (index === 0) {
          fs.writeFile(path.join(prod, "style.css"), data, (error) => {
            if (error) throw error;
          });
        } else {
          fs.appendFile(path.join(prod, "style.css"), data, (error) => {
            if (error) throw error;
          });
        }
      });
    }
  });
});

copyFunc = (dirIn, dirOut) => {
  fs.readdir(dirIn, { withFileTypes: true }, (error, files) => {
    if (error) throw error;

    files.forEach((file) => {
      if (!file.isFile()) {
        fs.stat(path.join(dirOut, file.name), (error) => {
          if (error) {
            fs.mkdir(path.join(dirOut, file.name), (error) => {
              if (error) throw error;
            });

            copyFunc(`${dirIn}\\${file.name}`, path.join(dirOut, file.name));
          } else {
            copyFunc(`${dirIn}\\${file.name}`, path.join(dirOut, file.name));
          }
        });
      } else {
        fs.copyFile(
          `${dirIn}\\${file.name}`,
          `${dirOut}\\${file.name}`,
          (error) => {
            if (error) throw error;
          }
        );
      }
    });
  });
};

fs.stat(prod, (error) => {
  if (error) {
    fs.mkdir(prod, (error) => {
      if (error) throw error;
    });
    createTemplate();
  } else {
    fs.readdir(prod, (error) => {
      if (error) throw error;
      createTemplate();
    });
  }
});

fs.stat(assetsCopy, (error) => {
  if (error) {
    fs.mkdir(assetsCopy, (error) => {
      if (error) throw error;
    });
    copyFunc(assets, assetsCopy);
  } else {
    copyFunc(assets, assetsCopy);
  }
});

createTemplate = () => {
  fs.copyFile(`${__dirname}\\template.html`, `${prod}\\index.html`, (error) => {
    if (error) throw error;

    fs.readFile(`${prod}\\index.html`, "utf8", (error, data) => {
      if (error) throw error;

      fs.readdir(components, { withFileTypes: true }, (error, files) => {
        if (error) throw error;

        files.forEach((file) => {
          fs.readFile(
            `${components}\\${file.name}`,
            "utf8",
            (error, dataFile) => {
              if (error) throw error;

              const tagName = `{{${file.name.split(".")[0]}}}`;

              data = data.replace(`${tagName}`, dataFile);

              fs.writeFile(`${prod}\\index.html`, data, (error) => {
                if (error) throw error;
              });
            }
          );
        });
      });
    });
  });
};
