"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyRiderDto = exports.UpdateRiderStatusDto = exports.RiderValidationStatus = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var RiderValidationStatus;
(function (RiderValidationStatus) {
    RiderValidationStatus["PENDING"] = "PENDING";
    RiderValidationStatus["VERIFIED"] = "VERIFIED";
    RiderValidationStatus["REJECTED"] = "REJECTED";
})(RiderValidationStatus || (exports.RiderValidationStatus = RiderValidationStatus = {}));
var UpdateRiderStatusDto = function () {
    var _a;
    var _is_online_decorators;
    var _is_online_initializers = [];
    var _is_online_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateRiderStatusDto() {
                this.is_online = __runInitializers(this, _is_online_initializers, void 0);
                __runInitializers(this, _is_online_extraInitializers);
            }
            return UpdateRiderStatusDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _is_online_decorators = [(0, swagger_1.ApiProperty)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _is_online_decorators, { kind: "field", name: "is_online", static: false, private: false, access: { has: function (obj) { return "is_online" in obj; }, get: function (obj) { return obj.is_online; }, set: function (obj, value) { obj.is_online = value; } }, metadata: _metadata }, _is_online_initializers, _is_online_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateRiderStatusDto = UpdateRiderStatusDto;
var VerifyRiderDto = function () {
    var _a;
    var _validation_status_decorators;
    var _validation_status_initializers = [];
    var _validation_status_extraInitializers = [];
    return _a = /** @class */ (function () {
            function VerifyRiderDto() {
                this.validation_status = __runInitializers(this, _validation_status_initializers, void 0);
                __runInitializers(this, _validation_status_extraInitializers);
            }
            return VerifyRiderDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _validation_status_decorators = [(0, swagger_1.ApiProperty)({ enum: RiderValidationStatus }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsEnum)(RiderValidationStatus)];
            __esDecorate(null, null, _validation_status_decorators, { kind: "field", name: "validation_status", static: false, private: false, access: { has: function (obj) { return "validation_status" in obj; }, get: function (obj) { return obj.validation_status; }, set: function (obj, value) { obj.validation_status = value; } }, metadata: _metadata }, _validation_status_initializers, _validation_status_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.VerifyRiderDto = VerifyRiderDto;
