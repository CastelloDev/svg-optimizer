import fs from "fs";
import tools from "simple-svg-tools";
import { svgo } from "./svgo.config.js";
import SVGO from "svgo";
import { IMPORT_DIRECTORY, EXPORT_DIRECTORY, CODE_ELEMENT } from "./constants";

export const getSvgoObject = () => {
  return new SVGO(svgo);
};

export const getAllFileNames = folderDirectory => {
  return fs.readdirSync(folderDirectory);
};

export const getFileData = fileDirectory => {
  return fs.readFileSync(fileDirectory);
};

export const exportSvg = (svgo, data, fileName) => {
  svgo
    .optimize(data)
    .then(result => {
      let exportDirectory = EXPORT_DIRECTORY + fileName;

      tools
        .ExportSVG(result.data, exportDirectory)
        .then(() => console.log(`Exported: ${fileName}`))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

export const buildReport = directory => {
  console.log(`\ndirectory: ${directory}`);
  const fileNames = getAllFileNames(directory);
  fileNames.forEach(fileName => {
    const filePath = directory + fileName;
    const stat = fs.statSync(filePath);
    console.log(`${fileName}  ${stat.size}`);
  });
};

export const comparisonReport = (originalDirectory, optimizedDirectory) => {
  console.log(`${originalDirectory} ->  ${optimizedDirectory}`);
  const fileNames = getAllFileNames(originalDirectory);
  fileNames.forEach(fileName => {
    const originalFilePath = originalDirectory + fileName;
    const optimizedFilePath = optimizedDirectory + fileName;
    const originalSize = fs.statSync(origionalFilePath).size;
    const optimizedSize = fs.statSync(optimizedFilePath).size;
    console.log(`${fileName} :  ${origionalSize} -> ${optimizedSize}`);
  });
};

export const writeSvgCodeIntoSvgFiles = directory => {
  const fileNames = getAllFileNames(directory);
  fileNames.forEach(fileName => {
    var filePath = directory + fileName;
    var oldData = getFileData(filePath).toString();
    if (oldData.search(CODE_ELEMENT) < 0) {
      var PositionToInsert = oldData.indexOf(">")+1;
      var newData = [
        oldData.slice(0, PositionToInsert),
        CODE_ELEMENT,
        oldData.slice(PositionToInsert, oldData.length)
      ].join("");

      fs.writeFile(filePath, "\n" + newData + "\n", err => {
        if (!err) {
          console.log("Successfully Written to File.");
        }else{
          console.log(err);
        }
      });
    }
  });
};

