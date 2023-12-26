'use strict';
const success = (value) => ({ value: value });
const blowup = (value) => {throw new Error('blowing up with value ' + value);};
const process = (successFn, errorFn) => {
	const value = Math.round(Math.random() * 100, 2);
	return value > 50 ? successFn(value) : errorFn(value)
};
try {
	console.log(process(success, blowup));
} catch(ex) {
	console.log(ex.message);
}
