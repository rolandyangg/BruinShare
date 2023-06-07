/** @type {import('next').NextConfig} */
const withImages = require('next-images');

module.exports = withImages({
  reactStrictMode: false,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
});