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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveriesService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var DeliveriesService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DeliveriesService = _classThis = /** @class */ (function () {
        function DeliveriesService_1(prisma, gateway) {
            this.prisma = prisma;
            this.gateway = gateway;
        }
        DeliveriesService_1.prototype.createRequest = function (orderId, initialPrice, userId, pickup, dropoff) {
            return __awaiter(this, void 0, void 0, function () {
                var delivery;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.delivery.create({
                                data: {
                                    order: { connect: { id: orderId } },
                                    offered_price: initialPrice,
                                    initiated_by: userId,
                                    pickup_address: pickup,
                                    dropoff_address: dropoff,
                                    status: client_1.DeliveryStatus.PENDING,
                                },
                                include: { order: { include: { product: true } } }
                            })];
                        case 1:
                            delivery = _a.sent();
                            // Notify Riders in University
                            this.gateway.notifyRiders(delivery.order.product.university_id, 'delivery_request', delivery);
                            return [2 /*return*/, delivery];
                    }
                });
            });
        };
        DeliveriesService_1.prototype.findAllPending = function (universityId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.delivery.findMany({
                            where: {
                                status: client_1.DeliveryStatus.PENDING,
                                order: {
                                    product: {
                                        university_id: universityId
                                    }
                                }
                            },
                            include: { order: { include: { product: true, seller: { include: { user: true } }, buyer: true } } }
                        })];
                });
            });
        };
        DeliveriesService_1.prototype.acceptRequest = function (deliveryId, riderId) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            var delivery, code, updated, sellerProfile;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, tx.delivery.findUnique({
                                            where: { id: deliveryId },
                                            include: { order: true }
                                        })];
                                    case 1:
                                        delivery = _a.sent();
                                        if (!delivery || delivery.status !== client_1.DeliveryStatus.PENDING) {
                                            throw new common_1.BadRequestException('Delivery not available');
                                        }
                                        if (delivery.rider_id) {
                                            throw new common_1.BadRequestException('Delivery already accepted by another rider');
                                        }
                                        code = Math.floor(1000 + Math.random() * 9000).toString();
                                        return [4 /*yield*/, tx.delivery.update({
                                                where: { id: deliveryId },
                                                data: {
                                                    rider_id: riderId,
                                                    status: client_1.DeliveryStatus.ACCEPTED,
                                                    code: code,
                                                    negotiated_price: null
                                                }
                                            })];
                                    case 2:
                                        updated = _a.sent();
                                        // Notify Buyer and Seller
                                        this.gateway.notifyUser(delivery.order.buyer_id, 'delivery_accepted', updated);
                                        this.gateway.notifyUser(delivery.order.seller_id, 'delivery_accepted', updated); // Using seller_id might need lookup if its profile id logic differs, but assuming relation works via user room if seller_id is user_id. Wait, seller_id is Schema SellerProfile.id.
                                        return [4 /*yield*/, tx.sellerProfile.findUnique({ where: { id: delivery.order.seller_id } })];
                                    case 3:
                                        sellerProfile = _a.sent();
                                        if (sellerProfile) {
                                            this.gateway.notifyUser(sellerProfile.user_id, 'delivery_accepted', updated);
                                        }
                                        return [2 /*return*/, updated];
                                }
                            });
                        }); })];
                });
            });
        };
        DeliveriesService_1.prototype.negotiate = function (deliveryId, riderId, price) {
            return __awaiter(this, void 0, void 0, function () {
                var delivery;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.delivery.update({
                                where: { id: deliveryId },
                                data: {
                                    status: client_1.DeliveryStatus.NEGOTIATING,
                                    negotiated_price: price,
                                },
                                include: { order: true }
                            })];
                        case 1:
                            delivery = _a.sent();
                            // Notify buyer
                            this.gateway.notifyUser(delivery.order.buyer_id, 'delivery_negotiation', delivery);
                            return [2 /*return*/, delivery];
                    }
                });
            });
        };
        DeliveriesService_1.prototype.verifyCode = function (deliveryId, code) {
            return __awaiter(this, void 0, void 0, function () {
                var delivery, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.delivery.findUnique({
                                where: { id: deliveryId },
                                include: { order: { include: { seller: true } } }
                            })];
                        case 1:
                            delivery = _a.sent();
                            if (!delivery)
                                throw new common_1.NotFoundException('Delivery not found');
                            if (!(delivery.code === code)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.delivery.update({
                                    where: { id: deliveryId },
                                    data: {
                                        status: client_1.DeliveryStatus.DELIVERED,
                                        delivered_at: new Date()
                                    }
                                })];
                        case 2:
                            updated = _a.sent();
                            // Notify all
                            this.gateway.notifyUser(delivery.order.buyer_id, 'delivery_completed', updated);
                            this.gateway.notifyUser(delivery.order.seller.user_id, 'delivery_completed', updated);
                            return [2 /*return*/, updated];
                        case 3: throw new common_1.BadRequestException('Invalid Code');
                    }
                });
            });
        };
        DeliveriesService_1.prototype.updateStatus = function (deliveryId, status, riderId) {
            return __awaiter(this, void 0, void 0, function () {
                var delivery, data, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!riderId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.prisma.delivery.findUnique({ where: { id: deliveryId } })];
                        case 1:
                            delivery = _a.sent();
                            if (delivery && delivery.rider_id !== riderId) {
                                throw new common_1.BadRequestException('Only assigned rider can update status');
                            }
                            _a.label = 2;
                        case 2:
                            data = { status: status };
                            if (status === client_1.DeliveryStatus.PICKED_UP)
                                data.picked_up_at = new Date();
                            if (status === client_1.DeliveryStatus.ON_MY_WAY)
                                data.on_way_at = new Date();
                            if (status === client_1.DeliveryStatus.AT_THE_GATE)
                                data.at_gate_at = new Date();
                            return [4 /*yield*/, this.prisma.delivery.update({
                                    where: { id: deliveryId },
                                    data: data,
                                    include: { order: { include: { seller: true } } }
                                })];
                        case 3:
                            updated = _a.sent();
                            this.gateway.notifyUser(updated.order.buyer_id, 'delivery_status_update', updated);
                            this.gateway.notifyUser(updated.order.seller.user_id, 'delivery_status_update', updated);
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        DeliveriesService_1.prototype.findOne = function (deliveryId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var delivery, isBuyer, isSeller, isRider;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.delivery.findUnique({
                                where: { id: deliveryId },
                                include: {
                                    order: {
                                        include: {
                                            product: true,
                                            buyer: true,
                                            seller: { include: { user: true } }
                                        }
                                    },
                                    rider: { include: { user: true } }
                                }
                            })];
                        case 1:
                            delivery = _b.sent();
                            if (!delivery)
                                throw new common_1.NotFoundException('Delivery not found');
                            isBuyer = delivery.order.buyer_id === userId;
                            isSeller = delivery.order.seller.user_id === userId;
                            isRider = ((_a = delivery.rider) === null || _a === void 0 ? void 0 : _a.user_id) === userId;
                            if (!isBuyer && !isSeller && !isRider) {
                                throw new common_1.BadRequestException('Unauthorized to view this delivery');
                            }
                            return [2 /*return*/, delivery];
                    }
                });
            });
        };
        DeliveriesService_1.prototype.respondToNegotiation = function (deliveryId, userId, accept) {
            return __awaiter(this, void 0, void 0, function () {
                var delivery, code;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.delivery.findUnique({
                                where: { id: deliveryId },
                                include: { order: true }
                            })];
                        case 1:
                            delivery = _a.sent();
                            if (!delivery)
                                throw new common_1.NotFoundException('Delivery not found');
                            if (delivery.status !== client_1.DeliveryStatus.NEGOTIATING) {
                                throw new common_1.BadRequestException('No active negotiation');
                            }
                            // Verify buyer authorization
                            if (delivery.order.buyer_id !== userId) {
                                throw new common_1.BadRequestException('Only buyer can respond to negotiation');
                            }
                            if (accept) {
                                code = Math.floor(1000 + Math.random() * 9000).toString();
                                return [2 /*return*/, this.prisma.delivery.update({
                                        where: { id: deliveryId },
                                        data: {
                                            status: client_1.DeliveryStatus.ACCEPTED,
                                            code: code
                                        }
                                    })];
                            }
                            else {
                                // Decline - cancel delivery
                                return [2 /*return*/, this.prisma.delivery.update({
                                        where: { id: deliveryId },
                                        data: {
                                            status: client_1.DeliveryStatus.CANCELLED,
                                            negotiated_price: null
                                        }
                                    })];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        DeliveriesService_1.prototype.cancelDelivery = function (deliveryId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var delivery, isBuyer, isSeller;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.delivery.findUnique({
                                where: { id: deliveryId },
                                include: { order: true }
                            })];
                        case 1:
                            delivery = _a.sent();
                            if (!delivery)
                                throw new common_1.NotFoundException('Delivery not found');
                            isBuyer = delivery.order.buyer_id === userId;
                            isSeller = delivery.initiated_by === userId;
                            if (!isBuyer && !isSeller) {
                                throw new common_1.BadRequestException('Unauthorized to cancel this delivery');
                            }
                            // Can only cancel if not yet delivered
                            if (delivery.status === client_1.DeliveryStatus.DELIVERED) {
                                throw new common_1.BadRequestException('Cannot cancel delivered order');
                            }
                            return [2 /*return*/, this.prisma.delivery.update({
                                    where: { id: deliveryId },
                                    data: { status: client_1.DeliveryStatus.CANCELLED }
                                })];
                    }
                });
            });
        };
        return DeliveriesService_1;
    }());
    __setFunctionName(_classThis, "DeliveriesService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DeliveriesService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DeliveriesService = _classThis;
}();
exports.DeliveriesService = DeliveriesService;
