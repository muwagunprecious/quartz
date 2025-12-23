"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveriesController = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var swagger_1 = require("@nestjs/swagger");
var DeliveriesController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('deliveries'), (0, common_1.Controller)('deliveries'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _getOne_decorators;
    var _findAllPending_decorators;
    var _accept_decorators;
    var _negotiate_decorators;
    var _respondToNegotiation_decorators;
    var _verify_decorators;
    var _updateStatus_decorators;
    var _cancel_decorators;
    var DeliveriesController = _classThis = /** @class */ (function () {
        function DeliveriesController_1(deliveriesService) {
            this.deliveriesService = (__runInitializers(this, _instanceExtraInitializers), deliveriesService);
        }
        DeliveriesController_1.prototype.create = function (req, body) {
            return this.deliveriesService.createRequest(body.order_id, body.offered_price, req.user.id, body.pickup_address, body.dropoff_address);
        };
        DeliveriesController_1.prototype.getOne = function (id, req) {
            return this.deliveriesService.findOne(id, req.user.id);
        };
        DeliveriesController_1.prototype.findAllPending = function (req) {
            // Check if rider
            return this.deliveriesService.findAllPending(req.user.university_id);
        };
        DeliveriesController_1.prototype.accept = function (id, req) {
            return this.deliveriesService.acceptRequest(id, req.user.id);
        };
        DeliveriesController_1.prototype.negotiate = function (id, req, body) {
            return this.deliveriesService.negotiate(id, req.user.id, body.price);
        };
        DeliveriesController_1.prototype.respondToNegotiation = function (id, req, body) {
            return this.deliveriesService.respondToNegotiation(id, req.user.id, body.accept);
        };
        DeliveriesController_1.prototype.verify = function (id, body) {
            return this.deliveriesService.verifyCode(id, body.code);
        };
        DeliveriesController_1.prototype.updateStatus = function (id, req, body) {
            return this.deliveriesService.updateStatus(id, body.status, req.user.id);
        };
        DeliveriesController_1.prototype.cancel = function (id, req) {
            return this.deliveriesService.cancelDelivery(id, req.user.id);
        };
        return DeliveriesController_1;
    }());
    __setFunctionName(_classThis, "DeliveriesController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiOperation)({ summary: 'Create delivery request' })];
        _getOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get delivery details' })];
        _findAllPending_decorators = [(0, common_1.Get)('pending'), (0, swagger_1.ApiOperation)({ summary: 'Get pending deliveries (Rider only)' })];
        _accept_decorators = [(0, common_1.Post)(':id/accept'), (0, swagger_1.ApiOperation)({ summary: 'Rider accepts delivery' })];
        _negotiate_decorators = [(0, common_1.Post)(':id/negotiate'), (0, swagger_1.ApiOperation)({ summary: 'Rider proposes new price' })];
        _respondToNegotiation_decorators = [(0, common_1.Post)(':id/negotiate/respond'), (0, swagger_1.ApiOperation)({ summary: 'Buyer responds to negotiation' })];
        _verify_decorators = [(0, common_1.Post)(':id/verify-code'), (0, swagger_1.ApiOperation)({ summary: 'Rider verifies code to complete delivery' })];
        _updateStatus_decorators = [(0, common_1.Patch)(':id/status'), (0, swagger_1.ApiOperation)({ summary: 'Update status (Picked Up, On Way, At Gate)' })];
        _cancel_decorators = [(0, common_1.Post)(':id/cancel'), (0, swagger_1.ApiOperation)({ summary: 'Cancel delivery request' })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOne_decorators, { kind: "method", name: "getOne", static: false, private: false, access: { has: function (obj) { return "getOne" in obj; }, get: function (obj) { return obj.getOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAllPending_decorators, { kind: "method", name: "findAllPending", static: false, private: false, access: { has: function (obj) { return "findAllPending" in obj; }, get: function (obj) { return obj.findAllPending; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _accept_decorators, { kind: "method", name: "accept", static: false, private: false, access: { has: function (obj) { return "accept" in obj; }, get: function (obj) { return obj.accept; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _negotiate_decorators, { kind: "method", name: "negotiate", static: false, private: false, access: { has: function (obj) { return "negotiate" in obj; }, get: function (obj) { return obj.negotiate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _respondToNegotiation_decorators, { kind: "method", name: "respondToNegotiation", static: false, private: false, access: { has: function (obj) { return "respondToNegotiation" in obj; }, get: function (obj) { return obj.respondToNegotiation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verify_decorators, { kind: "method", name: "verify", static: false, private: false, access: { has: function (obj) { return "verify" in obj; }, get: function (obj) { return obj.verify; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateStatus_decorators, { kind: "method", name: "updateStatus", static: false, private: false, access: { has: function (obj) { return "updateStatus" in obj; }, get: function (obj) { return obj.updateStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancel_decorators, { kind: "method", name: "cancel", static: false, private: false, access: { has: function (obj) { return "cancel" in obj; }, get: function (obj) { return obj.cancel; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DeliveriesController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DeliveriesController = _classThis;
}();
exports.DeliveriesController = DeliveriesController;
