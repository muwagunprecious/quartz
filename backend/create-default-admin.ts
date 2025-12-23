
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@gmail.com';
    const password = 'admin123';
    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
        where: { email },
        update: {
            password_hash: passwordHash,
            role: 'ADMIN',
            is_active: true,
            is_banned: false
        },
        create: {
            name: 'Default Admin',
            email,
            password_hash: passwordHash,
            role: 'ADMIN',
            is_active: true,
            is_banned: false
        },
    });

    console.log('Default Admin user upserted:');
    console.log('Email:', admin.email);
    console.log('Password:', password);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
