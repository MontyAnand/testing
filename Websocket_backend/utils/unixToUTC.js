const milisecond = new Date(2024,4,30,9,15,20).getTime();
//const milisecond = (Date.now()); // milisecond = utc*1000
console.log(milisecond);
const date = new Date(milisecond);
console.log(` Year ${date.getFullYear()}`);
console.log(` Month ${date.getMonth()}`);
console.log(` day ${date.getDate()}`);
console.log(` hour ${date.getHours()}`);
console.log(` minutes ${date.getMinutes()}`);
console.log(` second ${date.getSeconds()}`);