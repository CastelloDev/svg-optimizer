
const path = require('path');
const fs = require('fs');

function getAllFileName(){ 
    const directoryPath = path.join(__dirname, 'svgs');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
    return files;

    });
};