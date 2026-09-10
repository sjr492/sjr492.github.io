// Browser adaptations of the original coursework algorithms.
export const newBoard = () => Array.from({length:7},()=>[]);
export function drop(board,column,player){
 if(!Number.isInteger(column)||column<0||column>6||board[column].length>=6||![1,2].includes(player)) return false;
 board[column].push(player);return true;
}
export function winner(board,player){
 for(let c=0;c<7;c++)for(let r=0;r<6;r++)for(const [dc,dr] of [[1,0],[0,1],[1,1],[1,-1]]){
  if(Array.from({length:4},(_,k)=>board[c+k*dc]?.[r+k*dr]===player).every(Boolean))return true;
 }return false;
}
export const openColumns=board=>board.map((col,i)=>col.length<6?i:-1).filter(i=>i>=0);
export function chooseMove(board,level,random=Math.random){
 const open=openColumns(board);
 if(level>=2)for(const player of (level>=3?[2,1]:[2]))for(const col of open){
  const copy=board.map(c=>c.slice());drop(copy,col,player);if(winner(copy,player))return col;
 }
 return open.length?open[Math.floor(random()*open.length)]:-1;
}
export function convert(value){
 if(!Number.isInteger(value)||value<1||value>10)throw new Error('Enter a whole number from 1 to 10.');
 return {roman:['I','II','III','IV','V','VI','VII','VIII','IX','X'][value-1],binary:value.toString(2)};
}
export function population(start,rate,days){
 if(!Number.isSafeInteger(start)||start<1)throw new Error('Starting population must be a positive whole number no greater than 9,007,199,254,740,991.');
 if(!Number.isInteger(rate)||rate<1||rate>100)throw new Error('Daily increase must be a whole number from 1 to 100.');
 if(!Number.isInteger(days)||days<2||days>30)throw new Error('Days must be a whole number from 2 to 30.');
 const rows=[];let value=start;
 for(let day=1;day<=days;day++){rows.push({day,value});value*=1+rate/100;}return rows;
}
