const CracoLessPlugin = require('craco-less');
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              "@primary-color": "black",
              "@menu-item-active-bg": '#F8F8F8',
              "@menu-inline-submenu-bg" : 'white'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};