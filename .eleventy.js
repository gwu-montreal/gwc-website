const { EleventyRenderPlugin } = require('@11ty/eleventy');
const yaml = require('js-yaml');
const metagen = require('eleventy-plugin-metagen');
const markdownIt = require('markdown-it');
const markdownItReplacements = require('markdown-it-replacements');

module.exports = function (eleventyConfig) {
  // Add plugin to render MD fragments inside html files
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // eleventy-plugin-metagen
  eleventyConfig.addPlugin(metagen);

  // Configure MD replacements
  const replacements = [
    [/(^|[\s\p{P}])'(\S)/gu, '$1\u2018$2'],
    [/(\S)'([\s\p{P}]|$)/gu, '$1\u2019$2'],
    [/(^|[\s\p{P}])"(\S)/gu, '$1\u201c$2'],
    [/(\S)"([\s\p{P}]|$)/gu, '$1\u201d$2'],
  ];
  for (const r of replacements) {
    markdownItReplacements.replacements.push({
      name: r[1],
      re: r[0],
      sub: r[1],
      default: true,
    });
  }

  // Change default Markdown preprocessor to use above replacements
  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
    }).use(markdownItReplacements, { ellipsis: false })
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
    htmlTemplateEngine: 'njk',
  };
};
