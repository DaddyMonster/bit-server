"use strict";

var __extends = (this && this.__extends) || (function () {

    var extendStatics = function (d, b) {

        extendStatics = Object.setPrototypeOf ||

            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||

            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };

        return extendStatics(d, b);

    };

    return function (d, b) {

        extendStatics(d, b);

        function __() { this.constructor = d; }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());

    };

})();

Object.defineProperty(exports, "__esModule", { value: true });

exports.AuthError = void 0;

var create_apollo_error_1 = require("./create-apollo-error");

var AuthError = (function (_super) {

    __extends(AuthError, _super);

    function AuthError(info) {

        var _a, _b, _c;

        var _this = this;

        var errInfo = {

            code: (_a = info.code) !== null && _a !== void 0 ? _a : "AUTHORIZATION ERROR",

            message: (_b = info.message) !== null && _b !== void 0 ? _b : "세션이 만료되었거나 권한이 없습니다.",

            path: (_c = info.path) !== null && _c !== void 0 ? _c : "UNKNOWN",

        };

        _this = _super.call(this, errInfo) || this;

        _this.throw();

        return _this;

    }

    return AuthError;

}(create_apollo_error_1.CreateApolloError));

exports.AuthError = AuthError;

