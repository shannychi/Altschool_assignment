const fs = require("fs");
const path = require ("path");

const bookPath = path.join(__dirname, "..", "data.json");

function Author(req, res) {
    fs.readFile(bookPath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.writeHead(500);
            res.end("Internal Server Error");
            return;
        }

        try {
            const books = JSON.parse(data);
            const authors = books.map(book => book.author);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(authors));
        } catch (error) {
            console.error("Error parsing JSON:", error);
            res.writeHead(500);
            res.end("Internal Server Error");
        }
    });
}

module.exports = {
    Author: Author
}