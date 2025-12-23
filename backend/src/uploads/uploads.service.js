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
exports.UploadsService = void 0;
var common_1 = require("@nestjs/common");
var client_s3_1 = require("@aws-sdk/client-s3");
var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
var fs = require("fs");
var path = require("path");
var UploadsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UploadsService = _classThis = /** @class */ (function () {
        function UploadsService_1() {
            this.uploadMode = process.env.UPLOAD_MODE || 'local';
            if (this.uploadMode === 's3') {
                this.s3Client = new client_s3_1.S3Client({
                    region: process.env.AWS_REGION || 'us-east-1',
                    credentials: {
                        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
                    },
                });
            }
        }
        /**
         * Generate presigned URLs for S3 upload
         */
        UploadsService_1.prototype.generatePresignedUrls = function (fileNames) {
            return __awaiter(this, void 0, void 0, function () {
                var bucket, baseUrl, urls;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.uploadMode !== 's3') {
                                throw new common_1.BadRequestException('S3 upload mode not enabled');
                            }
                            bucket = process.env.AWS_S3_BUCKET || '';
                            baseUrl = process.env.AWS_S3_URL || '';
                            return [4 /*yield*/, Promise.all(fileNames.map(function (fileName) { return __awaiter(_this, void 0, void 0, function () {
                                    var key, command, uploadUrl, publicUrl;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                key = "products/".concat(Date.now(), "-").concat(fileName);
                                                command = new client_s3_1.PutObjectCommand({
                                                    Bucket: bucket,
                                                    Key: key,
                                                    ContentType: this.getContentType(fileName),
                                                });
                                                return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn: 3600 })];
                                            case 1:
                                                uploadUrl = _a.sent();
                                                publicUrl = "".concat(baseUrl, "/").concat(key);
                                                return [2 /*return*/, { fileName: fileName, uploadUrl: uploadUrl, publicUrl: publicUrl }];
                                        }
                                    });
                                }); }))];
                        case 1:
                            urls = _a.sent();
                            return [2 /*return*/, urls];
                    }
                });
            });
        };
        /**
         * Get local file URL
         */
        UploadsService_1.prototype.getLocalFileUrl = function (filename) {
            var baseUrl = process.env.UPLOAD_LOCAL_URL || 'http://localhost:5000/uploads';
            return "".concat(baseUrl, "/").concat(filename);
        };
        /**
         * Validate uploaded files
         */
        UploadsService_1.prototype.validateFiles = function (files) {
            var maxFiles = parseInt(process.env.UPLOAD_MAX_FILES || '10');
            if (files.length > maxFiles) {
                throw new common_1.BadRequestException("Maximum ".concat(maxFiles, " files allowed"));
            }
            var maxSize = parseInt(process.env.UPLOAD_MAX_FILE_SIZE || '5242880');
            var invalidFiles = files.filter(function (file) { return file.size > maxSize; });
            if (invalidFiles.length > 0) {
                throw new common_1.BadRequestException('One or more files exceed maximum size');
            }
        };
        /**
         * Delete local file
         */
        UploadsService_1.prototype.deleteLocalFile = function (filename) {
            var uploadPath = process.env.UPLOAD_LOCAL_PATH || './uploads';
            var filePath = path.join(uploadPath, filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        };
        /**
         * Get content type from filename
         */
        UploadsService_1.prototype.getContentType = function (filename) {
            var ext = path.extname(filename).toLowerCase();
            var contentTypes = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.webp': 'image/webp',
                '.gif': 'image/gif',
            };
            return contentTypes[ext] || 'application/octet-stream';
        };
        return UploadsService_1;
    }());
    __setFunctionName(_classThis, "UploadsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UploadsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UploadsService = _classThis;
}();
exports.UploadsService = UploadsService;
