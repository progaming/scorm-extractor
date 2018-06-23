const fs = require('fs');
const path = require('path');
const unzip = require('unzip');
const ScormContentParser = require('./lib/ScormContentParser').ScormContentParser;
const ScormNavTreeBuilder = require('./lib/ScormNavTreeBuilder');

const scormParser = new ScormContentParser();
const navTreeBuilder = new ScormNavTreeBuilder();

const extract = (filePath, contentDir) => {
    return new Promise((resolve) => {
        const fileName = path.basename(filePath);
        const extractedDir = fileName.replace('.zip','');
        const unzipPipe = unzip.Extract({path:`${contentDir}/${extractedDir}`});
    
        unzipPipe.on('close', () => {
            const manifest = `${contentDir}/${extractedDir}/imsmanifest.xml`;
            const data = fs.readFileSync(manifest);
            const scormContent = scormParser.parse(data);
            const navTree = navTreeBuilder.buildNavigationModel(scormContent, 'windows10');
            resolve(navTree);
        })
        fs.createReadStream(`${filePath}`).pipe(unzipPipe);
    })
}

module.exports = extract;