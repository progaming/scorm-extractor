const extract = require('../lib');

const main = async() => {
    const navTree = await extract(__dirname + '/golf.zip' , __dirname + '/../content');
    console.log(JSON.stringify(navTree));
}

main();