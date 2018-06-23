const fs = require('fs');
const path = require('path');
const unzip = require('unzip');
const ScormContentParser = require('./ScormContentParser').ScormContentParser;
const ScormNavTreeBuilder = require('./ScormNavTreeBuilder');

const scormParser = new ScormContentParser();
const navTreeBuilder = new ScormNavTreeBuilder();

const extract = (filePath, contentDir) => {
    const fileName = path.basename(filePath);
    const extractedDir = fileName.replace('.zip','');
    const unzipPipe = unzip.Extract({path:`${contentDir}/${extractedDir}`});

    unzipPipe.on('close', () => {
        const manifest = `${contentDir}/${extractedDir}/imsmanifest.xml`;
        const data = fs.readFileSync(manifest);
        const scormContent = scormParser.parse(data);
        const navTree = navTreeBuilder.buildNavigationModel(scormContent, 'windows10');
        console.log(JSON.stringify(navTree));
    })
    fs.createReadStream(`${filePath}`).pipe(unzipPipe);
}

module.exports = extract;