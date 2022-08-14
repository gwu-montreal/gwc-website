## How this works:

In the src directory...

- **\_assets**: images, fonts, etc. that will be simply used as-is in the final website;
- **\_build**: html layouts, css and js files that will be processed to generate the html pages, `style.css` and `script.js` respectively;
- **\_data**: _language-agnostic_ data files that can be referenced in the whole site.

**In the language folders** (e.g. `src/en/`):

- One **data file** named like the language (e.g. `src/en/en.yaml`) contains _localized_ data to be referenced in those pages (see below on how to output localized string);
- One **content folder** (e.g. `src/en/content/`) contains snippets that can be rendered in pages, but don't generate pages themselves;
- All the remaining html and markdown files are converted into individual pages in the final website.

## How to edit the CSS and JS:

Feel free to add as many files as needed, as long as they're imported.
Importing is useful because you can split the code into several files to keep it organized.

To import CSS, add `@import '<your css file name without the extension>';` inside `init.css`.
To import JS, add `import '<your js file name without the extension>';` at the top of `init.js`.

> CSS is processed with PostCSS, using _each_ and _nested_ features.
> JS is processed with esbuild.

## How to add pages:

Simply create a new html or markdown file in the corresponding **language folder**, adding the relevant _front matter_.

### Wait what's "front matter"?

At the top of every page file, there's information about that page. It's used when generating the website. Front matter data looks like this:

```
---
layout: default
title: 'Home'
description: 'The GWC's home page'
---
```

- **_layout_** indicates which layout from the `_build/layouts` folder to use as a "html wrapper". You can generally use `default`.
- **_title_** and **_description_** are pretty self-explanatory, they're optional.

There can also be extra elements in the front matter that can then be referenced in the page's html.

> For more info on how all this works, check out the [Eleventy documentation](https://www.11ty.dev/docs/). (You don't need to understand any of that though.)

## How to output localized strings from the language data file?

Using this snippet: `{% i18n <some key> %}` in a page automatically outputs the corresponding string if it's listed under `i18n` in the data file.

For instance, if you had `i18n: - { key: 'hi', t: 'Salut' }` in `fr.yaml` in the fr folder, then any page in that same folder could use `{% i18n hi %}` and it would output 'Salut' in the final website.

If the translation doesn't exist, then the key is output as-is ('hi' in the example above) but wrapped in a `<span>` tag with the 'untranslated' class.

## How to render things from the content folder in a page:

Everything in **data files** is automatically "read" when generating the website (so that data can be referenced directly from any page without any extra step needed), but the files in the **content folder** need to be linked manually.

You can use this little snippet in a page's html: `{% renderFile "./src/<language>/content/<your file>" %}`. For instance, you can write `{% renderFile "./src/en/content/example.md" %}` in a page to render the markdown from `example.md`.

## How to test and build locally:

### If you have no idea what 'pnpm' refers to...

Basically all modern web stuff uses something called a 'package manager' to help with development. It makes it possible to download a project like this one, and with just one little command, it'll download all the additional necessary files for it to work. The most common package managers are npm, Yarn and pnpm; we'll use this last one.

To be able to use pnpm, you'll need Node which you can download [here](https://nodejs.org/en/download/). Once you have that installed, open a terminal or command prompt, and type `npm install -g pnpm`. You're goog to go! (Now that you have pnpm istalled, every time you see a project documentation saying you need to do something with `npm` or `yarn`, you should be able to do it with `pnpm`.)

### Once you have pnpm installed

Download the whole project to your computer, either manually or with Git. Open a terminal or command prompt in the project directory. (The location of the directory should appear in your terminal, something like `C:/Users/.../gwc-website >`.) Then run `pnpm install` (= just type that and press enter) – this downloads all the project dependencies. You only need to do this once.

To preview the website, run `pnpm serve`. This will create a local website that you can check out at http://localhost:8080 (by default). The page should automatically reload whenever you make changes, so you can experiment with CSS for example.

To build, run `pnpm build`. This will output all the files needed for the website to the `_site` directory, and they can then be uploaded to a host.

> (Or connect the Github repository to a service like Netlify, and it will automatically run the `build` command whenever a new commit is pushed to the main branch, deploying the new version of the website instantly.)
