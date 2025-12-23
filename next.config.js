/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/login',
                destination: '/auth/login',
                permanent: true,
            },
            {
                source: '/register',
                destination: '/auth/signup',
                permanent: true,
            },
            {
                source: '/signup',
                destination: '/auth/signup',
                permanent: true,
            },
            {
                source: '/profile',
                destination: '/seller/dashboard', // Defaulting to seller dashboard for now as requested by user context often implies seller
                permanent: false,
            },

        ];
    },
};

module.exports = nextConfig;
