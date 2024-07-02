// TypeIt by Alex MacArthur - https://typeitjs.com
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).TypeIt=t()}(this,(function(){"use strict";var e=e=>Array.isArray(e),t=t=>e(t)?t:[t];var n=e=>Array.from(e),r=e=>document.createTextNode(e);let i=e=>([...e.childNodes].forEach((e=>{if(e.nodeValue)return[...e.nodeValue].forEach((t=>{e.parentNode.insertBefore(r(t),e)})),void e.remove();i(e)})),e);var a=e=>{let t=document.implementation.createHTMLDocument();return t.body.innerHTML=e,i(t.body)};const l="ti-cursor",s={started:!1,completed:!1,frozen:!1,destroyed:!1},o={breakLines:!0,cursor:!0,cursorChar:"|",cursorSpeed:1e3,deleteSpeed:null,html:!0,lifeLike:!0,loop:!1,loopDelay:750,nextStringDelay:750,speed:100,startDelay:250,startDelete:!1,strings:[],waitUntilVisible:!1,beforeString:()=>{},afterString:()=>{},beforeStep:()=>{},afterStep:()=>{},afterComplete:()=>{}};function u(e,t=!1,n=!1){let r,i=e.querySelector(".ti-cursor"),a=document.createTreeWalker(e,NodeFilter.SHOW_ALL,{acceptNode:e=>{var t,r;if(i&&n){if(null==(t=e.classList)?void 0:t.contains(l))return NodeFilter.FILTER_ACCEPT;if(i.contains(e))return NodeFilter.FILTER_REJECT}return(null==(r=e.classList)?void 0:r.contains(l))?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),s=[];for(;r=a.nextNode();)r.originalParent||(r.originalParent=r.parentNode),s.push(r);return t?s.reverse():s}function d(e,t=!0){return t?u(a(e)):n(e).map(r)}var c=e=>document.createElement(e),f=(e,t="")=>{let n=c("style");n.id=t,n.appendChild(r(e)),document.head.appendChild(n)},h=t=>(e(t)||(t=[t/2,t/2]),t),y=(e,t)=>Math.abs(Math.random()*(e+t-(e-t))+(e-t));let p=e=>e/2;var m=e=>"value"in e;let g=e=>"function"==typeof e?e():e;var b=e=>Number.isInteger(e);let v=(e,t=document,n=!1)=>t["querySelector"+(n?"All":"")](e);var w=(e,t)=>Object.assign({},e,t);let T={"font-family":"","font-weight":"","font-size":"","font-style":"","line-height":"",color:"",transform:"translateX(-.125em)"};var E=(e,t)=>new Array(t).fill(e);const S=({queueItems:e,selector:t,cursorPosition:n,to:r})=>{if(b(t))return-1*t;let i=new RegExp("END","i").test(r),a=t?[...e].reverse().findIndex((({char:e})=>{let n=e.parentElement,r=n.matches(t);return!(!i||!r)||r&&n.firstChild.isSameNode(e)})):-1;return a<0&&(a=i?0:e.length-1),a-n+(i?0:1)};let N=e=>new Promise((t=>{requestAnimationFrame((async()=>{t(await e())}))})),C=e=>null==e?void 0:e.getAnimations().find((t=>t.id===e.dataset.tiAnimationId));const L={iterations:1/0,easing:"steps(2, start)",fill:"forwards"},I=[0,0,1].map((e=>({opacity:e})));let M=({cursor:e,frames:t=null,timingOptions:n={}})=>{let r=e.animate(t||I,{...L,...n});return r.pause(),r.id=e.dataset.tiAnimationId,N((()=>{N((()=>{r.play()}))})),r},x=e=>{var t;return null==(t=e.func)?void 0:t.call(globalThis)},P=async({index:e,queueItems:t,wait:n,cursor:r})=>{let i=t[e][1],a=[],l=e,s=i,o=()=>s&&!s.delay;for(;o();)a.push(s),o()&&l++,s=t[l]?t[l][1]:null;if(a.length)return await N((async()=>{for(let e of a)await x(e)})),l-1;let{frames:u,timingOptions:d}=await(async()=>{let e=C(r),t={},a=null;return e&&(t=r?{...e.effect.getComputedTiming(),delay:i.shouldPauseCursor()?500:0}:{},a=r?e.effect.getKeyframes():[]),await n((async()=>{e&&i.shouldPauseCursor()&&e.cancel(),await N((()=>{x(i)}))}),i.delay),{frames:a,timingOptions:t}})();return await(({cursor:e,frames:t,timingOptions:n})=>{if(!e)return;let r,i=C(e);i&&(n.delay=i.effect.getComputedTiming().delay,r=i.currentTime,i.cancel());let a=M({cursor:e,frames:t,timingOptions:n});return r&&(a.currentTime=r),a})({cursor:r,frames:u,timingOptions:d}),e};return function(e,r={}){let N=async(e,t,n=!1)=>{X.frozen&&await new Promise((e=>{this.unfreeze=()=>{X.frozen=!1,e()}})),n||await K.beforeStep(this),await((e,t,n)=>new Promise((r=>{n.push(setTimeout((async()=>{await e(),r()}),t||0))})))(e,t,J),n||await K.afterStep(this)},C=(e,t)=>P({index:e,queueItems:t,wait:N,cursor:ee}),L=e=>((e,t)=>{if(!e)return;let n=e.parentNode;(n.childNodes.length>1||n.isSameNode(t)?e:n).remove()})(e,j),I=()=>m(j),x=(e=0)=>function(e){let{speed:t,deleteSpeed:n,lifeLike:r}=e;return n=null!==n?n:t/3,r?[y(t,p(t)),y(n,p(n))]:[t,n]}(K)[e],A=()=>(e=>m(e)?n(e.value):u(e,!0).filter((e=>!(e.childNodes.length>0))))(j),D=(e,t)=>(Y.add(e),((e={})=>{let t=e.delay;t&&Y.add({delay:t})})(t),this),O=()=>null!=W?W:U,H=(e={})=>[{func:()=>B(e)},{func:()=>B(K)}],F=e=>{let t=K.nextStringDelay;Y.add([{delay:t[0]},...e,{delay:t[1]}])},k=async()=>{!I()&&ee&&j.appendChild(ee),Z&&(((e,t)=>{let n=`[data-typeit-id='${e}'] .ti-cursor`,r=getComputedStyle(t),i=Object.entries(T).reduce(((e,[t,n])=>`${e} ${t}: var(--ti-cursor-${t}, ${n||r[t]});`),"");f(`${n} { display: inline-block; width: 0; ${i} }`,e)})(G,j),ee.dataset.tiAnimationId=G,M({cursor:ee,timingOptions:{duration:K.cursorSpeed}}))},R=()=>{let e=K.strings.filter((e=>!!e));e.forEach(((t,n)=>{if(this.type(t),n+1===e.length)return;let r=K.breakLines?[{func:()=>z(c("BR")),typeable:!0}]:E({func:V,delay:x(1)},Y.getTypeable().length);F(r)}))},$=async(e=!0)=>{X.started=!0;let t=t=>{Y.done(t,!e)};try{let n=[...Y.getQueue()];for(let e=0;e<n.length;e++){let[r,i]=n[e];if(!i.done){if(!i.deletable||i.deletable&&A().length){let r=await C(e,n);Array(r-e).fill(e+1).map(((e,t)=>e+t)).forEach((e=>{let[r]=n[e];t(r)})),e=r}t(r)}}if(!e)return this;if(X.completed=!0,await K.afterComplete(this),!K.loop)throw"";let r=K.loopDelay;N((async()=>{await(async e=>{let t=O();t&&await q({value:t});let n=A().map((e=>[Symbol(),{func:V,delay:x(1),deletable:!0,shouldPauseCursor:()=>!0}]));for(let r=0;r<n.length;r++)await C(r,n);Y.reset(),Y.set(0,{delay:e})})(r[0]),$()}),r[1])}catch(n){}return this},q=async e=>{var t,n,r;t=e,n=U,r=A(),U=Math.min(Math.max(n+t,0),r.length),((e,t,n)=>{let r=t[n-1],i=v(".ti-cursor",e);(e=(null==r?void 0:r.parentNode)||e).insertBefore(i,r||null)})(j,A(),U)},z=e=>((e,t)=>{if(m(e))return void(e.value=`${e.value}${t.textContent}`);t.innerHTML="";let n=(r=t.originalParent,/body/i.test(null==r?void 0:r.tagName)?e:t.originalParent||e);var r;n.insertBefore(t,v(".ti-cursor",n)||null)})(j,e),B=async e=>K=w(K,e),_=async()=>{I()?j.value="":A().forEach(L)},V=()=>{let e=A();e.length&&(I()?j.value=j.value.slice(0,-1):L(e[U]))};this.break=function(e){return D({func:()=>z(c("BR")),typeable:!0},e)},this.delete=function(e=null,t={}){e=g(e);let n=H(t),r=e,{instant:i,to:a}=t,l=Y.getTypeable(),s=null===r?l.length:b(r)?r:S({queueItems:l,selector:r,cursorPosition:O(),to:a});return D([n[0],...E({func:V,delay:i?0:x(1),deletable:!0},s),n[1]],t)},this.empty=function(e={}){return D({func:_},e)},this.exec=function(e,t={}){let n=H(t);return D([n[0],{func:()=>e(this)},n[1]],t)},this.move=function(e,t={}){e=g(e);let n=H(t),{instant:r,to:i}=t,a=S({queueItems:Y.getTypeable(),selector:null===e?"":e,to:i,cursorPosition:O()}),l=a<0?-1:1;return W=O()+a,D([n[0],...E({func:()=>q(l),delay:r?0:x(),cursorable:!0},Math.abs(a)),n[1]],t)},this.options=function(e,t={}){return e=g(e),B(e),D({},t)},this.pause=function(e,t={}){return D({delay:g(e)},t)},this.type=function(e,t={}){e=g(e);let{instant:n}=t,r=H(t),i=d(e,K.html).map((e=>{return{func:()=>z(e),char:e,delay:n||(t=e,/<(.+)>(.*?)<\/(.+)>/.test(t.outerHTML))?0:x(),typeable:e.nodeType===Node.TEXT_NODE};var t})),a=[r[0],{func:async()=>await K.beforeString(e,this)},...i,{func:async()=>await K.afterString(e,this)},r[1]];return D(a,t)},this.is=function(e){return X[e]},this.destroy=function(e=!0){J.forEach(clearTimeout),J=[],g(e)&&ee&&L(ee),X.destroyed=!0},this.freeze=function(){X.frozen=!0},this.unfreeze=()=>{},this.reset=function(e){!this.is("destroyed")&&this.destroy(),e?(Y.wipe(),e(this)):Y.reset(),U=0;for(let t in X)X[t]=!1;return j[I()?"value":"innerHTML"]="",this},this.go=function(){return X.started?this:(k(),K.waitUntilVisible?(((e,t)=>{new IntersectionObserver(((n,r)=>{n.forEach((n=>{n.isIntersecting&&(t(),r.unobserve(e))}))}),{threshold:1}).observe(e)})(j,$.bind(this)),this):($(),this))},this.flush=function(e=(()=>{})){return k(),$(!1).then(e),this},this.getQueue=()=>Y,this.getOptions=()=>K,this.updateOptions=e=>B(e),this.getElement=()=>j;let j="string"==typeof(Q=e)?v(Q):Q;var Q;let J=[],U=0,W=null,X=w({},s),K=w(o,r);K=w(K,{html:!I()&&K.html,nextStringDelay:h(K.nextStringDelay),loopDelay:h(K.loopDelay)});let G=Math.random().toString().substring(2,9),Y=function(e){let n=function(e){return t(e).forEach((e=>{var t;return a.set(Symbol(null==(t=e.char)?void 0:t.innerText),r({...e}))})),this},r=e=>(e.shouldPauseCursor=function(){return Boolean(this.typeable||this.cursorable||this.deletable)},e),i=()=>Array.from(a.values()),a=new Map;return n(e),{add:n,set:function(e,t){let n=[...a.keys()];a.set(n[e],r(t))},wipe:function(){a=new Map,n(e)},reset:function(){a.forEach((e=>delete e.done))},destroy:e=>a.delete(e),done:(e,t=!1)=>t?a.delete(e):a.get(e).done=!0,getItems:(e=!1)=>e?i():i().filter((e=>!e.done)),getQueue:()=>a,getTypeable:()=>i().filter((e=>e.typeable))}}([{func:()=>{},delay:K.startDelay}]);j.dataset.typeitId=G,f("[data-typeit-id]:before {content: '.'; display: inline-block; width: 0; visibility: hidden;}");let Z=K.cursor&&!I(),ee=(()=>{if(I())return;let e=c("span");return e.className=l,Z?(e.innerHTML=a(K.cursorChar).innerHTML,e):(e.style.visibility="hidden",e)})();K.strings=(e=>{let t=j.innerHTML;return t?(j.innerHTML="",K.startDelete?(j.innerHTML=t,i(j),F(E({func:V,delay:x(1),deletable:!0},A().length)),e):t.replace(/<!--(.+?)-->/g,"").trim().split(/<br(?:\s*?)(?:\/)?>/).concat(e)):e})(t(K.strings)),K.strings.length&&R()}}));
