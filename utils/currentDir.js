import { homedir } from 'os';
const defaultDir = homedir();
let workingDir = null;

export function logCurrentDir() {
  let dir = workingDir ? workingDir : defaultDir;
  console.log(`You are currently in ${dir}`);
}

export function updateCurrentDir(path) {
  workingDir = path;
  return;
}
