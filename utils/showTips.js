export function showTips(promiseResolve) {
  console.log(`
  .exit ========================================> Exit the app (also ctrl + c);
  up ===========================================> Go upper from current directory;
  cd path_to_directory =========================> Go to dedicated folder from current directory (relative or absolute);
  ls ===========================================> List all files and folder in current directory;
  cat path_to_file =============================> Read file;
  add new_file_name ============================> Create empty file in current working directory;
  rn path_to_file new_filename =================> Rename file;
  cp path_to_file path_to_new_directory ========> Copy file;
  mv path_to_file path_to_new_directory ========> Move file;
  rm path_to_file ==============================> Delete file;
  os --EOL =====================================> Get EOL (default system End-Of-Line);
  os --cpus ====================================> Get host machine CPUs info;
  os --homedir =================================> Get home directory;
  os --username ================================> Get current system user name;
  os --architecture ============================> Get CPU architecture for which Node.js binary has compiled;
  hash path_to_file ============================> Calculate hash for file;
  compress path_to_file path_to_destination ====> Compress file (using Brotli algorithm);
  decompress path_to_file path_to_destination ==> Decompress file (using Brotli algorithm);
  `);
  promiseResolve();
}