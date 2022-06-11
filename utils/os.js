import os from 'os';

export function getOsInfo(command, promiseResolve, promiseReject) {
  if (!command) promiseReject('Please enter the argument! See /help for options');
  switch (command) {
    case '--EOL': promiseResolve(replaceEOL(os.EOL));
    break;
    case '--cpus': promiseResolve(os.cpus());
    break;
    case '--homedir': promiseResolve(os.homedir());
    break;
    case '--username': promiseResolve(os.userInfo().username);
    break;
    case '--architecture': promiseResolve(os.arch());
    break;
    default: promiseReject('Unknown argument line! See /help for tips');
  }
}

function replaceEOL(data) {
  const result = data.replace(/(\n|\r)/g, function ($0){
    let index = {
      '\n': '\\n',
      '\r': '\\r'
    };
    return index[$0] !== undefined ? index[$0] : $0;
  });
  return result;
}
