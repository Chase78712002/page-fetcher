const argsArr = process.argv.slice(2,4);
const URL = argsArr[0];
const filePath = argsArr[1];
// take URL and local file path as CL arguments
// download the resource to specified path
const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(`${URL}`, (error, response, body) => {
  if (response.statusCode !== 200) {
    throw Error(`Error ${response.statusCode}, Please search the status code for further details`);
  }
  console.log('response', response.statusCode);
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      fs.writeFile(`${filePath}`, body, (err) => {
        if (err) throw err;
        console.log('The file has been saved');
        process.exit();
      });
    } else {
      rl.question(`File exits, do you want to overwrite the ${filePath}? (y to confirm)`, (input) => {
        if (input === 'y') {
          fs.writeFile(`${filePath}`, body, (err) => {
            if (err) throw err;
            console.log('The file has been saved');
            rl.close();
          });
        } else {
          rl.close();
        }
      })
    }
  })
})




