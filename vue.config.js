module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/ume-ems/rest/s01/': {
        target: 'http://localhost:8081',
      },
    },
  },
};
