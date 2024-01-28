const http = require("http");
const fs = require("fs");
const path = require("path");
const internal = require("stream");

let booksDB = [];

const { GetBooks } = require("./modules/GetBooks");
const { UpdateOldBook } = require("./modules/PutBooks");
const { DeleteBook } = require("./modules/DeleteBooks");
const { Author } = require("./modules/Author");
const {createNewBook} = require("./modules/CreateBooks");

const bookPath = path.join(__dirname, "data.json");
const PORT = 8000;
const HOST_NAME = "localhost";

function HandleRequest(req, res) {
  if (req.url === "/books" && req.method === "GET") {
    //get all books
    GetBooks(req, res);
  } else if (req.url === "/books" && req.method === "PUT") {
    UpdateOldBook(req, res); //update books
  } else if (req.url === "/books" && req.method === "DELETE") {
    DeleteBook(req, res); // delete book
  } else if (req.url === "/books/author" && req.method === "GET") {
    Author(req, res); // get authors
  } else if (req.url === "/books/author" && req.method === "POST") {
    createNewBook(req, res);
  } else if (req.url === "/books/author" && req.method === "PUT") {
    UpdateOldBook(req, res); // upadat author by Id
  }
}

const server = http.createServer(HandleRequest);

server.listen(PORT, HOST_NAME, () => {
  booksDB = JSON.parse(fs.readFileSync(bookPath, "utf8"));
  console.log(`Server is listening on ${HOST_NAME}:${PORT}`);
});
