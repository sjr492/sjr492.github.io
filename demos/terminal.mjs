export function mountConsole(program){
 const log=document.getElementById('transcript'),form=document.getElementById('console-input'),input=document.getElementById('command'),prompt=document.getElementById('prompt'),state=document.getElementById('state');
 let session;
 function write(text){const line=document.createElement('div');line.textContent=text;log.append(line);}
 function advance(value){
  const next=session.next(value);
  form.hidden=next.done;
  prompt.textContent=next.done?'':next.value;
  state.textContent=next.done?'Program exited. Select Restart to run again.':'';
  log.scrollTop=log.scrollHeight;
 }
 function restart(focus){log.replaceChildren();input.value='';session=program(write);advance();if(focus)input.focus();}
 form.addEventListener('submit',event=>{event.preventDefault();const value=input.value;write(prompt.textContent+value);input.value='';advance(value);if(!form.hidden)input.focus();else document.getElementById('restart').focus();});
 document.getElementById('restart').addEventListener('click',()=>restart(true));restart(false);document.getElementById('restart').disabled=false;
}
