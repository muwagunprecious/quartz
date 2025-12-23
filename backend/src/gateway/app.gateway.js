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
exports.AppGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var AppGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)({
            cors: {
                origin: '*',
            },
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handleJoinDelivery_decorators;
    var _handleSendMessage_decorators;
    var AppGateway = _classThis = /** @class */ (function () {
        function AppGateway_1(jwtService) {
            this.jwtService = (__runInitializers(this, _instanceExtraInitializers), jwtService);
            this.server = __runInitializers(this, _server_initializers, void 0);
            __runInitializers(this, _server_extraInitializers);
            this.jwtService = jwtService;
        }
        AppGateway_1.prototype.handleConnection = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var token, payload;
                var _a;
                return __generator(this, function (_b) {
                    try {
                        token = client.handshake.auth.token || ((_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
                        if (!token) {
                            client.disconnect();
                            return [2 /*return*/];
                        }
                        payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'secretKey' });
                        // Join room based on user ID
                        client.join("user:".concat(payload.sub));
                        if (payload.role === 'RIDER') {
                            client.join("rider:".concat(payload.sub));
                            // Also join university room for riders to get new requests
                            if (payload.university_id) {
                                client.join("university:".concat(payload.university_id, ":riders"));
                            }
                        }
                    }
                    catch (e) {
                        client.disconnect();
                    }
                    return [2 /*return*/];
                });
            });
        };
        AppGateway_1.prototype.handleDisconnect = function (client) {
            // cleanup
        };
        // Example method to emit event (called from Services)
        AppGateway_1.prototype.notifyUser = function (userId, event, data) {
            this.server.to("user:".concat(userId)).emit(event, data);
        };
        AppGateway_1.prototype.notifyRiders = function (universityId, event, data) {
            this.server.to("university:".concat(universityId, ":riders")).emit(event, data);
        };
        AppGateway_1.prototype.handleJoinDelivery = function (data, client) {
            client.join("delivery:".concat(data.deliveryId));
            return { event: 'joined_delivery', data: { deliveryId: data.deliveryId } };
        };
        AppGateway_1.prototype.handleSendMessage = function (data, client) {
            // In real app, save to DB here (Message model)
            var messagePayload = {
                id: Math.random().toString(36).substr(2, 9),
                text: data.text,
                senderName: data.senderName,
                senderId: data.senderId,
                timestamp: new Date().toISOString(),
            };
            this.server.to("delivery:".concat(data.deliveryId)).emit('new_message', messagePayload);
        };
        return AppGateway_1;
    }());
    __setFunctionName(_classThis, "AppGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleJoinDelivery_decorators = [(0, websockets_1.SubscribeMessage)('join_delivery')];
        _handleSendMessage_decorators = [(0, websockets_1.SubscribeMessage)('send_message')];
        __esDecorate(_classThis, null, _handleJoinDelivery_decorators, { kind: "method", name: "handleJoinDelivery", static: false, private: false, access: { has: function (obj) { return "handleJoinDelivery" in obj; }, get: function (obj) { return obj.handleJoinDelivery; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleSendMessage_decorators, { kind: "method", name: "handleSendMessage", static: false, private: false, access: { has: function (obj) { return "handleSendMessage" in obj; }, get: function (obj) { return obj.handleSendMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppGateway = _classThis;
}();
exports.AppGateway = AppGateway;
