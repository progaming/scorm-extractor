const extract = require('./lib');

const main = async() => {
    const navTree = await extract('./packages/golf.zip', './content');
    console.log(JSON.stringify(navTree));
}

main();