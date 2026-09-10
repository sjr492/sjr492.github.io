import {convert,population} from './logic.mjs';
const get=id=>document.getElementById(id);
get('convert').addEventListener('submit',event=>{
 event.preventDefault();const out=get('conversion');
 try{const result=convert(get('number').valueAsNumber);out.className='';out.textContent='Roman: '+result.roman+' · Binary: '+result.binary;}
 catch(error){out.className='error';out.textContent=error.message;}
});
get('population').addEventListener('submit',event=>{
 event.preventDefault();const status=get('population-status');get('results').replaceChildren();
 try{
 const rows=population(get('start').valueAsNumber,get('rate').valueAsNumber,get('days').valueAsNumber);
 const table=document.createElement('table');const caption=document.createElement('caption');caption.textContent='Daily population projection';table.append(caption);
 const thead=document.createElement('thead');const header=document.createElement('tr');
 for(const name of ['Day','Approximate population']){const th=document.createElement('th');th.scope='col';th.textContent=name;header.append(th);}thead.append(header);table.append(thead);
 const tbody=document.createElement('tbody');for(const {day,value} of rows){const tr=document.createElement('tr');for(const text of [String(day),value.toFixed(2)]){const td=document.createElement('td');td.textContent=text;tr.append(td);}tbody.append(tr);}
 table.append(tbody);get('results').append(table);status.className='';status.textContent='Calculated '+rows.length+' days.';
 }catch(error){status.className='error';status.textContent=error.message;}
});
