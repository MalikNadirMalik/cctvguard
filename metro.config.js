// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://facebook.github.io/metro/docs/configuration
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);


const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = function (baseConfig) {
    const defaultConfig = mergeConfig(baseConfig, getDefaultConfig(__dirname));
    const { resolver: { assetExts, sourceExts } } = defaultConfig;

    return mergeConfig(
        defaultConfig,
        {
            resolver: {
                assetExts: assetExts.filter(ext => ext !== 'svg'),
                sourceExts: [...sourceExts, 'svg'],
            },
        },
    );
};