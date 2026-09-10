import {newBoard,drop,winner,openColumns,chooseMove} from './logic.mjs';
const boardElement=document.getElementById('board'),status=document.getElementById('status'),level=document.getElementById('level');
let board,player,finished,message;
const columns=Array.from({length:7},(_,col)=>{
 const button=document.createElement('button');button.type='button';button.className='column';
 button.addEventListener('click',()=>play(col));boardElement.append(button);return button;
});
function render(){
 columns.forEach((button,col)=>{
  button.replaceChildren();button.disabled=finished||board[col].length===6;
  const pieces=Array.from({length:6},(_,i)=>board[col][5-i]||0);
  button.setAttribute('aria-label','Column '+(col+1)+', top to bottom: '+pieces.map(p=>p===1?'O':p===2?'X':'empty').join(', '));
  for(const p of pieces){const cell=document.createElement('span');cell.className='cell p'+p;cell.textContent=p===1?'O':p===2?'X':'·';cell.setAttribute('aria-hidden','true');button.append(cell);}
  const label=document.createElement('span');label.textContent=col+1;label.setAttribute('aria-hidden','true');button.append(label);
 });status.textContent=message;
}
function move(col){
 if(!drop(board,col,player))return false;
 if(winner(board,player)){finished=true;message='Player '+player+' ('+(player===1?'O':'X')+') wins!';}
 else if(!openColumns(board).length){finished=true;message='The game is a draw.';}
 else {player=3-player;message='Player '+player+' ('+(player===1?'O':'X')+'), choose a column.';}
 return true;
}
function play(col){
 if(finished||!move(col))return;
 if(!finished&&player===2&&Number(level.value)>0){const ai=chooseMove(board,Number(level.value));move(ai);message='Computer played column '+(ai+1)+'. '+message;}
 render();
}
function reset(){board=newBoard();player=1;finished=false;message='Player 1 (O), choose a column.';render();}
document.getElementById('restart').addEventListener('click',reset);level.addEventListener('change',reset);reset();
