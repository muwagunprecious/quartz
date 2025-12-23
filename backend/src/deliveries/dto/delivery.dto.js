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
exports.CreateDeliveryDto = exports.NegotiatePriceDto = exports.VerifyCodeDto = exports.UpdateDeliveryStatusDto = exports.NegotiateResponseDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var NegotiateResponseDto = function () {
    var _a;
    var _accept_decorators;
    var _accept_initializers = [];
    var _accept_extraInitializers = [];
    return _a = /** @class */ (function () {
            function NegotiateResponseDto() {
                this.accept = __runInitializers(this, _accept_initializers, void 0);
                __runInitializers(this, _accept_extraInitializers);
            }
            return NegotiateResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _accept_decorators = [(0, swagger_1.ApiProperty)({ description: 'Accept or decline negotiation' }), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _accept_decorators, { kind: "field", name: "accept", static: false, private: false, access: { has: function (obj) { return "accept" in obj; }, get: function (obj) { return obj.accept; }, set: function (obj, value) { obj.accept = value; } }, metadata: _metadata }, _accept_initializers, _accept_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.NegotiateResponseDto = NegotiateResponseDto;
var UpdateDeliveryStatusDto = function () {
    var _a;
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateDeliveryStatusDto() {
                this.status = __runInitializers(this, _status_initializers, void 0);
                __runInitializers(this, _status_extraInitializers);
            }
            return UpdateDeliveryStatusDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, swagger_1.ApiProperty)({ description: 'New delivery status' })];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateDeliveryStatusDto = UpdateDeliveryStatusDto;
var VerifyCodeDto = function () {
    var _a;
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    return _a = /** @class */ (function () {
            function VerifyCodeDto() {
                this.code = __runInitializers(this, _code_initializers, void 0);
                __runInitializers(this, _code_extraInitializers);
            }
            return VerifyCodeDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _code_decorators = [(0, swagger_1.ApiProperty)({ description: 'Verification code' })];
            __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.VerifyCodeDto = VerifyCodeDto;
var NegotiatePriceDto = function () {
    var _a;
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    return _a = /** @class */ (function () {
            function NegotiatePriceDto() {
                this.price = __runInitializers(this, _price_initializers, void 0);
                __runInitializers(this, _price_extraInitializers);
            }
            return NegotiatePriceDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _price_decorators = [(0, swagger_1.ApiProperty)({ description: 'Proposed price' }), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.NegotiatePriceDto = NegotiatePriceDto;
var CreateDeliveryDto = function () {
    var _a;
    var _order_id_decorators;
    var _order_id_initializers = [];
    var _order_id_extraInitializers = [];
    var _offered_price_decorators;
    var _offered_price_initializers = [];
    var _offered_price_extraInitializers = [];
    var _pickup_address_decorators;
    var _pickup_address_initializers = [];
    var _pickup_address_extraInitializers = [];
    var _pickup_contact_decorators;
    var _pickup_contact_initializers = [];
    var _pickup_contact_extraInitializers = [];
    var _dropoff_address_decorators;
    var _dropoff_address_initializers = [];
    var _dropoff_address_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateDeliveryDto() {
                this.order_id = __runInitializers(this, _order_id_initializers, void 0);
                this.offered_price = (__runInitializers(this, _order_id_extraInitializers), __runInitializers(this, _offered_price_initializers, void 0));
                this.pickup_address = (__runInitializers(this, _offered_price_extraInitializers), __runInitializers(this, _pickup_address_initializers, void 0));
                this.pickup_contact = (__runInitializers(this, _pickup_address_extraInitializers), __runInitializers(this, _pickup_contact_initializers, void 0));
                this.dropoff_address = (__runInitializers(this, _pickup_contact_extraInitializers), __runInitializers(this, _dropoff_address_initializers, void 0));
                __runInitializers(this, _dropoff_address_extraInitializers);
            }
            return CreateDeliveryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _order_id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Order ID' })];
            _offered_price_decorators = [(0, swagger_1.ApiProperty)({ description: 'Offered delivery price' }), (0, class_validator_1.IsNumber)()];
            _pickup_address_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Pickup address' }), (0, class_validator_1.IsOptional)()];
            _pickup_contact_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Pickup contact' }), (0, class_validator_1.IsOptional)()];
            _dropoff_address_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Dropoff address' }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _order_id_decorators, { kind: "field", name: "order_id", static: false, private: false, access: { has: function (obj) { return "order_id" in obj; }, get: function (obj) { return obj.order_id; }, set: function (obj, value) { obj.order_id = value; } }, metadata: _metadata }, _order_id_initializers, _order_id_extraInitializers);
            __esDecorate(null, null, _offered_price_decorators, { kind: "field", name: "offered_price", static: false, private: false, access: { has: function (obj) { return "offered_price" in obj; }, get: function (obj) { return obj.offered_price; }, set: function (obj, value) { obj.offered_price = value; } }, metadata: _metadata }, _offered_price_initializers, _offered_price_extraInitializers);
            __esDecorate(null, null, _pickup_address_decorators, { kind: "field", name: "pickup_address", static: false, private: false, access: { has: function (obj) { return "pickup_address" in obj; }, get: function (obj) { return obj.pickup_address; }, set: function (obj, value) { obj.pickup_address = value; } }, metadata: _metadata }, _pickup_address_initializers, _pickup_address_extraInitializers);
            __esDecorate(null, null, _pickup_contact_decorators, { kind: "field", name: "pickup_contact", static: false, private: false, access: { has: function (obj) { return "pickup_contact" in obj; }, get: function (obj) { return obj.pickup_contact; }, set: function (obj, value) { obj.pickup_contact = value; } }, metadata: _metadata }, _pickup_contact_initializers, _pickup_contact_extraInitializers);
            __esDecorate(null, null, _dropoff_address_decorators, { kind: "field", name: "dropoff_address", static: false, private: false, access: { has: function (obj) { return "dropoff_address" in obj; }, get: function (obj) { return obj.dropoff_address; }, set: function (obj, value) { obj.dropoff_address = value; } }, metadata: _metadata }, _dropoff_address_initializers, _dropoff_address_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateDeliveryDto = CreateDeliveryDto;
