function toggleModal(){const modal=document.getElementById("modal");if(modal){modal.classList.toggle("hidden");modal.classList.toggle("flex")}const mobileMenu=document.getElementById("mobile-menu");if(mobileMenu){mobileMenu.classList.add("hidden");mobileMenu.classList.remove("flex")}}

document.addEventListener("DOMContentLoaded",function(){
  const sectionOrder=["home","about","attractions","partners","rtffam","rtfglobal"];
  const sections=sectionOrder.map(id=>document.getElementById(id)).filter(Boolean);
  const navLinks=document.querySelectorAll(".nav-link");
  const menuToggle=document.getElementById("menu-toggle");
  const mobileMenu=document.getElementById("mobile-menu");
  const prevBtn=document.getElementById("prev-page-button");
  const nextBtn=document.getElementById("next-page-button");
  let currentIndex=0;

  function closeMobileMenu(){if(mobileMenu){mobileMenu.classList.add("hidden");mobileMenu.classList.remove("flex")}}
  function playActiveVideo(section){const video=section.querySelector("video");if(video){video.play().catch(()=>{})}}
  function pauseHiddenVideos(activeSection){document.querySelectorAll(".page-section video").forEach(v=>{if(!activeSection.contains(v)&&!v.controls){try{v.pause()}catch(e){}}})}
  function updateArrows(){if(prevBtn)prevBtn.classList.toggle("hidden",currentIndex===0);if(nextBtn)nextBtn.classList.toggle("hidden",currentIndex===sections.length-1)}
  function updateActiveMenu(){const activeId=sections[currentIndex]?.id;navLinks.forEach(link=>{link.classList.remove("text-yellow-300");if(link.getAttribute("data-target")===activeId)link.classList.add("text-yellow-300")})}

  function showPage(index,updateURL=true){
    if(index<0||index>=sections.length)return;
    sections.forEach(sec=>{sec.classList.remove("active");sec.style.display="none";sec.style.opacity="0";sec.style.visibility="hidden"});
    currentIndex=index;
    const activeSection=sections[currentIndex];
    activeSection.style.display="flex";
    activeSection.style.opacity="1";
    activeSection.style.visibility="visible";
    activeSection.classList.add("active");
    if(updateURL&&window.location.hash!=="#"+activeSection.id){history.pushState(null,"","#"+activeSection.id)}
    window.scrollTo({top:0,behavior:"smooth"});
    updateArrows();updateActiveMenu();pauseHiddenVideos(activeSection);playActiveVideo(activeSection);
  }

  navLinks.forEach(link=>{link.addEventListener("click",function(e){const targetId=this.getAttribute("data-target");const index=sections.findIndex(sec=>sec.id===targetId);if(index!==-1){e.preventDefault();showPage(index)}closeMobileMenu()})});
  if(prevBtn)prevBtn.addEventListener("click",()=>showPage(currentIndex-1));
  if(nextBtn)nextBtn.addEventListener("click",()=>showPage(currentIndex+1));
  if(menuToggle&&mobileMenu){menuToggle.addEventListener("click",function(){mobileMenu.classList.toggle("hidden");mobileMenu.classList.toggle("flex")})}

  const partnerSearch=document.getElementById("partnerSearch");
  const partnerRows=document.querySelectorAll("#partnersTable tbody tr");
  if(partnerSearch&&partnerRows.length>0){partnerSearch.addEventListener("input",function(){const value=this.value.trim().toLowerCase();partnerRows.forEach(row=>{row.style.display=row.innerText.toLowerCase().includes(value)?"":"none"})})}

  const partnerLogos=["images/logos/logo1.png","images/logos/logo2.png","images/logos/logo3.png","images/logos/logo4.png","images/logos/logo5.png","images/logos/logo6.png","images/logos/logo7.png","images/logos/logo8.png"];
  function loadSideLogos(containerId){const container=document.getElementById(containerId);if(!container)return;container.innerHTML="";[...partnerLogos,...partnerLogos].forEach(src=>{const img=document.createElement("img");img.src=src;img.alt="Partner Logo";img.loading="lazy";container.appendChild(img)})}
  loadSideLogos("leftLogos");loadSideLogos("rightLogos");

  window.addEventListener("keydown",function(e){if(e.key==="ArrowLeft")showPage(currentIndex-1);if(e.key==="ArrowRight")showPage(currentIndex+1);if(e.key==="Escape"){const modal=document.getElementById("modal");if(modal&&!modal.classList.contains("hidden"))toggleModal();closeMobileMenu()}});
  window.addEventListener("popstate",function(){const hash=window.location.hash.replace("#","");const index=sections.findIndex(sec=>sec.id===hash);if(index!==-1)showPage(index,false)});
  const initialHash=window.location.hash.replace("#","");const initialIndex=sections.findIndex(sec=>sec.id===initialHash);showPage(initialIndex!==-1?initialIndex:0,false);
});
