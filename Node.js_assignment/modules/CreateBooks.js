const fs = require("fs");
const path = require("path");

const bookPath = path.join(__dirname, "..", "data.json");

function createNewBook(req, res) {
    console.log("I am here!");
    const body = [];
  
    req.on("data", (chunk) => {
      body.push(chunk);
    });
  
    req.on("end", () => {
      const pastBook = Buffer.concat(body).toString();
      const newBook = JSON.parse(pastBook);
  
      fs.readFile(bookPath, "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(500);
          res.end("Internal Server Error");
          return;
        }
  
        let oldBooks = [];
        try {
          oldBooks = JSON.parse(data);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          res.writeHead(500);
          res.end("Internal Server Error");
          return;
        }

        const lastBook = oldBooks.length > 0 ? oldBooks[oldBooks.length - 1] : { id: 0 };
        const lastBookId = lastBook.id || 0;
        newBook.id = lastBookId + 1;
  
        const allBooks = [...oldBooks, newBook];
  
        fs.writeFile(bookPath, JSON.stringify(allBooks), (err) => {
          if (err) {
            console.log(err);
            res.writeHead(500);
            res.end("Internal Server Error");
            return;
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(newBook));
        });
      });
    });
}

module.exports = {
    createNewBook: createNewBook
};
