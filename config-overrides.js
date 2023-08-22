/* eslint-disable @typescript-eslint/no-var-requires */
const { override } = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = override();

module.exports = override((config) => {
	if (process.env.ANALYZE) {
		config.plugins.push(new BundleAnalyzerPlugin());
	}
	return config;
});
