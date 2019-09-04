import fs from 'fs';
import tools from 'simple-svg-tools';
import { svgo } from './svgo.config.js';
import SVGO from 'svgo';
import { IMPORT_DIRECTORY, EXPORT_DIRECTORY } from './constants';

export const getSvgoObject = () => {
    return new SVGO(svgo);
}

export const getAllFileNames = (folderDirectory) => {
    return fs.readdirSync(folderDirectory);
}

export const getFileData = (fileDirectory) => {
    return fs.readFileSync(fileDirectory);
}

export const exportSvg = (svgo, data, fileName) => {
    svgo.optimize(data)
    .then(result => {
        let exportDirectory = EXPORT_DIRECTORY + fileName;

        tools.ExportSVG(result.data, exportDirectory)
        .then(() => console.log('Exported: '+fileName))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

export const buildReport = directory => {
    console.log('\ndirectory: '+directory);
    const fileNames = getAllFileNames(directory);
    fileNames.forEach(fileName=> {
        const filePath = directory + fileName;
        const stat = fs.statSync(filePath)
        console.log(fileName + '' + stat.size)
    })
}

export const comparisonReport = (origonalDirectory, optimizedDirectory) => {
    console.log(origonalDirectory + " -> " + optimizedDirectory);
    const fileNames = getAllFileNames(origonalDirectory);
    fileNames.forEach(fileName => {
        const origionalFilePath = origonalDirectory + fileName;
        const optimizedFilePath = optimizedDirectory + fileName;
        const origionalSize = fs.statSync(origionalFilePath).size;
        const optimizedSize = fs.statSync(optimizedFilePath).size;
        console.log(fileName + ' : ' + origionalSize + ' -> ' + optimizedSize);
    })
}
