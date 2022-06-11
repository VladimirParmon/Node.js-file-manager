import { checkPath, defaultDir, workingDir, checkIfFileExists } from "./currentDir.js";
import fs from 'fs';
import { confirm } from './confirm.js';
import path from 'path';

export function listAllFiles(promiseResolve, promiseReject) {
  const currentFolder = workingDir ? workingDir : defaultDir;
  fs.readdir(currentFolder, (err, files) => {
    if(err) {
      promiseReject(`Listing operation failed: ${err}`);
    } else {
      console.log('============================================');
      console.log('Your files and folders are:');
      console.log('============================================');
      files.forEach(file => {
        console.log(file)
      });
      console.log('============================================');
      promiseResolve();
    }
  });
};

export function readFile(path = '', promiseResolve, promiseReject) {
  new Promise((resolve, reject) => {
    checkPath(path, resolve, reject);
  })
  .then((savePath) => {
    fs.readFile(savePath, 'utf8', (err, file) => {
      if(err) {
        promiseReject(`Reading operation failed: ${err}`)
      } else {
        console.log(
    `
    ============================================
    Start of the file
    ============================================
    ${file}
    ============================================
    End of the file
    ============================================
    `)}
      promiseResolve();
    });
  })
  .catch((err) => {
    promiseReject('Reading operation failed: no such file!')
  })
}

export function addNewFile(rl, path, promiseResolve, promiseReject) {
  new Promise((resolve, reject) => {
    checkIfFileExists(path, resolve, reject);
  })
  .then((takenPath) => {
    confirm('File already exists, rewrite? (Yes/No)', rl)
    .then((confirmed) => {
      if(confirmed) {
        write(takenPath);
        promiseResolve('Successfully created empty file!');
      } else {
        promiseReject('Aborting!');
      }
    })
  })
  .catch((freePath) => {
    write(freePath);
    promiseResolve('No such file, creating one!');
  })

  function write(savePath) {
    fs.writeFile(savePath, '', (err) => {
      if (err) {
        promiseReject('Something went wrong during writing');
      }
      //promiseResolve('Successfully created empty file!');
    })
  }
}

export function renameFile(pathToFile, newFileName, promiseResolve, promiseReject) {
  new Promise((resolve, reject) => {
    checkPath(pathToFile, resolve, reject);
  })
  .then((savePath) => {
    rename(savePath)
  })
  .catch((err) => {
    promiseReject('Renaming operation failed: no such file!')
  })

  function rename(savePath) {
    const oldName = path.basename(savePath);
    const re = new RegExp(oldName);
    const newPath = savePath.replace(re, newFileName);
    fs.rename(savePath, newPath, (err) => {
      if (err) {
        promiseReject('Something went wrong during renaming');
      }
      promiseResolve('Renamed successfully!');
    })
  }
}

export function copyFile(rl, oldPathToFile, newPathToFile, promiseResolve, promiseReject) {
  new Promise((resolve, reject) => {
    checkPath(oldPathToFile, resolve, reject);
  })
  .then((savePath) => {
    makeCopy(savePath);
  })
  .catch((err) => {
    promiseReject('Copying operation failed: no such file!');
  })

  function makeCopy(savePath) {
    fs.copyFile(savePath, newPathToFile, fs.constants.COPYFILE_EXCL, (err) => {
      if (err) {
        confirm('File already exists, rewrite? (Yes/No)', rl)
        .then((confirmed) => {
          if(confirmed) {
            fs.copyFile(savePath, newPathToFile, (err) => {
              if (err) promiseReject('Something went wrong during copying!');
              promiseResolve('Successfully copied file!');
            })
          } else {
            promiseReject('Aborting!');
          }
        })
      } else {
        promiseResolve('Successfully copied file!');
      }
    })
  }
}

export function moveFile(oldPathToFile, destinationFolder, promiseResolve, promiseReject) {
  new Promise((resolve, reject) => {
    checkPath(oldPathToFile, resolve, reject);
  })
  .then((savePath) => {
    move(savePath);
  })
  .catch((err) => {
    promiseReject('Moving operation failed: no such file!');
  })

  function move(savePath) {
    const fileName = path.basename(savePath);
    const newPathToFile = path.join(destinationFolder, fileName);
    fs.rename(savePath, newPathToFile, (err) => {
      if (err) {
        promiseReject('Something went wrong, check if destination folder is valid');
      }
      promiseResolve('Moved successfully!');
    })
  }
}

export function deleteFile(pathToFile, promiseResolve, promiseReject) {
  new Promise((resolve, reject) => {
    checkPath(pathToFile, resolve, reject);
  })
  .then((savePath) => {
    remove(savePath);
  })
  .catch((err) => {
    promiseReject('Deletion operation failed: no such file!');
  })

  function remove(savePath) {
    fs.unlink(savePath, (err) => {
      if(err) {
        promiseReject('Something went wrong during deletion!');
      }
      promiseResolve('Successfully deleted!');
    })
  }
}
