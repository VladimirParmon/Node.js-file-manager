import readline from 'readline';
import { getUsernameFromArgs } from './utils/getUsername.js';
import { showTips } from './utils/showTips.js';
import { logCurrentDir } from './utils/currentDir.js'

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
    switch (input) {
      case '.exit': rl.close();
      break;
      case '/help': showTips();
      break;
      default: console.log('Unknown command ;( Type /help for advice');
    }

    if (input !== '.exit') logCurrentDir();
  }
}



fileManager();






