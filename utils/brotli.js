import fs from 'fs';
import zlib from 'zlib';
import { checkPath } from './currentDir.js';
import path from 'path';

export function compressFile(pathToFile, destinationPath, promiseResolve, promiseReject ) {
  new Promise((resolve, reject) => {
    checkPath(pathToFile, resolve, reject);
  })
  .then((savePath) => {
    compress(savePath);
  })
  .catch((err) => {
    promiseReject('Compression operation failed: no such file!');
  })

  function compress(savePath) {
    const destination = checkExtension(destinationPath);
    //TODO: confirm if file already exists
    //!! destination validation
    const readStream = fs.ReadStream(savePath);
    const writeStream = fs.WriteStream(destination);
    const brotli = zlib.createBrotliCompress();
    const result = readStream.pipe(brotli).pipe(writeStream);
    result.on('finish', (err) => {
      if(err) promiseReject('Something went wrong during compression!');
      promiseResolve('Compressed successfully!');
    });
  }

  function checkExtension(pathToCheck) {
    const fileName = path.basename(pathToCheck);
    const extension = fileName.split('.')[1];
    if (extension === 'br') {
      return pathToCheck;
    } else {
      const reg = new RegExp(extension);
      const newPath = pathToCheck.replace(reg, 'br');
      return newPath;
    }
  }
}

export function decompressFile(pathToFile, destinationPath, promiseResolve, promiseReject ) {
  new Promise((resolve, reject) => {
    checkPath(pathToFile, resolve, reject);
  })
  .then((savePath) => {
    decompress(savePath);
  })
  .catch((err) => {
    promiseReject('Decompression operation failed: no such file!');
  })

  function decompress(savePath) {
    const readStream = fs.ReadStream(savePath);
    const writeStream = fs.WriteStream(destinationPath);
    const brotli = zlib.createBrotliDecompress();
    const result = readStream.pipe(brotli).pipe(writeStream);
    result.on('finish', (err) => {
      if(err) promiseReject('Something went wrong during decompression!');
      promiseResolve('Decompressed successfully!');
    });
  }
}



