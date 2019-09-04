import { getAllFileNames, getSvgoObject, getFileData, exportSvg } from './src/functions';
import { IMPORT_DIRECTORY, EXPORT_DIRECTORY } from './src/constants';


const main = () =>{
    const fileNames = getAllFileNames(IMPORT_DIRECTORY);
    let svgoObject = getSvgoObject();
    
    fileNames.forEach((fileName)=> {
        let filepath = IMPORT_DIRECTORY + fileName;
        let fileData = getFileData(filepath);
        exportSvg(svgoObject, fileData, fileName);
    });
}

main();