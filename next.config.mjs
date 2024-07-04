/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.ignoreWarnings = [{
            module: /sequelize/
        }]
        return config;
    },
};

export default nextConfig;
