module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        'react-native-worklets/plugin', // <- plugin Reanimated mis à jour
      ],
    };
  };
  