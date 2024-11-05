// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port where the server will listen
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
  // Check if the requested URL is for the main page
  if (req.url === '/' || req.url === '/index.html') {
    // Read the HTML file and serve it
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error reading the HTML file.');
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  } else {
    // Handle unknown routes with a 404 page
    res.statusCode = 404;
    res.end('Page not found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
