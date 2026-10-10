// Rajasthan Travel Fair: navigation, feedback, search and modals
function toggleModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.style.display = getComputedStyle(modal).display === 'none' ? 'flex' : 'none';
  const menu = document.getElementById('mobile-menu');
  if (menu) { menu.classList.add('hidden'); menu.classList.remove('flex'); }
}
const LEGAL_CONTENT = {
  privacy: {title:'Privacy Policy',body:'<p>Privacy Policy content will be updated soon. For queries, contact info@rajasthantravelfair.com.</p>'},
  terms: {title:'Terms & Conditions',body:'<p>Terms &amp; Conditions content will be updated soon. For queries, contact info@rajasthantravelfair.com.</p>'}
};
function showLegalModal(type,e) {
  if(e) e.preventDefault();
  const modal=document.getElementById('legalModal'), data=LEGAL_CONTENT[type];
  if(!modal||!data)return;
  const title=document.getElementById('legalModalTitle'),body=document.getElementById('legalModalBody');
  if(title)title.textContent=data.title;
  if(body)body.innerHTML=data.body;
  modal.style.display='flex';
}
function closeLegalModal(){const m=document.getElementById('legalModal');if(m)m.style.display='none';}
document.addEventListener('DOMContentLoaded',function(){
  // AUGUST MEMORIES: progressive loading, gentle continuous scroll.
  (function () {
    const track = document.getElementById('augustMemoriesTrack');
    if (!track) return;
    track.querySelectorAll('.august-gallery-duplicate').forEach(el => el.remove());
    const cards = Array.from(track.querySelectorAll('.august-memory-card'));
    const empty = document.getElementById('augustMemoriesEmpty');
    if (!cards.length) {
      if (empty) empty.hidden = false;
      return;
    }

    let failed = 0;
    cards.forEach((card, index) => {
      const img = card.querySelector('img');
      if (!img) return;
      img.loading = index < 10 ? 'eager' : 'lazy';
      img.decoding = 'async';
      if (index < 3) img.fetchPriority = 'high';
      const onError = () => {
        if (card.dataset.broken) return;
        card.dataset.broken = 'true';
        card.style.display = 'none';
        failed++;
        console.warn('August photo not available:', img.currentSrc || img.src);
        if (failed === cards.length && empty) empty.hidden = false;
      };
      img.addEventListener('error', onError, { once: true });
      if (img.complete && img.naturalWidth === 0) onError();
    });

    // Clone the original sequence once. Do not block on hundreds of downloads.
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.add('august-gallery-duplicate');
      clone.setAttribute('aria-hidden', 'true');
      clone.tabIndex = -1;
      const img = clone.querySelector('img');
      if (img) {
        img.loading = 'lazy';
        img.decoding = 'async';
        img.addEventListener('error', () => {
          clone.style.display = 'none';
        }, { once: true });
      }
      track.appendChild(clone);
    });
  })();


  document.querySelectorAll('.feedback-track').forEach(function(track){
    track.querySelectorAll('.feedback-clone').forEach(n=>n.remove());
    Array.from(track.querySelectorAll('.feedback-card-item')).forEach(function(card){
      const clone=card.cloneNode(true);clone.classList.add('feedback-clone');track.appendChild(clone);
    });
    track.style.animation='none';void track.offsetHeight;
    track.style.animation='scrollFeedback 180s linear infinite';
  });
  const sectionOrder=['home','about','attractions','rtffam','rtffamaugust'];
  const sections=sectionOrder.map(id=>document.getElementById(id)).filter(Boolean);
  const container=document.getElementById('page-container');
  if(container)sections.forEach(section=>container.appendChild(section));
  const menuToggle=document.getElementById('menu-toggle'),mobileMenu=document.getElementById('mobile-menu');
  const prev=document.getElementById('prev-page-button'),next=document.getElementById('next-page-button');
  let currentIndex=0;
  function showPage(index,updateUrl=true){
    if(index<0||index>=sections.length)return;
    sections.forEach(function(section){
      section.classList.remove('active');section.style.display='none';section.style.opacity='0';section.style.visibility='hidden';
      section.querySelectorAll('video').forEach(video=>{try{video.pause();}catch(e){}});
    });
    currentIndex=index;const active=sections[index];
    active.style.display='flex';active.style.opacity='1';active.style.visibility='visible';active.classList.add('active');
    active.querySelectorAll('video[autoplay],video.bg-video,video.about-bg-video').forEach(video=>{video.muted=true;video.play().catch(()=>{});});
    if(updateUrl)history.pushState(null,'','#'+active.id);
    window.scrollTo({top:0,behavior:'smooth'});
    if(prev)prev.classList.toggle('hidden',currentIndex===0);
    if(next)next.classList.toggle('hidden',currentIndex===sections.length-1);
    document.querySelectorAll('.nav-link').forEach(link=>link.classList.toggle('text-yellow-300',link.dataset.target===active.id));
  }
  document.addEventListener('click',function(e){
    const link=e.target.closest('.nav-link');if(!link)return;
    const id=link.dataset.target;if(!id)return;
    const idx=sections.findIndex(s=>s.id===id);
    if(idx===-1){if(id==='rtfglobal'){e.preventDefault();showPage(0);}return;}
    e.preventDefault();showPage(idx);
    if(mobileMenu){mobileMenu.classList.add('hidden');mobileMenu.classList.remove('flex');}
  });
  if(prev)prev.addEventListener('click',()=>showPage(currentIndex-1));
  if(next)next.addEventListener('click',()=>showPage(currentIndex+1));
  if(menuToggle&&mobileMenu)menuToggle.addEventListener('click',()=>{mobileMenu.classList.toggle('hidden');mobileMenu.classList.toggle('flex');});
  document.querySelectorAll('.participants-search').forEach(box=>box.addEventListener('input',function(){
    const panel=this.closest('.fam-panel'),tbody=panel&&panel.querySelector('.participants-table tbody');if(!tbody)return;
    const value=this.value.toLowerCase().trim();tbody.querySelectorAll('tr').forEach(row=>row.style.display=row.textContent.toLowerCase().includes(value)?'':'none');
  }));
  const reg=document.getElementById('modal'),legal=document.getElementById('legalModal');
  if(reg)reg.addEventListener('click',e=>{if(e.target===reg)reg.style.display='none';});
  if(legal)legal.addEventListener('click',e=>{if(e.target===legal)closeLegalModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(reg)reg.style.display='none';closeLegalModal();}});
  function handleLocation(){
    let hash=location.hash.slice(1);if(hash==='partners')hash='rtffam';
    const idx=sections.findIndex(s=>s.id===hash);
    if(idx<0&&hash){history.replaceState(null,'','#home');}
    showPage(idx>=0?idx:0,false);
  }
  window.addEventListener('popstate',handleLocation);
  window.addEventListener('hashchange',handleLocation);
  handleLocation();
});
