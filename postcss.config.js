module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('postcss-each'),
    require('postcss-nested'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production'
      ? [
          require('cssnano')({
            preset: 'default',
          }),
        ]
      : []),
  ],
};
