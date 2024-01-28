const fs = require("fs");
const path = require ("path");


const bookPath = path.join(__dirname, "..", "data.json");


function DeleteBook(req, res) {
    const body = [];

    req.on("data", (Bookpiece) => {
        body.push(Bookpiece);
    });

    req.on("end", () => {
        const parseBook = Buffer.concat(body).toString();
        const bookDetails = JSON.parse(parseBook);

        // book Id

        const BookId = bookDetails.id;


        fs.readFile(bookPath, "utf8", (err, books) => {
            if (err) {
              console.log(err);
              res.writeHead(400);
              res.end("error occur");
            }
      
            const bookObj = JSON.parse(books)
        
            const BookWithId = bookObj .findIndex(book => book.id === BookId)
      
            console.log(BookWithId);
      
            if(BookWithId === -1) {
              res.writeHead(404)
              res.end("Book not found")
              return
            }
              
                bookObj.splice(BookWithId, 1);
      
      
            fs.writeFile(bookPath, JSON.stringify(bookObj), (err) => {
              if (err) {
                console.log(err);
                res.writeHead(400);
                res.end(
                  JSON.stringify({
                    message: "internal server Error, try again later.",
                  })
                );
              }
              res.writeHead(200)
              res.end("Deleted!");
            });
          })
        })
}

module.exports = {
    DeleteBook: DeleteBook
}