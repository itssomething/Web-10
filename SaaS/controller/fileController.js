const fs = require('fs');

const writeFileSync = (fileName, data) => {
    fs.writeFileSync(fileName, JSON.stringify(data), 'utf-8');
}

const readFileSync = (fileName) => {
    let data = fs.readFileSync(fileName, 'utf-8');
    return JSON.parse(data);
}

//Export module ra thành 1 object bao gồm 2 function
module.exports = {
    writeFileSync,
    readFileSync
}