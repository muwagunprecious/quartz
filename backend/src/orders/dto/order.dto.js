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
exports.UpdateOrderStatusDto = exports.CreateOrderDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var client_1 = require("@prisma/client");
var CreateOrderDto = function () {
    var _a;
    var _product_id_decorators;
    var _product_id_initializers = [];
    var _product_id_extraInitializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var _delivery_option_decorators;
    var _delivery_option_initializers = [];
    var _delivery_option_extraInitializers = [];
    var _delivery_fee_decorators;
    var _delivery_fee_initializers = [];
    var _delivery_fee_extraInitializers = [];
    var _delivery_address_decorators;
    var _delivery_address_initializers = [];
    var _delivery_address_extraInitializers = [];
    var _delivery_contact_decorators;
    var _delivery_contact_initializers = [];
    var _delivery_contact_extraInitializers = [];
    var _create_delivery_request_decorators;
    var _create_delivery_request_initializers = [];
    var _create_delivery_request_extraInitializers = [];
    var _offered_delivery_price_decorators;
    var _offered_delivery_price_initializers = [];
    var _offered_delivery_price_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateOrderDto() {
                this.product_id = __runInitializers(this, _product_id_initializers, void 0);
                this.quantity = (__runInitializers(this, _product_id_extraInitializers), __runInitializers(this, _quantity_initializers, void 0));
                this.delivery_option = (__runInitializers(this, _quantity_extraInitializers), __runInitializers(this, _delivery_option_initializers, void 0));
                this.delivery_fee = (__runInitializers(this, _delivery_option_extraInitializers), __runInitializers(this, _delivery_fee_initializers, void 0));
                this.delivery_address = (__runInitializers(this, _delivery_fee_extraInitializers), __runInitializers(this, _delivery_address_initializers, void 0));
                this.delivery_contact = (__runInitializers(this, _delivery_address_extraInitializers), __runInitializers(this, _delivery_contact_initializers, void 0));
                this.create_delivery_request = (__runInitializers(this, _delivery_contact_extraInitializers), __runInitializers(this, _create_delivery_request_initializers, void 0));
                this.offered_delivery_price = (__runInitializers(this, _create_delivery_request_extraInitializers), __runInitializers(this, _offered_delivery_price_initializers, void 0));
                __runInitializers(this, _offered_delivery_price_extraInitializers);
            }
            return CreateOrderDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _product_id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Product ID' }), (0, class_validator_1.IsString)()];
            _quantity_decorators = [(0, swagger_1.ApiProperty)({ description: 'Quantity', default: 1 }), (0, class_validator_1.IsNumber)()];
            _delivery_option_decorators = [(0, swagger_1.ApiProperty)({ description: 'Delivery option', enum: client_1.DeliveryOption }), (0, class_validator_1.IsEnum)(client_1.DeliveryOption)];
            _delivery_fee_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Delivery fee if applicable' }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _delivery_address_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Pickup/delivery address' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _delivery_contact_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Contact for delivery' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _create_delivery_request_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Auto-create delivery request', default: false }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _offered_delivery_price_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Offered delivery price if creating delivery request' }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _product_id_decorators, { kind: "field", name: "product_id", static: false, private: false, access: { has: function (obj) { return "product_id" in obj; }, get: function (obj) { return obj.product_id; }, set: function (obj, value) { obj.product_id = value; } }, metadata: _metadata }, _product_id_initializers, _product_id_extraInitializers);
            __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
            __esDecorate(null, null, _delivery_option_decorators, { kind: "field", name: "delivery_option", static: false, private: false, access: { has: function (obj) { return "delivery_option" in obj; }, get: function (obj) { return obj.delivery_option; }, set: function (obj, value) { obj.delivery_option = value; } }, metadata: _metadata }, _delivery_option_initializers, _delivery_option_extraInitializers);
            __esDecorate(null, null, _delivery_fee_decorators, { kind: "field", name: "delivery_fee", static: false, private: false, access: { has: function (obj) { return "delivery_fee" in obj; }, get: function (obj) { return obj.delivery_fee; }, set: function (obj, value) { obj.delivery_fee = value; } }, metadata: _metadata }, _delivery_fee_initializers, _delivery_fee_extraInitializers);
            __esDecorate(null, null, _delivery_address_decorators, { kind: "field", name: "delivery_address", static: false, private: false, access: { has: function (obj) { return "delivery_address" in obj; }, get: function (obj) { return obj.delivery_address; }, set: function (obj, value) { obj.delivery_address = value; } }, metadata: _metadata }, _delivery_address_initializers, _delivery_address_extraInitializers);
            __esDecorate(null, null, _delivery_contact_decorators, { kind: "field", name: "delivery_contact", static: false, private: false, access: { has: function (obj) { return "delivery_contact" in obj; }, get: function (obj) { return obj.delivery_contact; }, set: function (obj, value) { obj.delivery_contact = value; } }, metadata: _metadata }, _delivery_contact_initializers, _delivery_contact_extraInitializers);
            __esDecorate(null, null, _create_delivery_request_decorators, { kind: "field", name: "create_delivery_request", static: false, private: false, access: { has: function (obj) { return "create_delivery_request" in obj; }, get: function (obj) { return obj.create_delivery_request; }, set: function (obj, value) { obj.create_delivery_request = value; } }, metadata: _metadata }, _create_delivery_request_initializers, _create_delivery_request_extraInitializers);
            __esDecorate(null, null, _offered_delivery_price_decorators, { kind: "field", name: "offered_delivery_price", static: false, private: false, access: { has: function (obj) { return "offered_delivery_price" in obj; }, get: function (obj) { return obj.offered_delivery_price; }, set: function (obj, value) { obj.offered_delivery_price = value; } }, metadata: _metadata }, _offered_delivery_price_initializers, _offered_delivery_price_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateOrderDto = CreateOrderDto;
var UpdateOrderStatusDto = function () {
    var _a;
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateOrderStatusDto() {
                this.status = __runInitializers(this, _status_initializers, void 0);
                __runInitializers(this, _status_extraInitializers);
            }
            return UpdateOrderStatusDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, swagger_1.ApiProperty)({ description: 'New order status', enum: client_1.OrderStatus }), (0, class_validator_1.IsEnum)(client_1.OrderStatus)];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateOrderStatusDto = UpdateOrderStatusDto;
