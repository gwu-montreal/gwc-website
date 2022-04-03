const { DateTime } = require('luxon');
const yaml = require('js-yaml');
const metagen = require('eleventy-plugin-metagen');
const markdownIt = require('markdown-it');
const markdownItReplacements = require('markdown-it-replacements');
const embed = require('eleventy-plugin-embed-everything');
const heroicons = require('eleventy-plugin-heroicons');

module.exports = function (eleventyConfig) {
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

  // eleventy-plugin-embed-everything
  eleventyConfig.addPlugin(embed, {
    youtube: {
      options: {
        embedClass: 'embed youtube',
        lite: true,
      },
    },
    twitter: {
      options: {
        embedClass: 'embed twitter',
        doNotTrack: true,
        theme: 'dark',
        align: 'center',
        width: 550,
      },
    },
  });

  // eleventy-plugin-heroicons
  eleventyConfig.addPlugin(heroicons, { className: 'heroicon' });

  // Disable automatic use of .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // Human readable date
  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });

  // Read yaml files from _data folder
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // Copy admin config to /_site
  eleventyConfig.addPassthroughCopy({
    './src/pages/admin/config.yml': 'admin/config.yml',
  });

  // Copy assets to /_site
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets/' });

  // Copy favicon to root of /_site
  eleventyConfig.addPassthroughCopy({ 'src/favicon.ico': 'favicon.ico' });

  // Add CSS & JS output to watch target
  eleventyConfig.addWatchTarget('./src/build/');

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: 'src',
      includes: 'includes',
    },
    htmlTemplateEngine: 'njk',
  };
};
