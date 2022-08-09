var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		app: './src/scripts/main.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
				  {
					loader: 'file-loader',
					options: {
					  name: '[name].[ext]',
					  outputPath: './assets/fonts/'
					}
				  }
				]
			  },
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
						importLoaders: 1,
						}
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader',
					}
					]
			}
		]
	},

	output: {
		path: path.join(__dirname, '/'),
		publicPath: '',
		filename: './assets/js/main.js'
	},

	plugins: [
		new MiniCssExtractPlugin({
      		filename: './_includes/assets/css/main.css',
		})
	],
};