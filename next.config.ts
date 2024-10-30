import type { Configuration as WebpackConfig } from 'webpack';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config: WebpackConfig) => {
    // Ensure config.module and config.module.rules exist
    if (!config.module) {
      config.module = {
        rules: []
      };
    }

    if (!config.module.rules) {
      config.module.rules = [];
    }

    // Now safely add the rule
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource'
    });

    // Ensure config.output exists
    config.output = {
      ...config.output,
      assetModuleFilename: 'static/[hash][ext]'
    };

    return config;
  }
};

export default nextConfig;