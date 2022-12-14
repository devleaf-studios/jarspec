(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.jarspecRequest = void 0;
var isErrorResponse = function (response) {
    return response.status
        && (response === null || response === void 0 ? void 0 : response.code) >= 400
        && response.timestamp !== undefined;
};
var isSuccessResponse = function (response) {
    return (response === null || response === void 0 ? void 0 : response.status) === 'ok'
        && (response === null || response === void 0 ? void 0 : response.code) >= 200
        && (response === null || response === void 0 ? void 0 : response.code) < 300
        && response.timestamp !== undefined;
};
var jarspecRequest = function (input, init) { return __awaiter(void 0, void 0, void 0, function () {
    var call, res, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(input, init)];
            case 1:
                call = _a.sent();
                return [4 /*yield*/, call.json()];
            case 2:
                res = _a.sent();
                if (isErrorResponse(res))
                    throw res;
                if (!isSuccessResponse(res))
                    throw new TypeError('The response of the call was not a valid jarspec response.');
                return [2 /*return*/, res];
            case 3:
                err_1 = _a.sent();
                if (!isErrorResponse(err_1))
                    err_1 = {
                        status: 'na',
                        code: 502,
                        message: err_1.message,
                        data: [err_1],
                        timestamp: new Date().toISOString(),
                        version: '1.0.0'
                    };
                throw err_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
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
