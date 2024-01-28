const fs = require("fs");
const path = require("path");


const bookPath = path.join(__dirname, "..", "data.json");

function GetBooks (req, res) {
    fs.readFile(bookPath, "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(400);
          res.end("error occur");
        }
        res.end(data);
      });
    
}


module.exports = {
    GetBooks: GetBooks
}