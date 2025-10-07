module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add support for native modules
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        'react-native$': 'react-native-web',
      };
      
      return webpackConfig;
    },
  },
};