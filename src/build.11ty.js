const esbuild = require('esbuild');

class BuildTemplate {
  data() {
    return {
      permalink: false,
      eleventyExcludeFromCollections: true,
    };
  }

  async render() {
    const commonOptions = {
      minify: process.env.NODE_ENV === 'production',
      target: 'chrome90',
    };

    await esbuild.build({
      entryPoints: ['src/_build/js/init.js'],
      bundle: true,
      outfile: '_site/script.js',
      ...commonOptions,
    });
  }
}

module.exports = BuildTemplate;
