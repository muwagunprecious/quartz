
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await prisma.user.update({
        where: { email: 'admin@campusmart.com' },
        data: { password_hash: passwordHash },
    });
    console.log('Admin password reset to: admin123');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
