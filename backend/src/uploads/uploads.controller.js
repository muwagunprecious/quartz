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
exports.UploadsController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var passport_1 = require("@nestjs/passport");
var swagger_1 = require("@nestjs/swagger");
var multer_1 = require("multer");
var path_1 = require("path");
var UploadsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('uploads'), (0, common_1.Controller)('uploads')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _generatePresignedUrls_decorators;
    var _uploadImages_decorators;
    var _uploadBanner_decorators;
    var _uploadProduct_decorators;
    var UploadsController = _classThis = /** @class */ (function () {
        function UploadsController_1(uploadsService) {
            this.uploadsService = (__runInitializers(this, _instanceExtraInitializers), uploadsService);
        }
        UploadsController_1.prototype.generatePresignedUrls = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!body.fileNames || body.fileNames.length === 0) {
                        throw new common_1.BadRequestException('File names are required');
                    }
                    return [2 /*return*/, this.uploadsService.generatePresignedUrls(body.fileNames)];
                });
            });
        };
        UploadsController_1.prototype.uploadImages = function (files) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.handleUploads(files, 'misc')];
                });
            });
        };
        UploadsController_1.prototype.uploadBanner = function (files) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.handleUploads(files, 'banners')];
                });
            });
        };
        UploadsController_1.prototype.uploadProduct = function (files) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.handleUploads(files, 'products')];
                });
            });
        };
        UploadsController_1.prototype.handleUploads = function (files, folder) {
            if (!files || files.length === 0) {
                throw new common_1.BadRequestException('No files uploaded');
            }
            var urls = files.map(function (file) { return ({
                filename: file.filename,
                url: "".concat(process.env.APP_URL || 'http://localhost:5000', "/uploads/").concat(folder, "/").concat(file.filename),
                size: file.size,
                mimetype: file.mimetype,
            }); });
            return { files: urls };
        };
        return UploadsController_1;
    }());
    __setFunctionName(_classThis, "UploadsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _generatePresignedUrls_decorators = [(0, common_1.Post)('presign'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Generate presigned S3 URLs for file upload' })];
        _uploadImages_decorators = [(0, common_1.Post)('images'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, {
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/misc',
                    filename: function (req, file, cb) {
                        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        cb(null, 'misc-' + uniqueSuffix + (0, path_1.extname)(file.originalname));
                    },
                }),
            })), (0, swagger_1.ApiOperation)({ summary: 'Upload generic images' })];
        _uploadBanner_decorators = [(0, common_1.Post)('banners'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 1, {
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/banners',
                    filename: function (req, file, cb) {
                        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        cb(null, 'banner-' + uniqueSuffix + (0, path_1.extname)(file.originalname));
                    },
                }),
            })), (0, swagger_1.ApiOperation)({ summary: 'Upload banner image' })];
        _uploadProduct_decorators = [(0, common_1.Post)('products'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 5, {
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/products',
                    filename: function (req, file, cb) {
                        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        cb(null, 'product-' + uniqueSuffix + (0, path_1.extname)(file.originalname));
                    },
                }),
            })), (0, swagger_1.ApiOperation)({ summary: 'Upload product images' })];
        __esDecorate(_classThis, null, _generatePresignedUrls_decorators, { kind: "method", name: "generatePresignedUrls", static: false, private: false, access: { has: function (obj) { return "generatePresignedUrls" in obj; }, get: function (obj) { return obj.generatePresignedUrls; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _uploadImages_decorators, { kind: "method", name: "uploadImages", static: false, private: false, access: { has: function (obj) { return "uploadImages" in obj; }, get: function (obj) { return obj.uploadImages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _uploadBanner_decorators, { kind: "method", name: "uploadBanner", static: false, private: false, access: { has: function (obj) { return "uploadBanner" in obj; }, get: function (obj) { return obj.uploadBanner; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _uploadProduct_decorators, { kind: "method", name: "uploadProduct", static: false, private: false, access: { has: function (obj) { return "uploadProduct" in obj; }, get: function (obj) { return obj.uploadProduct; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UploadsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UploadsController = _classThis;
}();
exports.UploadsController = UploadsController;
