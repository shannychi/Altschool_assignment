const {readFileAndRes} = require("./FileReader");
const path = require("path");


const bookPath = path.join(__dirname, "..", "data.json");

function GetBooks (req, res) {
    readFileAndRes(bookPath, res);
    
}


module.exports = {
    GetBooks: GetBooks
}