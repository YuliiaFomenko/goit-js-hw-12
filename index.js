import{a as y,S as p,i as n}from"./assets/vendor-BDaiwwc1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const L="49021179-e432bb9a2ad6e70ca9f1cd413",b="https://pixabay.com/api/";async function g(r,t=20){try{return(await y.get(b,{params:{key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:40}})).data}catch(o){return console.error("Error fetching images:",o),[]}}const h=document.querySelector(".gallery");function f(r,t=!1){const o=r.map(e=>`<a href="${e.largeImageURL}" class="gallery-item">
                <img src="${e.webformatURL}" alt="${e.tags}">
                <div class="info">
                    <p><b>Likes:</b> ${e.likes}</p>
                    <p><b>Views:</b> ${e.views}</p>
                    <p><b>Comments:</b> ${e.comments}</p>
                    <p><b>Downloads:</b> ${e.downloads}</p>
                </div>
            </a>`).join("");t?h.insertAdjacentHTML("beforeend",o):h.innerHTML=o,new p(".gallery a").refresh()}const w=document.querySelector(".search-form"),S=document.querySelector(".gallery"),a=document.querySelector(".loader"),i=document.querySelector(".load-more-button"),m=document.querySelector(".end-message");let d="",c=1;w.addEventListener("submit",async r=>{if(r.preventDefault(),d=r.target.elements[0].value.trim(),!d){n.warning({message:"Please enter a search query!"});return}S.innerHTML="",a.classList.remove("hidden"),i.classList.add("hidden"),m.classList.add("hidden");try{const t=await g(d,c);if(a.classList.add("hidden"),t.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}f(t.hits),t.totalHits>40&&i.classList.remove("hidden"),t.totalHits<=c*40&&(i.classList.add("hidden"),m.classList.remove("hidden"))}catch{a.classList.add("hidden"),n.error({message:"Something went wrong. Please try again."})}});i.addEventListener("click",async()=>{c+=1,a.classList.remove("hidden");try{const r=await g(d,c);if(a.classList.add("hidden"),r.hits.length===0){n.error({message:"Sorry, there are no more images matching your search query."});return}f(r.hits,!0);const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"}),r.totalHits<=c*40&&(i.classList.add("hidden"),m.classList.remove("hidden"))}catch{a.classList.add("hidden"),n.error({message:"Something went wrong. Please try again."})}});
//# sourceMappingURL=index.js.map
