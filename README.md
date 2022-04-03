## How this works:

In the src directory...

- **0_assets**: images, fonts, etc. that will be simply used as-is in the final website;
- **1_build**: css and js files that will be processed to generate `style.css` and `script.js`, respectively;
- **2_consumes**: data and layouts that are used to generate html pages (but files in this folder don't generate anything themselves);
- **3_pages**: each file in here (including markdown) is converted into a page in the final website, using the data and layouts mentioned above;
- **4_content**: this is for extra content that can be rendered in the pages, but shouldn't generate individual pages (for instance, markdown excerpts).

## How to edit the CSS and JS:

Feel free to add as many files as needed, as long as they're imported.
Importing is useful because you can split the code into several files to keep it organized.

To import CSS, add `@import '<your css file name without the extension>';` at the top of `init.css`.
To import JS, add `import '<your js file name without the extension>';` at the top of `init.js`.

> CSS is processed with PostCSS, using _each_ and _nested_ features.
> JS is processed with esbuild.

## How to add pages:

Simply create a new html or markdown file in `3_pages`, adding the relevant _front matter_.

### Wait what's "front matter"?

At the top of every page file, there's information about that page. It's used when generating the website. Front matter data looks like this:

```
---
layout: default
permalink: index.html
eleventyComputed:
  title: '{{ siteinfo.title }} - Home'
  description: '{{ siteinfo.description }}'
---
```

- **_layout_** indicates which layout from the `2_consumes/layouts` folder to use as a "html wrapper".
- **_permalink_** is used to determine the url where the page should exist – for instance, "index.html" creates a page at "domain.com/index.html".
- **_title_** and **_description_** are pretty self-explanatory... in the example above though, they used _computed_ data, that's why they're written under `eleventyComputed`.
  - `{{ siteinfo.title }}` means we want to use the `title` value from the `siteinfo` file that's in the `2_consumes/data` folder.

With this example, you can see how the stuff in the `2_consumes` folder is "consumed" by the page files to create the pages in the final website.

> For more info on how all this works, check out the [Eleventy documentation](https://www.11ty.dev/docs/). (You don't need to understand any of that though.)

## How to render things from the 4_contents folder in a page:

Use this little snippet in the page's html: `{% renderFile "./src/4_content/<your file>" %}`.

## How to test and build locally:

### If you have no idea what 'pnpm' refers to...

Basically all modern web stuff uses something called a 'package manager' to help with development. It makes it possible to download a project like this one, and with just one little command, it'll download all the additional necessary files for it to work. The most common package managers are npm, Yarn and pnpm; we'll use this last one.

To be able to use pnpm, you'll need Node which you can download [here](https://nodejs.org/en/download/). Once you have that installed, open a terminal or command prompt, and type `npm install -g pnpm`. You're goog to go! (Now that you have pnpm istalled, every time you see a project documentation saying you need to do something with `npm` or `yarn`, you should be able to do it with `pnpm`.)

### Once you have pnpm installed

Download the whole project to your computer, either manually or with Git. Open a terminal or command prompt in the project directory. (The location of the directory should appear in your terminal, something like `C:/Users/.../gwc-website >`)

Run `pnpm serve` (just type that and press enter). This will create a preview website that you can check out at http://localhost:8080 (by default). The page should automatically reload whenever you make changes, so you can experiment with CSS for example.

To build, run `pnpm build`. This will output all the files needed for the website to the `_site` directory, and they can then be uploaded to a host.

> (Or connect the Github repository to a service like Netlify, and it will automatically run the `build` command whenever a new commit is pushed to the main branch, deploying the new version of the website instantly.)
