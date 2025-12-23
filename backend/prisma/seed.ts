import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // 1. Seed Universities
    const universities = [
        { name: 'University of Lagos', slug: 'unilag', city: 'Lagos' },
        { name: 'Covenant University', slug: 'covenant', city: 'Ota' },
        { name: 'Babcock University', slug: 'babcock', city: 'Ilishan-Remo' },
    ];

    for (const uni of universities) {
        await prisma.university.upsert({
            where: { slug: uni.slug },
            update: {},
            create: uni,
        });
    }

    // 2. Seed Categories
    const categories = [
        { name: 'Textbooks', slug: 'textbooks' },
        { name: 'Electronics', slug: 'electronics' },
        { name: 'Furniture', slug: 'furniture' },
        { name: 'Fashion', slug: 'fashion' },
        { name: 'Food', slug: 'food' },
        { name: 'Services', slug: 'services' },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }

    // 3. Seed Admin User (Secure)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@campusmart.com';
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword && process.env.NODE_ENV === 'production') {
        throw new Error('ADMIN_PASSWORD environment variable must be set in production');
    }

    const finalPassword = adminPassword || 'admin123';
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (!existingAdmin) {
        const passwordHash = await bcrypt.hash(finalPassword, 10);
        await prisma.user.create({
            data: {
                name: 'Super Admin',
                email: adminEmail,
                password_hash: passwordHash,
                role: 'ADMIN',
            },
        });
        console.log(`Admin user created with email: ${adminEmail}`);
    } else {
        // Update admin password if it exists to match env var
        const passwordHash = await bcrypt.hash(finalPassword, 10);
        await prisma.user.update({
            where: { email: adminEmail },
            data: { password_hash: passwordHash }
        });
        console.log(`Admin password updated for: ${adminEmail}`);
    }

    // 4. Seed Seller & Product
    const sellerEmail = 'seller@campusmart.com';
    const existingSeller = await prisma.user.findUnique({ where: { email: sellerEmail } });

    if (!existingSeller) {
        const passwordHash = await bcrypt.hash('seller123', 10);
        const sellerUser = await prisma.user.create({
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
        });

        // Add a product for this seller
        await prisma.product.create({
            data: {
                title: 'Used MacBook Pro M1',
                description: 'Clean UK used, 8GB RAM, 256GB SSD. Slight dent on the edge.',
                price: 450000,
                condition: 'Used',
                seller: { connect: { id: sellerUser.seller_profile!.id } },
                university: { connect: { id: sellerUser.university_id! } },
                category: { connect: { slug: 'electronics' } },
                images: {
                    create: [
                        { url: 'https://placehold.co/600x400?text=MacBook+Pro' },
                        { url: 'https://placehold.co/600x400?text=Side+View' }
                    ]
                }
            }
        });
        console.log('Seller and Product created.');
    }

    // 5. Seed Rider
    const riderEmail = 'rider@campusmart.com';
    const existingRider = await prisma.user.findUnique({ where: { email: riderEmail } });

    if (!existingRider) {
        const passwordHash = await bcrypt.hash('rider123', 10);
        await prisma.user.create({
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
        });
        console.log('Rider created.');
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
