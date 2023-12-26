'use strict';
const students = [
{
name: "Anna",
sex: "f",
grades: [4.5, 3.5, 4]
},
{
name: "Dennis",
sex: "m",
country: "Germany",
grades: [5, 1.5, 4]
},
{
name: "Martha",
sex: "f",
grades: [5, 4, 2.5, 3]
},
{
name: "Brock",
sex: "m",
grades: [4, 3, 2]
}
];

function studentResult(students){
    return (students.filter(student => student.sex === "f").map(student => {student.grades = student.grades.reduce((a, b) => a + b, 0) / student.grades.length 
    return student}));
}
console.log(studentResult(students));