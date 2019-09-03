
const path = require('path');
const fs = require('fs');
const tools = require('simple-svg-tools');
const directoryPath = path.join(__dirname, 'svgs');
const SVGO = require('svgo');
const exportPath = path.join(__dirname, 'optimizedSVGs');

const svgo = new SVGO({
    plugins: [{
       cleanupAttrs: true,
   }, {
       removeDoctype: true,
   },{
       removeXMLProcInst: true,
   },{
       removeComments: true,
   },{
       removeMetadata: true,
   },{
       removeTitle: true,
   },{
       removeDesc: true,
   },{
       removeUselessDefs: true,
   },{
       removeEditorsNSData: true,
   },{
       removeEmptyAttrs: true,
   },{
       removeHiddenElems: true,
   },{
       removeEmptyText: true,
   },{
       removeEmptyContainers: true,
   },{
       removeViewBox: false,
   },{
       cleanupEnableBackground: true,
   },{
       convertStyleToAttrs: true,
   },{
       convertColors: true,
   },{
       convertPathData: true,
   },{
       convertTransform: true,
   },{
       removeUnknownsAndDefaults: true,
   },{
        removeNonInheritableGroupAttrs: true,
   },{
       removeUselessStrokeAndFill: true,
   },{
       removeUnusedNS: true,
   },{
        cleanupIDs: true,
   },{
       cleanupNumericValues: true,
   },{
       moveElemsAttrsToGroup: true,
   },{
       moveGroupAttrsToElems: true,
   },{
       collapseGroups: true,
   },{
       removeRasterImages: false,
   },{
       mergePaths: true,
   },{
       convertShapeToPath: true,
   },{
       sortAttrs: true,
   },{
       removeDimensions: true,
   },{
       removeAttrs: {attrs: '(stroke|fill)'},
   }]
});

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function(element) {
        var filepath = path.join(directoryPath, element);
        fs.readFile(filepath, 'utf8', function(err, data) {
            if (err) {
                throw err;
            }
            svgo.optimize(data, {path: filepath}).then(function(result) {
                tools.ExportSVG(result.data, path.join(exportPath,element)).then(() => {
                    console.log('Exported!');
                }).catch(err => {
                    console.log(err);
                });
            });
        });
    });
});