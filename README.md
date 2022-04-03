## How this works:

In the src directory...

- **0_assets**: images, fonts, etc. that will be simply copied to the output directory;
- **1_build**: css and js files that will be processed to generate `style.css` and `script.js`, respectively;
- **2_consumes**: data and layouts that are used to generate html pages (but files in this folder don't generate anything themselves);
- **3_pages**: each file in here (including markdown) is converted into a page in the final website, using the data and layouts mentioned above;
- **4_content**: this is for extra content that can be rendered in the pages, but shouldn't generate individual pages (for instance, markdown excerpts).

## How to edit the CSS and JS:

Feel free to add as many files as needed, as long as they're imported by init.css or init.js

CSS is processed with PostCSS, using _each_ and _nested_ features.

JS is processed with esbuild.

## How to add pages:

Simply create a new html or markdown file in `3_pages`, adding the relevant _front matter_ (which indicates what layout to use, for instance).
For more info on how all this works, check out the [Eleventy documentation](https://www.11ty.dev/docs/).

## How to test and build locally:

Open a terminal in the root folder and run `npm serve` (or `yarn serve` or `pnpm serve`). This will create a preview website that you can check out at http://localhost:8080 (by default). The page should automatically reload whenever you make changes, so you can experiment with CSS for example.

To build, run `npm/yarn/pnpm build`. This will output all the files needed for the website to the `_site` directory, and they can then be uploaded to a host.
(Or connect the Github repository to a service like Netlify, and it will automatically run the `build` command whenever a new commit is pushed to the main branch, deploying the new version of the website instantly.)
