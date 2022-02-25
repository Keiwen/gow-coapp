module.exports = {
  outputDir: 'docs',
  transpileDependencies: [
    /\bvue-awesome\b/
  ],
  publicPath: '/gow-coapp/',
  pwa: {
    name: 'GoW Companion App',
    start_url: '/gow-coapp/',
    display: 'standalone',
    orientation: 'landscape'
  }
}
