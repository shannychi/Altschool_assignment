const http = require("http");

const PORT = 8900;
const HOST_NAME = "localhost";

function requestHandler(req, res) {
  res.end("Sharon Edeh")
}


const server = http.createServer(requestHandler);

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server is listening on ${HOST_NAME}:${PORT}`);
});
