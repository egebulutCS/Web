'use strict';
const numbers = [1, 5, 2, 6, 8, 3, 4, 9, 7, 6];
let totalOfDoubleOfEven = 0;
numbers.filter(number => number % 2 === 0).forEach(number => totalOfDoubleOfEven += number * 2);
console.log(totalOfDoubleOfEven);