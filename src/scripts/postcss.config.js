module.exports = {
  plugins: {
   'postcss-import': {},
   'postcss-preset-env': {
	   browsers: ['last 2 versions', '> 5%'],
    },
    'tailwindcss': ('./css-config.js'),
    'cssnano': {},
    '@fullhuman/postcss-purgecss': {
      content: ['./_includes/**/*.{scss,njk}', './scripts/**/*.{scss}'],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    },
	}
};