const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
    ...defaultConfig,
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        ...defaultConfig.resolver,
        sourceExts: [...defaultConfig.resolver.sourceExts, 'jsx', 'mjs', 'ts', 'tsx', 'svg'],
    },
};



