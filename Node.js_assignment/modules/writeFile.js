const fs = require('fs');

function writeFile(filePath, data, successCallback, errorCallback) {
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            if (errorCallback) {
                errorCallback(err);
            }
        } else {
            if (successCallback) {
                successCallback();
            }
        }
    });
}

module.exports = writeFile;
