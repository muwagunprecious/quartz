import * as fs from 'fs';
import * as path from 'path';

export const getUploadPath = (subDir: string = '') => {
    const basePath = process.env.UPLOAD_PATH || path.join(process.cwd(), 'uploads');
    return path.join(basePath, subDir);
};

export const initUploadDirectories = () => {
    const dirs = [
        '',
        'products',
        'banners',
        'users',
        'profiles',
        'misc',
        'documents'
    ];

    dirs.forEach(dir => {
        const fullPath = getUploadPath(dir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
            console.log(`Created directory: ${fullPath}`);
        }
    });
};
