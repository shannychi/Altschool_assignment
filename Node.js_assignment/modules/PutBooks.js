const fs = require("fs");
const path = require ("path");


const bookPath = path.join(__dirname, "..", "data.json");


function UpdateOldBook(req, res) {
    console.log("updated book!");

    const body = [];

    req.on("data", (bookPiece) => {
        body.push(bookPiece);
    });

    req.on("end", () => {
        const parseBook = Buffer.concat(body).toString();
        const bookDetails = JSON.parse(parseBook);

        // book Id

        const BookId = bookDetails.id;

        //add new book to existing data
       

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
              
            const updatedBook ={...bookObj[BookWithId], ...bookDetails};
            bookObj[BookWithId] = updatedBook;
      
      
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
              res.end("updated!");
            });
          })
        })
      }




      module.exports = {
       UpdateOldBook: UpdateOldBook
    }