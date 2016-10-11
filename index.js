'use strict';

const fs = require('fs'),
      _ = require('lodash'),
      readline = require('readline'),
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      }),

      file = fs.readFileSync('db.json'),
      students = JSON.parse(file),
      proposedPairs = [];

let _students = students.slice();

while (_students.length > 1) {

  let remaining = _students.length - 1,
      randomIdx = _.random(1, remaining),
      studentA = _students[0],
      studentB = _students[randomIdx];
  
  if (_.includes(studentA.pairs, studentB.id)) 
    continue;
  else {
    proposedPairs.push([studentA, studentB]);
    _students = _students.filter(student => 
      student.id !== studentA.id);
    _students = _students.filter(student => 
      student.id !== studentB.id);
  }
}

if (_students.length === 1) proposedPairs.push([_students[0]]);

console.log(
  proposedPairs
    .map(pair => pair
      .map(student => student.name)
      .join(' & '))
    .join('\n')
);

rl.question('Accept these pairs? [y/N]', answer => {
  if (answer === 'y') {
    proposedPairs.forEach(pair => {
      let [studentA, studentB] = pair;
      
      if (!studentB) return;
      studentA.pairs.push(studentB.id);
      studentB.pairs.push(studentA.id);
    });
    
    fs.writeFileSync('db.json', JSON.stringify(students));
    console.log('Successfully saved pairs');
    process.exit(0);
  }
  else {
    console.log('Canceling...');
    process.exit(0);
  }
});
