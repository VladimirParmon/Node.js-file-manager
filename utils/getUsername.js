export function getUsernameFromArgs() {
  const args = process.argv.slice(2);
  const tuple = args[0].split('=');

  const expectedCommand = '--username';

  const command = tuple[0]; //--username
  const username = tuple[1];
  if(command === expectedCommand) return username;
  return false;
};