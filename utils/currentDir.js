import { homedir } from 'os';
import path from 'path';
import fs from 'fs';

export const defaultDir = homedir();
export let workingDir = null;

export function logCurrentDir() {
  let dir = workingDir ? workingDir : defaultDir;
  console.log(`You are currently in ${dir}`);
  return;
}

export function updateCurrentDir(path) {
  workingDir = path;
  return;
}

export function navigateUp(promiseResolve) {
  const oldPath = workingDir ? workingDir : defaultDir;
  const newPath = path.join(oldPath, '../');
  updateCurrentDir(newPath);
  promiseResolve();
  return;
}

export function changeDir(path, promiseResolve, promiseReject) {
  new Promise((resolve, reject) => {
    checkPath(path, resolve, reject);
  })
  .then((savePath) => {
    updateCurrentDir(savePath);
    promiseResolve();
  })
  .catch(() => {
    promiseReject('Operation failed! (No such folder)');
  })
  return;
}

export function checkPath(input, resolve, reject) {
  const isValidAbsolutePath = fs.access(input, error => {
    if (!error) {
      resolve(input);
    } else {
      const currentDir = workingDir ? workingDir : defaultDir;
      const pathToCheck = path.join(currentDir, input);
      const isValidRelativePath = fs.access(pathToCheck, error => {
        if(!error) {
          resolve(pathToCheck);
        } else {
          reject();
        }
      })
    }
  })
}

export function checkIfFileExists(input, resolve, reject) {
  const currentDir = workingDir ? workingDir : defaultDir;
  const pathToCheck = path.join(currentDir, input);
  const doesAlreadyExist = fs.access(pathToCheck, error => {
    if(!error) {
      resolve(pathToCheck);
    } else {
      reject(pathToCheck);
    }
  })
}
