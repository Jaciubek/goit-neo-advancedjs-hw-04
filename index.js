import{S,i as y}from"./assets/vendor-BrddEoy-.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const v="28421510-bfe8297e886d2caaf1b8bcf7e";function m(s,t=1,l=15){const o=new URLSearchParams({key:v,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:l});return fetch(`https://pixabay.com/api/?${o.toString()}`).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()})}let f;function h(s,t=!1){const l=s.map(({tags:o,webformatURL:e,largeImageURL:r,likes:a,views:g,comments:b,downloads:L})=>`
      <li class="gallery-card">
        <a class="gallery-link" href="${r}">
            <img class="gallery-img" src="${e}" alt="${o}" />
            <div class="values-container">
                <ul class="labels">
                    <li>Likes</li>
                    <li>${a}</li>
                </ul>
                <ul class="labels">
                    <li>Views</li>
                    <li>${g}</li>
                </ul>
                <ul class="labels">
                    <li>Comments</li>
                    <li>${b}</li>
                </ul>
                <ul class="labels">
                    <li>Downloads</li>
                    <li>${L}</li>
                </ul>
            </div>
        </a>
      </li>`).join("");w(l,t)}function w(s,t){const l=document.querySelector("ul.images-div");t?l.insertAdjacentHTML("beforeend",s):l.innerHTML=s,f?f.refresh():f=new S(".images-div a",{captionsData:"alt",captionDelay:250})}const P=document.querySelector("button[type=submit]"),p=document.querySelector(".images-div"),u=document.querySelector(".loaderClass"),n=document.createElement("button");n.textContent="Load more";n.style.display="none";n.classList.add("load-more");p.insertAdjacentElement("afterend",n);let i="",c=1;const d=15;P.addEventListener("click",q);n.addEventListener("click",M);function q(s){s.preventDefault();const t=document.querySelector('input[name="search"]'),l=document.querySelector(".not-found-img");if(i=t.value.trim(),c=1,i===""){y.show({title:"❌",message:"Sorry, there are no images matching your search query. Please try again!",color:"ef4040"});return}p.innerHTML="",l.innerHTML="",u.style.display="flex",n.style.display="none",m(i,c,d).then(o=>{if(o.totalHits===0){l.innerHTML=`Results for query <span>${i}</span> not found!`,y.show({title:"❌",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#ef4040",messageColor:"white"});return}h(o.hits),o.totalHits>d&&(n.style.display="block")}).catch(console.error).finally(()=>{u.style.display="none"}),t.value=""}function M(){c+=1,u.style.display="flex",n.style.display="none",m(i,c,d).then(s=>{h(s.hits,!0);const t=Math.ceil(s.totalHits/d);c>=t?(n.style.display="none",y.show({title:"ℹ️",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#4E75FF",messageColor:"white"})):n.style.display="block"}).catch(console.error).finally(()=>{u.style.display="none"})}
//# sourceMappingURL=index.js.map
