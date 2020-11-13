(()=>{var e={632:(e,t,n)=>{var i;!function(){var o=function(e){return o.utils.extend({},o.plugins,(new o.Storage).init(e))};o.version="0.4.11",o.utils={extend:function(){for(var e="object"==typeof arguments[0]?arguments[0]:{},t=1;t<arguments.length;t++)if(arguments[t]&&"object"==typeof arguments[t])for(var n in arguments[t])e[n]=arguments[t][n];return e},each:function(e,t,n){if(this.isArray(e)){for(var i=0;i<e.length;i++)if(!1===t.call(n,e[i],i))return}else if(e)for(var o in e)if(!1===t.call(n,e[o],o))return},tryEach:function(e,t,n,i){this.each(e,(function(e,o){try{return t.call(i,e,o)}catch(t){if(this.isFunction(n))try{n.call(i,e,o,t)}catch(e){}}}),this)},registerPlugin:function(e){o.plugins=this.extend(e,o.plugins)},getTypeOf:function(e){return null==e?""+e:Object.prototype.toString.call(e).replace(/^\[object\s(.*)\]$/,(function(e,t){return t.toLowerCase()}))}};for(var r=["Arguments","Boolean","Function","String","Array","Number","Date","RegExp","Undefined","Null"],s=0;s<r.length;s++)o.utils["is"+r[s]]=function(e){return function(t){return o.utils.getTypeOf(t)===e.toLowerCase()}}(r[s]);o.plugins={},o.options=o.utils.extend({namespace:"b45i1",storages:["local","cookie","session","memory"],expireDays:365,keyDelimiter:"."},window.Basil?window.Basil.options:{}),o.Storage=function(){var e="b45i1"+(Math.random()+1).toString(36).substring(7),t={},n=function(e){var t=o.utils.getTypeOf(e);return"string"===t&&e||"number"===t||"boolean"===t},i=function(e){return o.utils.isArray(e)?e:o.utils.isString(e)?[e]:[]},r=function(e,t,i){var r="";return n(t)?r+=t:o.utils.isArray(t)&&(r=(t=o.utils.isFunction(t.filter)?t.filter(n):t).join(i)),r&&n(e)?e+i+r:r},s=function(e,t,i){return n(e)?t.replace(new RegExp("^"+e+i),""):t},u={engine:null,check:function(){try{window[this.engine].setItem(e,!0),window[this.engine].removeItem(e)}catch(e){return!1}return!0},set:function(e,t,n){if(!e)throw Error("invalid key");window[this.engine].setItem(e,t)},get:function(e){return window[this.engine].getItem(e)},remove:function(e){window[this.engine].removeItem(e)},reset:function(e){for(var t,n=0;n<window[this.engine].length;n++)t=window[this.engine].key(n),e&&0!==t.indexOf(e)||(this.remove(t),n--)},keys:function(e,t){for(var n,i=[],o=0;o<window[this.engine].length;o++)n=window[this.engine].key(o),e&&0!==n.indexOf(e)||i.push(s(e,n,t));return i}};return t.local=o.utils.extend({},u,{engine:"localStorage"}),t.session=o.utils.extend({},u,{engine:"sessionStorage"}),t.memory={_hash:{},check:function(){return!0},set:function(e,t,n){if(!e)throw Error("invalid key");this._hash[e]=t},get:function(e){return this._hash[e]||null},remove:function(e){delete this._hash[e]},reset:function(e){for(var t in this._hash)e&&0!==t.indexOf(e)||this.remove(t)},keys:function(e,t){var n=[];for(var i in this._hash)e&&0!==i.indexOf(e)||n.push(s(e,i,t));return n}},t.cookie={check:function(t){if(!navigator.cookieEnabled)return!1;if(window.self!==window.top){var n="thirdparty.check="+Math.round(1e3*Math.random());return document.cookie=n+"; path=/",-1!==document.cookie.indexOf(n)}if(t&&t.secure)try{this.set(e,e,t);var i=this.get(e)===e;return this.remove(e),i}catch(e){return!1}return!0},set:function(e,t,n){if(!this.check())throw Error("cookies are disabled");if(n=n||{},!e)throw Error("invalid key");var i=encodeURIComponent(e)+"="+encodeURIComponent(t);if(n.expireDays){var o=new Date;o.setTime(o.getTime()+24*n.expireDays*60*60*1e3),i+="; expires="+o.toGMTString()}if(n.domain&&n.domain!==document.domain){var r=n.domain.replace(/^\./,"");if(-1===document.domain.indexOf(r)||r.split(".").length<=1)throw Error("invalid domain");i+="; domain="+n.domain}n.sameSite&&["lax","strict","none"].includes(n.sameSite.toLowerCase())&&(i+="; SameSite="+n.sameSite),!0===n.secure&&(i+="; Secure"),document.cookie=i+"; path=/"},get:function(e){if(!this.check())throw Error("cookies are disabled");for(var t,n=encodeURIComponent(e),i=document.cookie?document.cookie.split(";"):[],o=i.length-1;o>=0;o--)if(0===(t=i[o].replace(/^\s*/,"")).indexOf(n+"="))return decodeURIComponent(t.substring(n.length+1,t.length));return null},remove:function(e){this.set(e,"",{expireDays:-1});for(var t=document.domain.split("."),n=t.length;n>1;n--)this.set(e,"",{expireDays:-1,domain:"."+t.slice(-n).join(".")})},reset:function(e){for(var t,n,i=document.cookie?document.cookie.split(";"):[],o=0;o<i.length;o++)n=(t=i[o].replace(/^\s*/,"")).substr(0,t.indexOf("=")),e&&0!==n.indexOf(e)||this.remove(n)},keys:function(e,t){if(!this.check())throw Error("cookies are disabled");for(var n,i,o=[],r=document.cookie?document.cookie.split(";"):[],u=0;u<r.length;u++)n=r[u].replace(/^\s*/,""),i=decodeURIComponent(n.substr(0,n.indexOf("="))),e&&0!==i.indexOf(e)||o.push(s(e,i,t));return o}},{init:function(e){return this.setOptions(e),this},setOptions:function(e){this.options=o.utils.extend({},this.options||o.options,e)},support:function(e){return t.hasOwnProperty(e)},check:function(e){return!!this.support(e)&&t[e].check(this.options)},set:function(e,n,s){if(s=o.utils.extend({},this.options,s),!(e=r(s.namespace,e,s.keyDelimiter)))return!1;n=!0===s.raw?n:function(e){return JSON.stringify(e)}(n);var u=null;return o.utils.tryEach(i(s.storages),(function(i,o){return t[i].set(e,n,s),u=i,!1}),null,this),!!u&&(o.utils.tryEach(i(s.storages),(function(n,i){n!==u&&t[n].remove(e)}),null,this),!0)},get:function(e,n){if(n=o.utils.extend({},this.options,n),!(e=r(n.namespace,e,n.keyDelimiter)))return null;var s=null;return o.utils.tryEach(i(n.storages),(function(i,o){if(null!==s)return!1;s=t[i].get(e,n)||null,s=!0===n.raw?s:function(e){return e?JSON.parse(e):null}(s)}),(function(e,t,n){s=null}),this),s},remove:function(e,n){n=o.utils.extend({},this.options,n),(e=r(n.namespace,e,n.keyDelimiter))&&o.utils.tryEach(i(n.storages),(function(n){t[n].remove(e)}),null,this)},reset:function(e){e=o.utils.extend({},this.options,e),o.utils.tryEach(i(e.storages),(function(n){t[n].reset(e.namespace)}),null,this)},keys:function(e){e=e||{};var t=[];for(var n in this.keysMap(e))t.push(n);return t},keysMap:function(e){e=o.utils.extend({},this.options,e);var n={};return o.utils.tryEach(i(e.storages),(function(i){o.utils.each(t[i].keys(e.namespace,e.keyDelimiter),(function(e){n[e]=o.utils.isArray(n[e])?n[e]:[],n[e].push(i)}),this)}),null,this),n}}},o.memory=(new o.Storage).init({storages:"memory",namespace:null,raw:!0}),o.cookie=(new o.Storage).init({storages:"cookie",namespace:null,raw:!0}),o.localStorage=(new o.Storage).init({storages:"local",namespace:null,raw:!0}),o.sessionStorage=(new o.Storage).init({storages:"session",namespace:null,raw:!0}),window.Basil=o,void 0===(i=function(){return o}.call(t,n,t,e))||(e.exports=i)}()}},t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={exports:{}};return e[i](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(632),t=n.n(e);(function(){const e=function(){let e,t,n,i;return{queryDomElements:function(){e=document.getElementById("new-todo"),t=document.getElementById("new-project-form"),n=document.getElementById("todo-list"),i=document.getElementById("main-section")},getNewTodoButton:function(){return null!=e&&e},getNewProjectForm:function(){return null!=t&&t},displayNewTodoForm:function(){if(document.getElementById("new-todo-form"))return!1;let e=document.createElement("div"),t=document.createElement("form"),o=document.createElement("label"),r=document.createElement("input"),s=document.createElement("label"),u=document.createElement("textarea"),a=document.createElement("label"),l=document.createElement("input"),c=document.createElement("label"),d=document.createElement("select"),m=document.createElement("option"),h=document.createElement("option"),f=document.createElement("option"),p=document.createElement("input");return e.id="new-todo-form-container",t.id="new-todo-form",r.name="title",u.name="description",l.name="due",d.name="priority",r.required=!0,u.required=!0,u.required=!0,p.type="submit",l.type="datetime-local",r.maxLength=20,u.maxLength=400,o.textContent="Title",s.textContent="Description",a.textContent="Due",c.textContent="Priority",m.textContent="Low",h.textContent="Medium",f.textContent="High",o.htmlFor="todo-title-input",s.htmlFor="todo-description-input",a.htmlFor="todo-due-input",c.htmlFor="todo-priority-input",d.appendChild(m),d.appendChild(h),d.appendChild(f),t.appendChild(o),t.appendChild(r),t.appendChild(s),t.appendChild(u),t.appendChild(a),t.appendChild(l),t.appendChild(c),t.appendChild(d),t.appendChild(p),e.appendChild(t),n.style.display="none",i.appendChild(e),t}}}(),n=function(){const e=new(t())({namespace:"foo",storages:["local"]});let n,i;function o(){e.set("todos",n),e.set("projects",i)}return{getFromStorage:function(){n=e.get("todos")||[],i=e.get("projects")||[]},storeNewTodo:function(e,t,i,r){let s=function(e,t,n,i){return{title:e,description:t,dueDate:n,priority:i,setCompleted:function(){},getInfo:function(){}}}(e,t,i,r);n.push(s),o()},storeNewProject:function(e){if(i.some((t=>t.name==e)))return!1;let t={name:e};return i.push(t),o(),!0}}}();function i(){var e;""==(e=this).description.value||e.description.value.length>400?(e.description.focus(),event.preventDefault()):(""==e.title.value||e.title.value.length>20)&&(e.title.focus(),event.preventDefault()),n.storeNewTodo(this.title.value,this.description.value,this.due.value,this.priority.value)}function o(){let t=e.displayNewTodoForm();t&&t.addEventListener("submit",i)}function r(){(""==this.title.value||this.title.value.length>20)&&(this.title.focus(),event.preventDefault()),n.storeNewProject(this.title.value)||(this.title.setCustomValidity("Project with this name already exists!"),event.preventDefault())}return{init:function(){n.getFromStorage(),e.queryDomElements(),e.getNewTodoButton().addEventListener("click",o),e.getNewProjectForm().addEventListener("submit",r)}}})().init()})()})();