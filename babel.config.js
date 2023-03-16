module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo","nativewind/babel"],
    plugins: [
      require.resolve("expo-router/babel"),
      'react-native-reanimated/plugin',
      
    ],
  };
};
