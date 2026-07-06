(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region src/index.ts
const isErrorResponse = (response) => {
	return response.status && response?.code >= 400 && response.timestamp !== void 0;
};
const isSuccessResponse = (response) => {
	return response?.status === "ok" && response?.code >= 200 && response?.code < 300 && response.timestamp !== void 0;
};
const jarspecRequest = async (input, init) => {
	try {
		const res = await (await fetch(input, init)).json();
		if (isErrorResponse(res)) throw res;
		if (!isSuccessResponse(res)) throw new TypeError("The response of the call was not a valid jarspec response.");
		return res;
	} catch (err) {
		if (!isErrorResponse(err)) err = {
			status: "na",
			code: 502,
			message: err.message,
			data: [err],
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			version: "2.0.0"
		};
		throw err;
	}
};
//#endregion
exports.jarspecRequest = jarspecRequest;

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
