import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['image.tmdb.org'], // ✅ allows TMDB images to load via <Image />
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true
          }
        }
      ]
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js"
        }
      }
    }
  }
};


export default nextConfig;
