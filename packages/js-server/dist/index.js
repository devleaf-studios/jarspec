"use strict";
exports.__esModule = true;
exports.Jarspec = void 0;
var GRPCtoHTTP_1 = require("./common/lib/GRPCtoHTTP");
var Jarspec;
(function (Jarspec) {
    var response = function (rpcCode, message, data, id) {
        return {
            status: rpcCode,
            code: GRPCtoHTTP_1.gRPCtoHTTP[rpcCode],
            data: data !== null && data !== void 0 ? data : null,
            message: message,
            id: id,
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        };
    };
    Jarspec.success = function (data, id) {
        var generic = response('ok', 'success', data, id);
        delete generic.message;
        return generic;
    };
    Jarspec.error = function (rpcCode, message, id, data, error) {
        var _a;
        var generic = response(rpcCode, message, data, id);
        console.error("[".concat((_a = generic.id) !== null && _a !== void 0 ? _a : ' - ', "] ").concat(rpcCode, " - ").concat(message), error);
        return generic;
    };
    Jarspec.expressMiddleware = function (req, res, next) {
        res.jarspec = {
            success: function (data, id) {
                var jarspecSuccess = Jarspec.success(data, id);
                res.status(200).json(jarspecSuccess);
            },
            error: function (rpcCode, message, id, data, err) {
                var jarspecError = Jarspec.error(rpcCode, message, id, data, err);
                res.status(jarspecError.code).json(jarspecError);
            }
        };
        next();
    };
})(Jarspec = exports.Jarspec || (exports.Jarspec = {}));
//# sourceMappingURL=index.js.map