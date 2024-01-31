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

const {authenticating} = require("./modules/authentication")

const bookPath = path.join(__dirname, "data.json");
const PORT = 8000;
const HOST_NAME = "localhost";

function HandleRequest(req, res) {
  if (req.url === "/books" && req.method === "GET") {
    //get all books
    authenticating(req, res)
    .then(() => {
        GetBooks(req, res)
    }) .catch((err) => {
        res.writeHead(400)
        res.end(JSON.stringify({
            message:err
        }))
    })
  } else if (req.url === "/books" && req.method === "PUT") {
     //update books

    authenticating(req, res)
    .then(() => {
        UpdateOldBook(req, res)
    }) .catch((err) => {
        res.writeHead(400)
        res.end(JSON.stringify({
            message:err
        }))
    })
  } else if (req.url === "/books" && req.method === "DELETE") {
    // delete book

    authenticating(req, res)
    .then(() => {
        DeleteBook(req, res);
    }) .catch((err) => {
        res.writeHead(400)
        res.end(JSON.stringify({
            message:err
        }))
    })
  } else if (req.url === "/books/author" && req.method === "GET") {
   // get authors

    authenticating(req, res)
    .then(() => {
        Author(req, res)
    }) .catch((err) => {
        res.writeHead(400)
        res.end(JSON.stringify({
            message:err
        }))
    })
  } else if (req.url === "/books/author" && req.method === "POST") {
    

    authenticating(req, res)
    .then(() => {
        createNewBook(req, res)
    }) .catch((err) => {
        res.writeHead(400)
        res.end(JSON.stringify({
            message:err
        }))
    })
  } else if (req.url === "/books/author" && req.method === "PUT") {
    // upadat author by Id
    authenticating(req, res)
    .then(() => {
        UpdateOldBook(req, res);
    }) .catch((err) => {
        res.writeHead(400)
        res.end(JSON.stringify({
            message:err
        }))
    })
  } else if (req.url === "/books" && req.method === "POST"){
   
    authenticating(req, res)
    .then(() => {
        createNewBook(req, res)
    }) .catch((err) => {
        res.writeHead(400)
        res.end(JSON.stringify({
            message:err
        }))
    })
  } else if (req.url === "/books" && req.method === "PATCH"){
   
    authenticating(req, res)
    .then(() => {
        res.end("updating!")
    }) .catch((err) => {
        res.writeHead(400)
        res.end(JSON.stringify({
            message:err
        }))
    })
  }else if (req.url === "/books/author" && req.method === "DELETE") {
     authenticating(req, res)
     .then(() => {
        res.end("author deleted")
     }) .catch((err) => {
         res.writeHead(400)
         res.end(JSON.stringify({
             message:err
         }))
     })
  }
}

const server = http.createServer(HandleRequest);

server.listen(PORT, HOST_NAME, () => {
  booksDB = JSON.parse(fs.readFileSync(bookPath, "utf8"));
  console.log(`Server is listening on ${HOST_NAME}:${PORT}`);
});
