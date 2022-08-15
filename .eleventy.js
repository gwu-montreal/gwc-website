const { EleventyRenderPlugin } = require('@11ty/eleventy');
const yaml = require('js-yaml');
const metagen = require('eleventy-plugin-metagen');
const markdownIt = require('markdown-it');
const mditContainer = require('markdown-it-container');
const mditAttrs = require('markdown-it-attrs');

module.exports = function (eleventyConfig) {
  // Add plugin to render MD fragments inside html files
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // eleventy-plugin-metagen
  eleventyConfig.addPlugin(metagen);

  // Change default Markdown preprocessor to use plugins
  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      typographer: true,
      breaks: true,
      linkify: true,
    })
      .use(mditContainer, 'div', {
        validate: () => true,
      })
      .use(mditAttrs, {
        leftDelimiter: '<!--+',
        rightDelimiter: '-->',
        allowedAttributes: ['id', 'class'],
      })
  );

  // Disable automatic use of .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // Read yaml data files
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // Add i18n shortcode
  eleventyConfig.addShortcode('i18n', function (str) {
    const t = (this.ctx.i18n.find(e => e.key === str) || {}).t;
    return t || `<span class="untranslated">${str}</span>`;
  });

  // Copy assets to /_site
  eleventyConfig.addPassthroughCopy({
    'src/_assets': 'assets/',
    'netlify-cms': 'admin/',
  });

  // Add CSS & JS output to watch target
  eleventyConfig.addWatchTarget('./src/_build/');

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: 'src',
      includes: '_build/layouts',
      data: '_data',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
