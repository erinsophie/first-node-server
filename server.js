// original node server

const http = require("http");
const path = require("path");
const fs = require("fs");

const PORT = 8080;

const server = http.createServer((req, res) => {
  const fileName = req.url === "/" ? "index.html" : `${req.url}.html`;
  const filePath = path.join(__dirname, "public", fileName);
  const errorPath = path.join(__dirname, "public", "404.html");

  fs.readFile(filePath, "utf8", (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // page not found
        fs.readFile(errorPath, "utf8", (err, content) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(content);
        });
      } else {
        // sever error
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      // success
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));