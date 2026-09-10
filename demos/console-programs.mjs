import {newBoard,drop,winner,openColumns,chooseMove,convert,population} from './logic.mjs';
// Generators pause at each original console input prompt.
export function* connectFour(write,random=Math.random){
 do {
  const board=newBoard();
  write("Let's play Connect Four.\nPick the intelligence level\n0: You play the opponent too\n1: The program plays randomly\n2: The program does not miss a winning play\n3: The program additionally avoids a losing play");
  const input=yield 'Enter your choice > ';
  let level=/^[+-]?\d+$/.test(input.trim())?Number(input):1;
  if(level<0||level>3)level=1;
  const printBoard=()=>{
   const lines=[''];
   for(let row=5;row>=0;row--)lines.push(row+' '+board.map(col=>'|'+([' ','O','X'][col[row]||0])).join('')+'|');
   lines.push('   0 1 2 3 4 5 6');write(lines.join('\n'));
  };
  printBoard();let player=1;
  while(true){
   let col;
   if(player===2&&level>0){col=chooseMove(board,level,random);write('Player 2 chooses column '+col+'.');}
   else {
    while(true){
     const value=yield 'Player '+player+', enter a column number (0..6) > ';
     if(!/^[+-]?\d+$/.test(value.trim())){write('Please enter an integer column number.');continue;}
     col=Number(value);
     if(!openColumns(board).includes(col)){write('That column is not open.');continue;}
     break;
    }
   }
   drop(board,col,player);printBoard();
   if(winner(board,player)){write('Player '+player+' wins.');break;}
   if(!openColumns(board).length){write('The game is a draw.');break;}
   player=3-player;
  }
 }while((yield 'Do you want to play another game > ').trim().toLowerCase().startsWith('y'));
 write('Goodbye.');
}
const menu='Welcome to the CSC115 Midterm Project Program. This Python program displays Roman Numerals / Binary and Predict Population.\nEnter option 1 to display Student Information.\nEnter option 2 to display Roman Numerals and Binary.\nEnter option 3 to Predict the Population.\nEnter option 9 to Exit the program.';
function* number(prompt,retry,min,max){
 let value=yield prompt;
 while(!/^\d+$/.test(value)||!Number.isSafeInteger(Number(value))||Number(value)<min||Number(value)>max)value=yield retry;
 return Number(value);
}
export function* calculator(write){
 write('CSC 115 - FALL 2025 MIDTERM PROJECT\n'+'-'.repeat(130));write(menu);
 let choice=yield 'Enter your choice 1, 2, 3, or 9: ';
 while(choice!=='9'){
  write('');
  if(choice==='1')write('Student Name: Sebastian Rivas\nStudent Email: SJR492@miami.edu\nStudent Major: Computer Science\nCourse Name: CSC115 - Python Programming for Everyone.\nTerm: Fall 2025');
  else if(choice==='2'){
   const n=yield* number('Enter an integer between 1 - 10 only: ','Invalid Input. Please re-enter an integer between 1 - 10 only: ',1,10);
   const result=convert(n);write('Input Number: '+n+'\nRoman Numeral: '+result.roman+'\nBinary Value: '+result.binary);
  }else if(choice==='3'){
   const start=yield* number('Please input number of Starting Organisms: ','Invalid Input. Please re-enter the number of Starting Organisms: ',1,Number.MAX_SAFE_INTEGER);
   const rate=yield* number('Please input the Average Daily Increase input: ','Invalid Input. Please re-enter the Average Daily Increase input: ',1,100);
   const days=yield* number('Please input the Number of days to multiply input: ','Invalid Input. Please re-enter the Number of days to multiply: ',2,30);
   write('\nDay Approximate          Population\n'+population(start,rate,days).map(({day,value})=>day+' '.repeat(25)+value.toFixed(2)).join('\n'));
  }else{choice=yield 'User select option: '+choice+' which is an INVALID Option. Please re-enter: ';continue;}
  write(menu);choice=yield 'Enter your choice 1, 2, 3, or 9: ';
 }
}
