import readline from 'readline';
import { getUsernameFromArgs } from './utils/getUsername.js';
import { showTips } from './utils/showTips.js';
import { logCurrentDir, navigateUp, changeDir } from './utils/currentDir.js';
import { 
  addNewFile, 
  listAllFiles, 
  readFile, renameFile, 
  copyFile, 
  moveFile, 
  deleteFile, 
} from './utils/fileSystem.js'
import { getOsInfo } from './utils/os.js';
import { createHash } from './utils/hash.js';
import { compressFile, decompressFile } from './utils/brotli.js';

function fileManager() {
  const username = getUsernameFromArgs();

  console.log(`Welcome to the File Manager, ${username}!`);
  logCurrentDir();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'FILE MANAGER> '
  });

  rl.prompt();

  rl.on('close', ()=> {
    console.log(`Thank you for using File Manager, ${username}!`);
  })

  rl.on('line', (input) => {
    inputHandler(input);
  });

  function inputHandler(input) {

    const arr = input.split(' ');
    const command = arr.shift();

    new Promise((resolve, reject) => {
      switch (command) {
        case '.exit': rl.close();
        break;
        case '/help': showTips(resolve);
        break;
        case 'up': navigateUp(resolve);
        break;
        case 'cd': changeDir(arr[0], resolve, reject);
        break;
        case 'ls': listAllFiles(resolve, reject);
        break;
        case 'cat': readFile(arr[0], resolve, reject);
        break;
        case 'add': addNewFile(rl, arr[0], resolve, reject);
        break;
        case 'rn': renameFile(arr[0], arr[1], resolve, reject);
        break;
        case 'cp': copyFile(rl, arr[0], arr[1], resolve, reject);
        break;
        case 'mv': moveFile(arr[0], arr[1], resolve, reject);
        break;
        case 'rm': deleteFile(arr[0], resolve, reject);
        break;
        case 'os': getOsInfo(arr[0], resolve, reject);
        break;
        case 'hash': createHash(arr[0], resolve, reject);
        break;
        case 'compress': compressFile(arr[0], arr[1], resolve, reject);
        break;
        case 'decompress': decompressFile(arr[0], arr[1], resolve, reject);
        break;
        default: reject('Unknown command ;( Type /help for advice');
      }
    }).then((msg) => {
      if (msg) console.log(msg);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      if (input !== '.exit') logCurrentDir();
      rl.prompt();
    })
  }
}



fileManager();






