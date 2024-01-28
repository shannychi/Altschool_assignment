const http = require("http");
const fs = require("fs");
const path = require("path");
const internal = require("stream");
let booksDB = []



const {GetBooks} = require("./modules/GetBooks")


const  bookPath = path.join(__dirname, "data.json");

const PORT = 8000;
const HOST_NAME = "localhost";



function HandleRequest(req, res) {
    if(req.url === "/books" && req.method === "GET"){
        GetBooks(req, res)
    }
    else if(req.url === "/books" && req.method === "PUT"){
        console.log("server listing at Post")
    }
    else if(req.url === "/books" && req.method === "DELETE"){
        console.log("server listing at Post")
    }

    else if(req.url === "/books/author" && req.method === "GET"){
        console.log("server listing at GEt author")
    }
    else if(req.url === "/books/author" && req.method === "POST"){
        console.log("server listing at Post")
    }
    else if(req.url === "/books/author" && req.method === "PUT"){
        console.log("server listing at Post")
    }
}






const server = http.createServer(HandleRequest);

server.listen(PORT, HOST_NAME, () => {
    booksDB = JSON.parse(fs.readFileSync(bookPath, "utf8"));
    console.log(`Server is listening on ${HOST_NAME}:${PORT}`);
})