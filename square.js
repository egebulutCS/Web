=== square.js ===
function square(number) {
return number * number;
}

module.exports = square;


=== index.js ===
let square = require("./square");

let n = 34;
let result = square(n);
console.log(result);



exports.square = (lenghtOfSide) => lenghtOfSide * lenghtOfSide