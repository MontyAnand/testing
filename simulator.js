const fs = require('fs');
const readline = require('readline');

const stream = fs.createReadStream('file.csv');

const read = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

let dataArray = [];
const formatData = (line)=>{
    const serialData = line.split(',');
    return JSON.stringify(
      {
        date : serialData[0],
        open : parseFloat(serialData[1]),
        high : parseFloat(serialData[2]),
        low  : parseFloat(serialData[3]),
        close: parseFloat(serialData[4]),
        volume : parseInt(serialData[5]),
        turnover : parseFloat(serialData[6]),
      }, null, 0);
}

read.on('line', (line)=>{
  dataArray.push(formatData(line));
})
read.on('close', ()=>{
  console.log(dataArray);
})

read.on('error',(err)=>{
    console.log(`Error on reading : ${err}`);
})




// const fs = require('fs');
// const readline = require('readline');

// // Create a readable stream for the file
// const fileStream = fs.createReadStream('file.csv');

// // Create an interface for reading the file line by line
// const rl = readline.createInterface({
//   input: fileStream,
//   crlfDelay: Infinity
// });

// let lineCount = 0; // Counter to track the number of lines read

// // Function to read a line from the file
// function readLine() {
//   rl.once('line', (line) => {
//     console.log('Read line:', line);
//     lineCount++;

//     if (lineCount < 10) { // Stop after reading 10 lines
//       setTimeout(readLine, 1000); // Schedule the next read after 10 seconds
//     } else {
//       console.log('Reached the end. Closing the stream.');
//       rl.close(); // Close the readline interface
//       fileStream.close(); // Close the file stream
//     }
//   });
// }


// let n = 0;
// setInterval(() => {
//   rl.once('line', (line) => {
//     console.log('Read line:', line);
//   });
// }, 1000);

// const fun = async ()=>{
//   for(let i=0;i<100;i++){
//     await rl.once('line', (line) => {
//       console.log('Read line:', line);
//     });  
//   }
// }

// fun();



// const fs = require('fs');
// const readline = require('readline');

// // Create a readable stream for the file
// const fileStream = fs.createReadStream('file.csv');

// // Create an interface to read lines from the file
// const rl = readline.createInterface({
//   input: fileStream,
//   crlfDelay: Infinity
// });

// // Function to read a line using a promise
// function readLine(rl) {
//   return new Promise((resolve) => {
//     rl.once('line', (line) => {
//       resolve(line);
//     });
//   });
// }

// (async () => {
//   try {
//     for (let i = 0; i < 100; i++) {
//       const line = await readLine(rl);
//       console.log('Read line:', line);
//     }
//     rl.close(); // Close the readline interface after reading the lines
//   } catch (err) {
//     console.error('Error reading lines:', err);
//   } finally {
//     fileStream.close(); // Ensure the file stream is closed
//   }
// })();

