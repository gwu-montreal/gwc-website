const { EleventyRenderPlugin, EleventyI18nPlugin } = require('@11ty/eleventy');
const fs = require('graceful-fs');
const yaml = require('js-yaml');
const metagen = require('eleventy-plugin-metagen');
const markdownIt = require('markdown-it');
const mditContainer = require('markdown-it-container');
const mditAttrs = require('markdown-it-attrs');
const i18n = require('eleventy-plugin-i18n');

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
  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents));

  // Create translations object
  const langs = ['en', 'de', 'fr'];
  const translations = {};
  for (const lang of langs) {
    const i18nFile = yaml.load(
      fs.readFileSync(`src/_i18n/localization.${lang}.yaml`, 'utf8')
    );
    for (const { key, t } of i18nFile.data) {
      if (!translations[key]) {
        translations[key] = {};
      }
      translations[key][lang] = t;
    }
  }

  // eleventy (as of v2.0.0-canary.14) currently has a built-in
  // internationalization plugin (https://www.11ty.dev/docs/plugins/i18n/), but
  // it doesn't localize any strings, values, numbers, etc. so their
  // documentation recommends using a third-party internationalization plugin in
  // tandem. the built-in plugin provides filters to retrieve the current page's
  // locale (though not the language *label* for the current locale --
  // unhelpfully, we have to implement that ourselves) as well as the alternate
  // locales available for the current page. the third-party
  // `eleventy-plugin-i18n` provides string localization (which we can use for the language
  // labels), but lacks the built-in plugin's filters.

  // the third-party i18n plugin:
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: { '*': 'en' },
  });

  // the built-in i18n plugin:
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
    // when to throw errors for missing localized content files:
    // errorMode: 'strict', // throw an error if content is missing at /en/slug
    errorMode: 'allow-fallback', // only throw an error when the content is missing at both /en/slug and /slug
    // errorMode: "never", // don’t throw errors for missing content
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
