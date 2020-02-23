const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue')
// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = require('./messageQueue');
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = () => { }) => {
  //console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // if (req.url === './background.jpg') {
  // };
  var commands = messages.dequeue()
  if (req.method === 'GET') {
    if (req.path === '/') {
      res.end(commands);
      res.writeHead(200, headers);
      next();
    } else if (req.path === './background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writehead(404, headers)
        } else {
          res.writeHead(200, headers);
          res.write(data, 'binary')
        }
        res.end();
        next();
      })
    }
  }; // invoke next() at the end of a request to help with testing!
  if (req.method === 'POST' && req.url === './background.jpg') {
    var fileData = Buffer.alloc(0);

    req.on('data', (chunk) => {
      fileData += Buffer.concat([fileData, chunk]);
    });

    req.on('end', () => {
      var file = multipart.getFile(fileData);
    fs.writeFile(module.exports.backgroundImageFile, file.data, () => {
      res.writeHead(err ? 400 : 201, headers);
      res.end();
         next();
    });
  });
  }
};
