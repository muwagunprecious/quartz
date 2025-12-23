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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcryptjs");
var auth_dto_1 = require("./dto/auth.dto");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(usersService, jwtService, prisma) {
            this.usersService = usersService;
            this.jwtService = jwtService;
            this.prisma = prisma;
        }
        AuthService_1.prototype.register = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, hashedPassword;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersService.findOne(dto.email)];
                        case 1:
                            existing = _a.sent();
                            if (existing) {
                                throw new common_1.BadRequestException('Email already in use');
                            }
                            return [4 /*yield*/, bcrypt.hash(dto.password, 10)];
                        case 2:
                            hashedPassword = _a.sent();
                            // Create user logic
                            // We need to handle transaction if creating profiles
                            // For simplicity, we create user then profile. Ideally use prisma.$transaction
                            return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var user, encrypt, encryptedNin;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.user.create({
                                                    data: {
                                                        name: dto.name,
                                                        email: dto.email,
                                                        password_hash: hashedPassword,
                                                        role: dto.role,
                                                        university_id: dto.university_id,
                                                        whatsapp_number: dto.whatsapp_number,
                                                    },
                                                })];
                                            case 1:
                                                user = _a.sent();
                                                if (!(dto.role === auth_dto_1.UserRole.SELLER)) return [3 /*break*/, 3];
                                                return [4 /*yield*/, tx.sellerProfile.create({
                                                        data: { user_id: user.id },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                return [3 /*break*/, 6];
                                            case 3:
                                                if (!(dto.role === auth_dto_1.UserRole.RIDER)) return [3 /*break*/, 6];
                                                if (!dto.nin || !dto.university_id)
                                                    throw new common_1.BadRequestException('Riders need NIN and University');
                                                return [4 /*yield*/, Promise.resolve().then(function () { return require('../common/utils/encryption.util'); })];
                                            case 4:
                                                encrypt = (_a.sent()).encrypt;
                                                encryptedNin = encrypt(dto.nin);
                                                return [4 /*yield*/, tx.riderProfile.create({
                                                        data: {
                                                            user_id: user.id,
                                                            university_id: dto.university_id,
                                                            nin_encrypted: encryptedNin,
                                                            is_online: false,
                                                        },
                                                    })];
                                            case 5:
                                                _a.sent();
                                                _a.label = 6;
                                            case 6: return [2 /*return*/, this.generateTokens(user)];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        AuthService_1.prototype.login = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isMatch;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersService.findOne(dto.email)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('Invalid credentials');
                            }
                            if (user.is_banned) {
                                throw new common_1.UnauthorizedException('Your account has been banned. Please contact support.');
                            }
                            return [4 /*yield*/, bcrypt.compare(dto.password, user.password_hash)];
                        case 2:
                            isMatch = _a.sent();
                            if (!isMatch) {
                                throw new common_1.UnauthorizedException('Invalid credentials');
                            }
                            return [2 /*return*/, this.generateTokens(user)];
                    }
                });
            });
        };
        AuthService_1.prototype.generateTokens = function (user) {
            var payload = { sub: user.id, email: user.email, role: user.role, university_id: user.university_id };
            var accessToken = this.jwtService.sign(payload, {
                expiresIn: process.env.JWT_EXPIRES_IN || '15m',
            });
            var refreshToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'secretKey',
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
            });
            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    university_id: user.university_id
                }
            };
        };
        AuthService_1.prototype.refreshToken = function (refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, user, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            payload = this.jwtService.verify(refreshToken, {
                                secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'secretKey',
                            });
                            return [4 /*yield*/, this.validateUser(payload)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('Invalid refresh token');
                            }
                            return [2 /*return*/, this.generateTokens(user)];
                        case 2:
                            error_1 = _a.sent();
                            throw new common_1.UnauthorizedException('Invalid refresh token');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.validateUser = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.usersService.findById(payload.sub)];
                });
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
