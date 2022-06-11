import crypto from 'crypto';
import fs from 'fs';
import { checkPath } from './currentDir.js';

export function createHash(path, promiseResolve, promiseReject) {
  new Promise((resolve, reject) => {
    checkPath(path, resolve, reject);
  })
  .then((savePath) => {
    calculateHash(savePath);
  })
  .catch((err) => {
    promiseReject('Hash calculation failed: no such file!');
  })

  function calculateHash(savePath) {
    let hash = crypto.createHash('sha256');
    let s = fs.ReadStream(savePath);
    s.on('data', function(data) {
      hash.update(data)
    })
    s.on('end', function() {
      let hex = hash.digest('hex');
      promiseResolve(hex);
    })
  }
};