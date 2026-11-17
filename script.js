'use strict';
const places=window.SARAFOVO_PLACES||[];
const labels={all:'All places',beach:'Beaches',outdoors:'Outdoors',culture:'Culture',transport:'Transport',daytrip:'Day trips'};
const $=id=>document.getElementById(id),grid=$('placesGrid'),filters=$('filters'),search=$('searchInput'),dialog=$('placeDialog');
let category='all',onlySaved=false,saved=new Set();
try{const p=JSON.parse(localStorage.getItem('visit-sarafovo-saved')||'[]');if(Array.isArray(p))saved=new Set(p.filter(x=>typeof x==='string'))}catch(e){}
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function saveState(){try{localStorage.setItem('visit-sarafovo-saved',JSON.stringify([...saved]))}catch(e){}$('savedCount').textContent=saved.size}
function matches(){const q=search.value.toLocaleLowerCase().trim();return places.filter(p=>(!onlySaved||saved.has(p.id))&&(onlySaved||category==='all'||p.category===category)&&[p.name,p.tagline,p.area,p.description,labels[p.category]].join(' ').toLocaleLowerCase().includes(q))}
function render(){
 const list=matches();$('resultCount').textContent=list.length+' '+(list.length===1?'place':'places')+(onlySaved?' saved':' to discover');$('emptyState').classList.toggle('hidden',list.length>0);
 filters.innerHTML=Object.entries(labels).map(([k,v])=>'<button type="button" class="filter '+(k===category&&!onlySaved?'active':'')+'" data-category="'+k+'" aria-pressed="'+(k===category&&!onlySaved)+'">'+v+'</button>').join('');
 grid.innerHTML=list.map(p=>'<article class="place-card"><div class="place-art tone-'+esc(p.tone)+'"><span class="art-emoji" aria-hidden="true">'+esc(p.emoji)+'</span><button class="favorite '+(saved.has(p.id)?'is-saved':'')+'" type="button" data-save="'+esc(p.id)+'" aria-label="'+(saved.has(p.id)?'Remove':'Save')+' '+esc(p.name)+'" aria-pressed="'+saved.has(p.id)+'">'+(saved.has(p.id)?'♥':'♡')+'</button></div><div class="place-info"><span class="place-tag">'+esc(p.area)+' · '+esc(labels[p.category])+'</span><h3>'+esc(p.name)+'</h3><p>'+esc(p.tagline)+'</p><button class="card-more" type="button" data-details="'+esc(p.id)+'">Discover place <span aria-hidden="true">↗</span></button></div></article>').join('')
}
function details(id){
const p=places.find(x=>x.id===id);if(!p)return;const url='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.mapQuery);
$('dialogContent').innerHTML='<div class="dialog-art tone-'+esc(p.tone)+'"><span aria-hidden="true">'+esc(p.emoji)+'</span></div><div class="dialog-body"><span class="place-tag">'+esc(p.area)+' · '+esc(labels[p.category])+'</span><h2 id="dialogTitle">'+esc(p.name)+'</h2><p>'+esc(p.description)+'</p><div class="dialog-tip"><strong>Local note:</strong> '+esc(p.tip)+'</div><div class="dialog-actions"><a class="button button-primary" href="'+url+'" target="_blank" rel="noopener noreferrer">Open map ↗</a><button class="button" type="button" data-dialog-save="'+esc(p.id)+'">'+(saved.has(p.id)?'♥ Remove saved':'♡ Save this place')+'</button></div></div>';
if(!dialog.open)dialog.showModal()
}
function toggle(id){saved.has(id)?saved.delete(id):saved.add(id);saveState();render();if(dialog.open)details(id)}
filters.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b){category=b.dataset.category;onlySaved=false;render()}});
search.addEventListener('input',render);
grid.addEventListener('click',e=>{const b=e.target.closest('[data-save]');if(b)return toggle(b.dataset.save);const d=e.target.closest('[data-details]');if(d)details(d.dataset.details)});
dialog.addEventListener('click',e=>{const b=e.target.closest('[data-dialog-save]');if(b)toggle(b.dataset.dialogSave);if(e.target===dialog)dialog.close()});
$('closeDialog').addEventListener('click',()=>dialog.close());
$('resetFilters').addEventListener('click',()=>{search.value='';category='all';onlySaved=false;render()});
function closeNav(){$('nav').classList.remove('open');$('mobileToggle').setAttribute('aria-expanded','false')}
$('navSaved').addEventListener('click',()=>{onlySaved=!onlySaved;category='all';search.value='';render();$('explore').scrollIntoView({behavior:'smooth'});closeNav()});
$('mobileToggle').addEventListener('click',()=>{const b=$('nav').classList.toggle('open');$('mobileToggle').setAttribute('aria-expanded',String(b))});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',closeNav));
$('year').textContent=new Date().getFullYear();saveState();render();