const fs = require("fs");

function readFileAndRes (filePath, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(404);
          res.end('error occur');
        }
        res.end(data);
      });
}

module.exports = {
    readFileAndRes: readFileAndRes
}