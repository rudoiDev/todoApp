class t{constructor(t){this.description=t}createCart(){return`<li class="ul_text animate__animated animate__bounceIn">\n\t\t\t\t<div class="ul_description">${this.description}</div>\n\t\t\t\t<div class="li_buttons">\n\t\t\t\t\t<button class="li_buttons__finish button_style"> \n\t\t\t\t\t\tГотово\n\t\t\t\t\t</button>\n\t\t\t\t\t<button class="li_buttons_delete button_style">\n\t\t\t\t\t\tУдалить\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</li>`}showPrevent(){let t=document.querySelector(".ul_inform"),e=document.querySelector(".btn_clear");document.querySelector(".ul_text")?(t.style.display="none",e.style.display="block"):(t.style.display="block",e.style.display="none")}addCarts(){l.insertAdjacentHTML("afterbegin",this.createCart()),e.value="",this.showPrevent()}}let e=document.querySelector(".input_text"),l=(document.getElementById("input_submit"),document.querySelector(".ul_list")),n=[];function o(){localStorage.setItem("cart",JSON.stringify(n))}function s(){let e=localStorage.getItem("cart"),l=JSON.parse(e),o=document.querySelector(".ul_spinner");if(null!=e){document.querySelector(".ul_inform").style.display="none",o.style.display="block",setTimeout((()=>{o.style.display="none";for(let e=0;e<l.length;e++){n.push(l[e]),new t(l[e].text).addCarts()}for(let t=0;t<n.length;t++)1==n[t].complete&&document.querySelectorAll(".ul_text").forEach((e=>{e.children[0].textContent.trim()==n[t].text&&(e.classList.add("active_task"),e.children[1].children[0].classList.add("active_button-complete"))}))}),1e3)}}(new t).showPrevent(),s(),l.addEventListener("click",(e=>{if(e.target.matches(".li_buttons__finish")){e.target.classList.toggle("active_button-complete"),e.target.closest(".ul_text").classList.toggle("active_task");for(let t=0;t<n.length;t++)e.target.closest(".ul_text").children[0].textContent.trim()==n[t].text&&e.target.closest(".active_task")?n[t].complete=!0:e.target.closest(".ul_text").children[0].textContent.trim()!=n[t].text||e.target.closest(".active_task")||(n[t].complete=!1);o()}else if(e.target.closest(".li_buttons_delete")&&confirm("Вы уверены?")){let l=e.target.closest(".ul_text");l.classList.add("animate__bounceOut"),function(t){for(let e=0;e<n.length;e++)if(t.children[0].textContent.trim()==n[e].text)return n.splice(e,1),void o()}(l),setTimeout((()=>{l.remove(),(new t).showPrevent()}),800)}})),document.querySelector(".btn_clear").addEventListener("click",(()=>{confirm("Очистить список?")&&(localStorage.clear(),n=[],s(),document.querySelectorAll(".ul_text").forEach((t=>{t.remove()})),(new t).showPrevent())})),document.addEventListener("submit",(l=>{if(l.preventDefault(),0==e.value)alert("Поле не заполнено");else{let l=new t(e.value);if(document.querySelector(".ul_description")){let t=document.querySelectorAll(".ul_description"),s=!1;for(let l of t)if(l.textContent.trim().toLowerCase()==e.value.trim().toLowerCase())return s=!0,void alert("Такая карточка уже есть!");0==s&&(n.push({text:e.value,complete:!1}),o(),l.addCarts())}else n.push({text:e.value,complete:!1}),o(),l.addCarts()}}));