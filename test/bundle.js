(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(()=>{"use strict";var e={};({27:function(e,t){var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{u(r.next(e))}catch(e){a(e)}}function s(e){try{u(r.throw(e))}catch(e){a(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}u((r=r.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.jarspecRequest=void 0;var o=function(e){return e.status&&(null==e?void 0:e.code)>=400&&void 0!==e.timestamp};t.jarspecRequest=function(e,t){return n(void 0,void 0,Promise,(function(){var n,a;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,3,,4]),[4,fetch(e,t)];case 1:return[4,r.sent().json()];case 2:if(n=r.sent(),o(n))throw n;if(!("ok"===(null==(i=n)?void 0:i.status)&&(null==i?void 0:i.code)>=200&&(null==i?void 0:i.code)<300&&void 0!==i.timestamp))throw new TypeError("The response of the call was not a valid jarspec response.");return[2,n];case 3:throw a=r.sent(),o(a)||(a={status:"na",code:502,message:a.message,data:[a],timestamp:(new Date).toISOString(),version:"1.0.0"}),a;case 4:return[2]}var i}))}))}}})[27](0,e);var t=exports;for(var n in e)t[n]=e[n];e.__esModule&&Object.defineProperty(t,"__esModule",{value:!0})})();
},{}],2:[function(require,module,exports){
const $successBtn = document.getElementById('success-test');
const $errorBtn = document.getElementById('error-test');
const $responsePre = document.getElementById('response');

const jarspec = require('@devleaf-labs/jarspec-client');

$successBtn.addEventListener('click', async function() {
  try {
    console.log('Attempting to call /success endpoint of localhost api.');
    const res = await jarspec.jarspecRequest('http://localhost:3000/success');
    $responsePre.innerHTML = JSON.stringify(res);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
});

$errorBtn.addEventListener('click', async function() {
  try {
    console.log('Attempting to call /error endpoint of localhost api.');
    const res = await jarspec.jarspecRequest('http://localhost:3000/error');
    console.log(res);
  } catch (err) {
    $responsePre.innerHTML = JSON.stringify(err);
    console.error(err);
  }
});
},{"@devleaf-labs/jarspec-client":1}]},{},[2]);