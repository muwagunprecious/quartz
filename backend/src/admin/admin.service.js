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
exports.AdminService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var AdminService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminService = _classThis = /** @class */ (function () {
        function AdminService_1(prisma) {
            this.prisma = prisma;
        }
        // --- Content Management ---
        AdminService_1.prototype.getBanners = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.banner.findMany({ orderBy: { created_at: 'desc' } })];
                });
            });
        };
        AdminService_1.prototype.createBanner = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.banner.create({ data: data })];
                });
            });
        };
        AdminService_1.prototype.toggleBanner = function (id, is_active) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.banner.update({ where: { id: id }, data: { is_active: is_active } })];
                });
            });
        };
        AdminService_1.prototype.deleteBanner = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.banner.delete({ where: { id: id } })];
                });
            });
        };
        // --- Page & Section Control ---
        AdminService_1.prototype.getPageControls = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.pageControl.findMany()];
                });
            });
        };
        AdminService_1.prototype.updatePageControl = function (page, section, is_enabled, msg) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.pageControl.upsert({
                            where: { page_name_section_name: { page_name: page, section_name: section || '' } },
                            update: { is_enabled: is_enabled, maintenance_msg: msg },
                            create: { page_name: page, section_name: section || '', is_enabled: is_enabled, maintenance_msg: msg },
                        })];
                });
            });
        };
        // --- User Management ---
        AdminService_1.prototype.getUsers = function (role) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = role ? { role: role } : {};
                    return [2 /*return*/, this.prisma.user.findMany({
                            where: where,
                            include: { seller_profile: true, rider_profile: true },
                            orderBy: { created_at: 'desc' }
                        })];
                });
            });
        };
        AdminService_1.prototype.banUser = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.user.update({ where: { id: userId }, data: { is_banned: true, is_active: false } })];
                });
            });
        };
        AdminService_1.prototype.unbanUser = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.user.update({ where: { id: userId }, data: { is_banned: false, is_active: true } })];
                });
            });
        };
        // --- Delivery & Riders ---
        AdminService_1.prototype.getRiders = function (status) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = status ? { verification_status: status } : {};
                    return [2 /*return*/, this.prisma.riderProfile.findMany({
                            where: where,
                            include: { user: { select: { name: true, email: true, phone_verified: true } }, university: true }
                        })];
                });
            });
        };
        AdminService_1.prototype.verifyRider = function (riderId_1) {
            return __awaiter(this, arguments, void 0, function (riderId, status) {
                var rider;
                if (status === void 0) { status = client_1.VerificationStatus.VERIFIED; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.riderProfile.findUnique({ where: { id: riderId } })];
                        case 1:
                            rider = _a.sent();
                            if (!rider)
                                throw new common_1.NotFoundException('Rider not found');
                            return [2 /*return*/, this.prisma.riderProfile.update({
                                    where: { id: riderId },
                                    data: { verification_status: status }
                                })];
                    }
                });
            });
        };
        // --- Seller & Inventory ---
        AdminService_1.prototype.getInventoryStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // This is heavy, in production use aggregations or cache
                    return [2 /*return*/, this.prisma.sellerProfile.findMany({
                            include: {
                                _count: { select: { products: true, orders_sold: true } },
                                user: { select: { name: true } }
                            },
                            take: 20,
                            orderBy: { orders_sold: { _count: 'desc' } }
                        })];
                });
            });
        };
        // --- Complaints ---
        AdminService_1.prototype.getComplaints = function (status) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = status ? { status: status } : {};
                    return [2 /*return*/, this.prisma.complaint.findMany({
                            where: where,
                            include: { user: { select: { name: true, email: true } } },
                            orderBy: { created_at: 'desc' }
                        })];
                });
            });
        };
        AdminService_1.prototype.resolveComplaint = function (id_1, response_1) {
            return __awaiter(this, arguments, void 0, function (id, response, status) {
                if (status === void 0) { status = 'RESOLVED'; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.complaint.update({
                            where: { id: id },
                            data: { response: response, status: status }
                        })];
                });
            });
        };
        // --- Analytics ---
        AdminService_1.prototype.getDashboardStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, users, products, orders, revenue;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.prisma.user.count(),
                                this.prisma.product.count(),
                                this.prisma.order.count(),
                                this.prisma.order.aggregate({ _sum: { price_total: true } })
                            ])];
                        case 1:
                            _a = _b.sent(), users = _a[0], products = _a[1], orders = _a[2], revenue = _a[3];
                            return [2 /*return*/, {
                                    total_users: users,
                                    total_products: products,
                                    total_orders: orders,
                                    total_revenue: revenue._sum.price_total || 0
                                }];
                    }
                });
            });
        };
        return AdminService_1;
    }());
    __setFunctionName(_classThis, "AdminService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminService = _classThis;
}();
exports.AdminService = AdminService;
