const express = require('express');
const querystring = require('querystring');
const path = require('path');

const domainReplacer = require('./domainReplacer');

let app = express();

app.use(express.urlencoded({ extended: false }));

app.use('/zohodesk-asap-extension-downloader', express.static('tooltip'));

app.use('/download', (req, res) => {
  let { domainName = 'desk.zoho.com' } = req.query;
  domainReplacer(domainName)
    .then(_ => {
      res.download(
        path.join(__dirname, '..', 'downloads', 'extension.zip'),
        'extension.zip',
        err => {
          if (err) {
            throw err;
          } else {
            console.log('File downloaded from user machine');
          }
        }
      );
    })
    .catch(e => {
      console.log(e);
      res.status(500).end();
    });
});

app.listen(9090, () => {
  console.log('Listening at http://localhost:9090/zohodesk-asap-extension-downloader');
});
