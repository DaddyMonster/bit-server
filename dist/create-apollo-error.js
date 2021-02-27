"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

exports.CreateApolloError = void 0;

var apollo_server_express_1 = require("apollo-server-express");

var CreateApolloError = (function () {

    function CreateApolloError(info) {

        Object.setPrototypeOf(this, CreateApolloError.prototype);

        this.errInfo = info;

    }

    CreateApolloError.prototype.throw = function () {

        var _a = this.errInfo, message = _a.message, path = _a.path, code = _a.code;

        throw new apollo_server_express_1.ApolloError(message, code, { parameter: path });

    };

    return CreateApolloError;

}());

exports.CreateApolloError = CreateApolloError;

