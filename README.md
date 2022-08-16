# How this works:

In the src directory...

- **\_assets**: images, fonts, etc. that will be simply used as-is in the final website;
- **\_build**: html layouts, css and js files that will be processed to generate the html pages, `style.css` and `script.js` respectively;
- **\_data**: _language-agnostic_ data files that can be referenced in the whole site.
- **\_i18n**: _language-related_ data files that can be referenced in the whole site.

**In each language folder** (e.g. `src/en/`):

- One data named like the language (e.g. `src/en/en.yaml`) contains data that can be referenced in those pages;
- Several markdown files that are each converted into individual pages in the final website. **_These should be the only files that are relevant to most editors._**

# How to edit the CSS and JS:

You can add css files in `src/_build/css`, and js in `src/_build/js`.
Feel free to add as many files as you want, **_but make sure they're imported_**:
- to import CSS, add `@import '<your css file name without the extension>';` inside `init.css`.
- to import JS, add `import '<your js file name without the extension>';` at the top of `init.js`.

Importing is useful because you can split the code into several files to keep it organized.

> CSS is processed with PostCSS, using _each_ and _nested_ features.
> JS is processed with esbuild.

# How to add pages:

Simply create a new html or markdown file in the corresponding **language folder**, adding the relevant _frontmatter_.
Note that only markdown files will be visible in the CMS.

### Wait what's "frontmatter"?

At the top of every page file, there's information about that page. It's used when generating the website. Front matter data looks like this:

```
---
name: index
layout: default
title: 'Home'
description: 'The GWC's home page'
---
```

- **_name_** corresponds to the file name, and it'll be used in the url too.
- **_layout_** indicates which layout from the `_build/layouts` folder to use as a "html wrapper". You can generally use `default`.
- **_title_** and **_description_** are pretty self-explanatory, they will show up when sharing the page for instance; they're optional.

There can also be extra elements in the front matter that can then be referenced in the page's html.

> For more info on how all this works, check out the [Eleventy documentation](https://www.11ty.dev/docs/). (You don't need to understand any of that though.)

## How to output data from the frontmatter?

Whether the page is a markdown or html file, it's first processed as _[Nunjucks](https://mozilla.github.io/nunjucks/)_, which allows you to perform operations on your content or code that will _transform it_ into the final html file. For instance, `{{ title }}` will output the title from the frontmatter. If you want to learn more about the language and the possibilities, click the above link; otherwise, just know that anything in between curly braces `{{ }}` or `{% %}` is probably doing Nunjucks thing.

## How to output localized strings?

Using this snippet: `{{ <key> | i18n }}` in a page automatically outputs the corresponding string if it's listed in the current language's data file from the `_i18n` folder.

For instance, if you had `data: - { key: 'hi', t: 'Salut' }` in `src/_i18n/i18n.fr.yaml`, then any page from the `src/fr` folder could use `{% i18n hi %}` and it would output 'Salut' in the final website.

If the translation doesn't exist, English is used as a fallback.

> For details and extra features of the i18n plugin, [https://github.com/adamduncan/eleventy-plugin-i18n](https://www.11ty.dev/docs/).

# How to test and build locally:

### If you have no idea what 'pnpm' refers to...

Basically all modern web stuff uses something called a 'package manager' to help with development. It makes it possible to download a project like this one, and with just one little command, it'll download all the additional necessary files for it to work. The most common package managers are npm, Yarn and pnpm; we'll use this last one.

To be able to use pnpm, you'll need Node which you can download [here](https://nodejs.org/en/download/). Once you have that installed, open a terminal or command prompt, and type `npm install -g pnpm`. You're goog to go! (Now that you have pnpm istalled, every time you see a project documentation saying you need to do something with `npm` or `yarn`, you should be able to do it with `pnpm`.)

### Once you have pnpm installed

Download the whole project to your computer, either manually or with Git. Open a terminal or command prompt in the project directory. (The location of the directory should appear in your terminal, something like `C:/Users/.../gwc-website >`.) Then run `pnpm install` (= just type that and press enter) – this downloads all the project dependencies. You only need to do this once.

To preview the website, run `pnpm serve`. This will create a local website that you can check out at http://localhost:8080 (by default). The page should automatically reload whenever you make changes, so you can experiment with CSS for example.

To build, run `pnpm build`. This will output all the files needed for the website to the `_site` directory, and they can then be uploaded to a host.

> (Or connect the Github repository to a service like Netlify, and it will automatically run the `build` command whenever a new commit is pushed to the main branch, deploying the new version of the website instantly.)
