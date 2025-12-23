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
exports.ToggleStockDto = exports.AddProductImagesDto = exports.UpdateProductDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var client_1 = require("@prisma/client");
var UpdateProductDto = function () {
    var _a;
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _condition_decorators;
    var _condition_initializers = [];
    var _condition_extraInitializers = [];
    var _stock_status_decorators;
    var _stock_status_initializers = [];
    var _stock_status_extraInitializers = [];
    var _whatsapp_number_decorators;
    var _whatsapp_number_initializers = [];
    var _whatsapp_number_extraInitializers = [];
    var _category_id_decorators;
    var _category_id_initializers = [];
    var _category_id_extraInitializers = [];
    var _is_published_decorators;
    var _is_published_initializers = [];
    var _is_published_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateProductDto() {
                this.title = __runInitializers(this, _title_initializers, void 0);
                this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _price_initializers, void 0));
                this.condition = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _condition_initializers, void 0));
                this.stock_status = (__runInitializers(this, _condition_extraInitializers), __runInitializers(this, _stock_status_initializers, void 0));
                this.whatsapp_number = (__runInitializers(this, _stock_status_extraInitializers), __runInitializers(this, _whatsapp_number_initializers, void 0));
                this.category_id = (__runInitializers(this, _whatsapp_number_extraInitializers), __runInitializers(this, _category_id_initializers, void 0));
                this.is_published = (__runInitializers(this, _category_id_extraInitializers), __runInitializers(this, _is_published_initializers, void 0));
                __runInitializers(this, _is_published_extraInitializers);
            }
            return UpdateProductDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _title_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Product title' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Product description' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _price_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Product price' }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _condition_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Product condition' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _stock_status_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Stock status', enum: client_1.StockStatus }), (0, class_validator_1.IsEnum)(client_1.StockStatus), (0, class_validator_1.IsOptional)()];
            _whatsapp_number_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'WhatsApp number' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _category_id_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Category ID' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _is_published_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Published status' }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(null, null, _condition_decorators, { kind: "field", name: "condition", static: false, private: false, access: { has: function (obj) { return "condition" in obj; }, get: function (obj) { return obj.condition; }, set: function (obj, value) { obj.condition = value; } }, metadata: _metadata }, _condition_initializers, _condition_extraInitializers);
            __esDecorate(null, null, _stock_status_decorators, { kind: "field", name: "stock_status", static: false, private: false, access: { has: function (obj) { return "stock_status" in obj; }, get: function (obj) { return obj.stock_status; }, set: function (obj, value) { obj.stock_status = value; } }, metadata: _metadata }, _stock_status_initializers, _stock_status_extraInitializers);
            __esDecorate(null, null, _whatsapp_number_decorators, { kind: "field", name: "whatsapp_number", static: false, private: false, access: { has: function (obj) { return "whatsapp_number" in obj; }, get: function (obj) { return obj.whatsapp_number; }, set: function (obj, value) { obj.whatsapp_number = value; } }, metadata: _metadata }, _whatsapp_number_initializers, _whatsapp_number_extraInitializers);
            __esDecorate(null, null, _category_id_decorators, { kind: "field", name: "category_id", static: false, private: false, access: { has: function (obj) { return "category_id" in obj; }, get: function (obj) { return obj.category_id; }, set: function (obj, value) { obj.category_id = value; } }, metadata: _metadata }, _category_id_initializers, _category_id_extraInitializers);
            __esDecorate(null, null, _is_published_decorators, { kind: "field", name: "is_published", static: false, private: false, access: { has: function (obj) { return "is_published" in obj; }, get: function (obj) { return obj.is_published; }, set: function (obj, value) { obj.is_published = value; } }, metadata: _metadata }, _is_published_initializers, _is_published_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateProductDto = UpdateProductDto;
var AddProductImagesDto = function () {
    var _a;
    var _imageUrls_decorators;
    var _imageUrls_initializers = [];
    var _imageUrls_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AddProductImagesDto() {
                this.imageUrls = __runInitializers(this, _imageUrls_initializers, void 0);
                __runInitializers(this, _imageUrls_extraInitializers);
            }
            return AddProductImagesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _imageUrls_decorators = [(0, swagger_1.ApiProperty)({ description: 'Array of image URLs', type: [String] }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            __esDecorate(null, null, _imageUrls_decorators, { kind: "field", name: "imageUrls", static: false, private: false, access: { has: function (obj) { return "imageUrls" in obj; }, get: function (obj) { return obj.imageUrls; }, set: function (obj, value) { obj.imageUrls = value; } }, metadata: _metadata }, _imageUrls_initializers, _imageUrls_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AddProductImagesDto = AddProductImagesDto;
var ToggleStockDto = function () {
    var _a;
    var _stock_status_decorators;
    var _stock_status_initializers = [];
    var _stock_status_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ToggleStockDto() {
                this.stock_status = __runInitializers(this, _stock_status_initializers, void 0);
                __runInitializers(this, _stock_status_extraInitializers);
            }
            return ToggleStockDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _stock_status_decorators = [(0, swagger_1.ApiProperty)({ description: 'Stock status', enum: client_1.StockStatus }), (0, class_validator_1.IsEnum)(client_1.StockStatus)];
            __esDecorate(null, null, _stock_status_decorators, { kind: "field", name: "stock_status", static: false, private: false, access: { has: function (obj) { return "stock_status" in obj; }, get: function (obj) { return obj.stock_status; }, set: function (obj, value) { obj.stock_status = value; } }, metadata: _metadata }, _stock_status_initializers, _stock_status_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ToggleStockDto = ToggleStockDto;
