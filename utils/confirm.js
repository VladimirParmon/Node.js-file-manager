export function confirm(question, rl) {
  return new Promise(function(resolve, reject) {
    rl.question(question, async function(answer) {
          if (/^y(es)?$/i.test(answer)) {
              resolve(true);
              return
          } else if (/^n(o)?$/i.test(answer)) {
              resolve(false);
              return
          } else {
            console.log('Please enter Yes or No');
            resolve(await confirm(question, rl));
          }
      });
  });
}