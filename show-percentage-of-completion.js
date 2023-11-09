const fs = require('fs');
const readline = require('readline');
const cliProgress = require('cli-progress');

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const filePath = 'free_company_dataset.csv';
const totalSize = fs.statSync(filePath).size;
const countries = {};

bar.start(totalSize, 0);

const stream = readline.createInterface({
    input: fs.createReadStream(filePath)
});

stream.on('error', error => {
    console.error(error);
});

stream.on('line', line => {
    const country = line.split(',')[0]
    countries[country] = countries[country] ? countries[country] + 1 : 1;
    bar.increment(line.length + 1);
});

stream.on('close', () => {
    bar.stop();
    // console.log(countries);
})

