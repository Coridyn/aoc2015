const crypto = require('crypto');

const base = 'bgvyzdsv';

const needle = '000000';  // 6 leading zeros

const start = 0;
const end = 1000000000;      // 1 billion
const progress = 10000;   // how often to report progress

const startTime = Date.now();
for (var i = start; i <= end; i++){
    if (i % progress == 0){
        console.log(`progress: ${i.toLocaleString()}`)
    }
    
    let hash = crypto.createHash('md5');
    hash.update(`${base}${i}`);
    
    let result = hash.digest('hex');
    if (result.startsWith(needle)){
        console.log(`result=${result}, index= ${i}`);
        break;
    }
    
}

const endTime = Date.now();
console.log(`Total time= ${endTime - startTime}ms`);