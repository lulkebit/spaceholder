#! /usr/bin/env node

const followRedirects = require('follow-redirects');
const http = followRedirects.http;
const https = followRedirects.https;
const fs = require('fs');
const random = require('random-string');
const Image = require('./image/Image');
const readline = require('readline');
const { promisify } = require('util');

followRedirects.maxRedirects = 10;

/* Require Commander configuration */
const program = require('./commanderConfig');

let createdFilesCount = 0;
const createdFiles = [];

// Promisify the necessary functions
const closeFile = promisify(fs.close);
const httpGet = (url) => {
  return new Promise((resolve, reject) => {
    const requestFn = url.startsWith('http://') ? http.get : https.get;
    requestFn(url, (response) => {
      resolve(response);
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const download = async (url, dest) => {
  'use strict';

  try {
    const file = fs.createWriteStream(dest);
    const response = await httpGet(url);
    
    return new Promise((resolve, reject) => {
      response.pipe(file);
      
      file.on('finish', async () => {
        try {
          file.close();
          
          createdFilesCount++;
          createdFiles.push(dest);

          const percentage = Math.ceil((createdFilesCount / program.number * 100));

          readline.cursorTo(process.stdout, 0);
          process.stdout.write('Downloaded ' + createdFilesCount + ' of ' + program.number + '. [' + percentage + ' %]');

          if (createdFilesCount === program.number) {
            console.info("\n" + program.number + ' image(s) successfully downloaded');
          }
          
          resolve();
        } catch (err) {
          reject(err);
        }
      });
      
      file.on('error', (err) => {
        console.log('Failed');
        reject(err);
      });
    });
  } catch (err) {
    console.error('Download failed:', err.message);
  }
};

const filename = (iterator) => {
  'use strict';

  return 'spaceholder_' + program.size + '_' + random({length: 4}) + iterator + random({length: 4}) + '.jpg';
};

// Execute downloads
(async () => {
  for (let i = 1; i <= program.number; i++) {
    await download(Image.getImageUrl(program.size), filename(i));
  }
})();