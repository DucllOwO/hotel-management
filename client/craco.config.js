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
              "@menu-item-active-bg": '#00b16',
              "@menu-inline-submenu-bg" : 'white'
              
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};