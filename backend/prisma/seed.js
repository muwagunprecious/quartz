"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = require("bcryptjs");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var universities, _i, universities_1, uni, categories, _a, categories_1, cat, adminEmail, existingAdmin, passwordHash, sellerEmail, existingSeller, passwordHash, sellerUser, riderEmail, existingRider, passwordHash;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('Seeding database...');
                    universities = [
                        { name: 'University of Lagos', slug: 'unilag', city: 'Lagos' },
                        { name: 'Covenant University', slug: 'covenant', city: 'Ota' },
                        { name: 'Babcock University', slug: 'babcock', city: 'Ilishan-Remo' },
                    ];
                    _i = 0, universities_1 = universities;
                    _b.label = 1;
                case 1:
                    if (!(_i < universities_1.length)) return [3 /*break*/, 4];
                    uni = universities_1[_i];
                    return [4 /*yield*/, prisma.university.upsert({
                            where: { slug: uni.slug },
                            update: {},
                            create: uni,
                        })];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    categories = [
                        { name: 'Textbooks', slug: 'textbooks' },
                        { name: 'Electronics', slug: 'electronics' },
                        { name: 'Furniture', slug: 'furniture' },
                        { name: 'Fashion', slug: 'fashion' },
                        { name: 'Food', slug: 'food' },
                        { name: 'Services', slug: 'services' },
                    ];
                    _a = 0, categories_1 = categories;
                    _b.label = 5;
                case 5:
                    if (!(_a < categories_1.length)) return [3 /*break*/, 8];
                    cat = categories_1[_a];
                    return [4 /*yield*/, prisma.category.upsert({
                            where: { slug: cat.slug },
                            update: {},
                            create: cat,
                        })];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    _a++;
                    return [3 /*break*/, 5];
                case 8:
                    adminEmail = 'admin@campusmart.com';
                    return [4 /*yield*/, prisma.user.findUnique({ where: { email: adminEmail } })];
                case 9:
                    existingAdmin = _b.sent();
                    if (!!existingAdmin) return [3 /*break*/, 12];
                    return [4 /*yield*/, bcrypt.hash('admin123', 10)];
                case 10:
                    passwordHash = _b.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                name: 'Super Admin',
                                email: adminEmail,
                                password_hash: passwordHash,
                                role: 'ADMIN',
                            },
                        })];
                case 11:
                    _b.sent();
                    console.log('Admin user created.');
                    _b.label = 12;
                case 12:
                    sellerEmail = 'seller@campusmart.com';
                    return [4 /*yield*/, prisma.user.findUnique({ where: { email: sellerEmail } })];
                case 13:
                    existingSeller = _b.sent();
                    if (!!existingSeller) return [3 /*break*/, 17];
                    return [4 /*yield*/, bcrypt.hash('seller123', 10)];
                case 14:
                    passwordHash = _b.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                name: 'Demo Seller',
                                email: sellerEmail,
                                password_hash: passwordHash,
                                role: 'SELLER',
                                university: { connect: { slug: 'unilag' } }, // Connect to Unilag
                                seller_profile: {
                                    create: {
                                        bio: 'Best gadgets on campus!',
                                        rating: 4.8,
                                    }
                                }
                            },
                            include: { seller_profile: true }
                        })];
                case 15:
                    sellerUser = _b.sent();
                    // Add a product for this seller
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                title: 'Used MacBook Pro M1',
                                description: 'Clean UK used, 8GB RAM, 256GB SSD. Slight dent on the edge.',
                                price: 450000,
                                condition: 'Used',
                                seller_id: sellerUser.seller_profile.id,
                                university_id: sellerUser.university_id,
                                category: { connect: { slug: 'electronics' } },
                                images: {
                                    create: [
                                        { url: 'https://placehold.co/600x400?text=MacBook+Pro' },
                                        { url: 'https://placehold.co/600x400?text=Side+View' }
                                    ]
                                }
                            }
                        })];
                case 16:
                    // Add a product for this seller
                    _b.sent();
                    console.log('Seller and Product created.');
                    _b.label = 17;
                case 17:
                    riderEmail = 'rider@campusmart.com';
                    return [4 /*yield*/, prisma.user.findUnique({ where: { email: riderEmail } })];
                case 18:
                    existingRider = _b.sent();
                    if (!!existingRider) return [3 /*break*/, 21];
                    return [4 /*yield*/, bcrypt.hash('rider123', 10)];
                case 19:
                    passwordHash = _b.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                name: 'Demo Rider',
                                email: riderEmail,
                                password_hash: passwordHash,
                                role: 'RIDER',
                                university: { connect: { slug: 'unilag' } },
                                rider_profile: {
                                    create: {
                                        university: { connect: { slug: 'unilag' } },
                                        nin_encrypted: 'eryt34563456', // Mock encrypted
                                        is_online: true,
                                        verification_status: 'VERIFIED',
                                        vehicle_info: 'Blue Yamaha Bike (LAG-123-QA)',
                                        phone_verified: true
                                    }
                                }
                            }
                        })];
                case 20:
                    _b.sent();
                    console.log('Rider created.');
                    _b.label = 21;
                case 21:
                    console.log('Seeding completed.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
