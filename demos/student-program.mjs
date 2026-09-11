// Console adaptation of the CSC115 final project. Prompts and validation follow
// the Python source; file output becomes a browser download.
const grades = Object.freeze({
 'A+': 4.0, A: 4.0, 'A-': 3.7,
 'B+': 3.3, B: 3.0, 'B-': 2.7,
 'C+': 2.3, C: 2.0, 'C-': 1.7,
 'D+': 1.3, D: 1.0
});

export class Course {
 constructor(name, creditHours, letterGrade) {
  this.name = name;
  this.creditHours = creditHours;
  this.letterGrade = letterGrade;
 }
 toString() {
  const gpa = grades[this.letterGrade] ?? 0.0;
  return `${this.name}, ${this.creditHours} credits, Grade: ${this.letterGrade}, GPA: ${gpa.toFixed(1)}`;
 }
}

export class Student {
 constructor(fullName, email, major, id) {
  Object.assign(this, {fullName, email, major, id, courses: []});
 }
 addCourse(course) { this.courses.push(course); }
 calculateFinalGpa() {
  let qualityPoints = 0;
  let credits = 0;
  for (const course of this.courses) {
   qualityPoints += (grades[course.letterGrade] ?? 0.0) * course.creditHours;
   credits += course.creditHours;
  }
  return credits > 0 ? qualityPoints / credits : 0.0;
 }
 transcript() {
  const rule = '='.repeat(60), divider = '-'.repeat(60);
  return [rule, 'STUDENT TRANSCRIPT', rule,
   `Name: ${this.fullName}`, `Email: ${this.email}`, `Major: ${this.major}`,
   `Student ID: ${this.id}`, rule, 'COURSES:', divider,
   ...this.courses.map(String), divider,
   `FINAL GPA: ${this.calculateFinalGpa().toFixed(2)}`, rule, ''
  ].join('\n');
 }
}

// JavaScript cannot represent arbitrarily large Python integers exactly.
function integer(value) {
 const text = value.trim();
 if (!/^[+-]?\d(?:_?\d)*$/.test(text)) return null;
 const result = Number(text.replaceAll('_', ''));
 return Number.isSafeInteger(result) ? result : null;
}

function* studentRecord(write, onTranscript) {
 write('\n--- Student Record ---');
 const info = yield 'Enter student info (Full Name, Email, Major, Student ID): ';
 const parts = info.split(',').map(part => part.trim());
 if (parts.length !== 4) {
  write('Error: Please enter all 4 pieces of information separated by commas.');
  return;
 }
 const student = new Student(...parts);
 let count;
 while (true) {
  count = integer(yield 'How many courses (2-6)? ');
  if (count === null) write('Error: Please enter a valid number.');
  else if (count < 2 || count > 6) write('Error: Please enter a number between 2 and 6.');
  else break;
 }
 for (let i = 0; i < count; i++) {
  write(`\nCourse ${i + 1}:`);
  const courseInfo = yield 'Enter course info (Course Name, Credit Hours, Letter Grade): ';
  const courseParts = courseInfo.split(',').map(part => part.trim());
  if (courseParts.length !== 3) {
   write('Error: Please enter all 3 pieces of information separated by commas.');
   continue;
  }
  const credits = integer(courseParts[1]);
  if (credits === null) {
   write('Error: Credit hours must be a number.');
   continue;
  }
  const grade = courseParts[2].toUpperCase();
  if (!Object.hasOwn(grades, grade)) {
   write(`Error: Invalid letter grade '${grade}'.`);
   continue;
  }
  student.addCourse(new Course(courseParts[0], credits, grade));
 }
 const text = student.transcript();
 write('');
 write(text);
 // Keep names usable as downloads across operating systems.
 const name = student.fullName.replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g, '_').trim().slice(0, 120) || 'Student';
 const filename = name + '.txt';
 onTranscript({filename, text});
 write('Transcript ready to download: ' + filename);
}

function lottery(write, random) {
 const numbers = [];
 while (numbers.length < 5) {
  const number = Math.floor(random() * 69) + 1;
  if (!numbers.includes(number)) numbers.push(number);
 }
 const powerNumber = Math.floor(random() * 26) + 1;
 numbers.sort((a, b) => a - b);
 write(`Your lucky numbers are: ${numbers.join(' ')}. Your Power Number is: ${powerNumber}`);
 write(`Here is your result: ${numbers.join(' ')} ${powerNumber}`);
 write('');
}

function* pigLatin(write) {
 const sentence = yield 'Enter sentence to be converted into Pig Latin: ';
 const words = sentence.toUpperCase().split(/\s+/u).filter(Boolean);
 const converted = words.map(word => {
  const letters = Array.from(word);
  return letters.slice(1).join('') + letters[0] + 'AY';
 });
 write('');
 write(converted.join(' ') + (converted.length ? ' ' : '') + '\n');
}

function* rockPaperScissors(write, random) {
 const choices = ['rock', 'paper', 'scissors'];
 const beats = {rock: 'scissors', paper: 'rock', scissors: 'paper'};
 let tie;
 do {
  const computer = choices[Math.floor(random() * 3)];
  let player = (yield 'Enter a choice rock, paper, or scissors ----> ').toLowerCase();
  while (!choices.includes(player)) {
   player = (yield 'Invalid input  Enter rock, paper, or scissors ----> ').toLowerCase();
  }
  tie = player === computer;
  write('');
  write('-'.repeat(30));
  write(tie ? 'It is a tie. Play again' : beats[player] === computer ? 'Player wins' : 'Computer wins');
  write('Player choice: ' + player);
  write('Computer choice: ' + computer);
  write('-'.repeat(30));
  write('');
 } while (tie);
}

const menu = 'Welcome to the CSC115 Final Project Program.' +
 '\nEnter 1 to Student Record' +
 '\nEnter 2 for Lottery Number Generator' +
 '\nEnter 3 for Pig Latin' +
 '\nEnter 4 for Rock, Paper, Scissors';
const menuPrompt = 'Enter your choice 1, 2, 3, 4, or 9 to exit: ';

export function* studentApplication(write, random = Math.random, onTranscript = () => {}) {
 write('CSC 115 - FALL 2025 FINAL PROJECT\n' + '-'.repeat(130));
 while (true) {
  write(menu);
  let choice = yield menuPrompt;
  while (!['1', '2', '3', '4', '9'].includes(choice)) {
   choice = yield 'Invalid input. Re-enter your choice 1, 2, 3, 4, or 9 to exit: ';
  }
  if (choice === '9') break;
  write('');
  if (choice === '1') yield* studentRecord(write, onTranscript);
  else if (choice === '2') lottery(write, random);
  else if (choice === '3') yield* pigLatin(write);
  else if (choice === '4') yield* rockPaperScissors(write, random);
 }
 write('User select option 9. Exit program');
}
