/** @type {import('next').NextConfig} */
const env =  require('./env');
const nextConfig = {
  reactStrictMode: true,
  env:{
    ...env
  }
}

module.exports = nextConfig
