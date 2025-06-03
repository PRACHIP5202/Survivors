// postcss.config.js
export default {
  plugins: {
    // Only use these basic plugins, nothing fancy
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-properties': false
      }
    }
    // Removed cssnano to avoid minification issues
  }
}
