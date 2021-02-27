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

exports.BadReqError = void 0;

var create_apollo_error_1 = require("./create-apollo-error");

var BadReqError = (function (_super) {

    __extends(BadReqError, _super);

    function BadReqError(info) {

        var _a, _b, _c;

        var _this = this;

        var errInfo = {

            code: (_a = info.code) !== null && _a !== void 0 ? _a : "BAD REQUEST ERROR",

            message: (_b = info.message) !== null && _b !== void 0 ? _b : "존재하지 않는 리소스이거나 잘못된 요청입니다.",

            path: (_c = info.path) !== null && _c !== void 0 ? _c : "UNKNOWN",

        };

        _this = _super.call(this, errInfo) || this;

        _this.throw();

        return _this;

    }

    return BadReqError;

}(create_apollo_error_1.CreateApolloError));

exports.BadReqError = BadReqError;

