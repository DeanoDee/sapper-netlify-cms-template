# sapper-netlify-cms-template

[![Netlify Status](https://api.netlify.com/api/v1/badges/b9f52760-b711-4250-a761-accec84dd4bd/deploy-status)](https://app.netlify.com/sites/suspicious-feynman-669759/deploys)

This is a [Sapper](https://github.com/sveltejs/sapper) template that includes Netlify CMS and some helper functionality, using Rollup. To clone it and get started:

```bash
# for Rollup
npx degit "DeanoDee/sapper-netlify-cms-template" my-app
cd my-app
npm install # or yarn!
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

Consult [sapper.svelte.dev](https://sapper.svelte.dev) for help getting started on the coding portion of this and [Netlify CMS](https://www.netlifycms.org)

## Assumptions
This template was created with the assumption that you would like to use Netlify CMS and publish on Neflify. It may be adaptable to other usage, but other publishing solution was not considered to be in scope.

It also assumes that the person using it will have to jump through a number of hoops to get the whole identity thing happening with Netlify CMS. A few helpful links on the subject are:
* [Netlify Authentication configuration](https://www.netlifycms.org/docs/authentication-backends/)
* [Neflify Identity documentaiton](https://www.netlify.com/docs/identity/)
* [Set up an Oauth pfovider](https://www.netlify.com/docs/authentication-providers/)

For my setup I went to Settings > Identity in Netlify:
1. Enabled identity
2. Change registration to Invite Only (to limit the users to only those I've approved)
3. Enabled Github as an external provider
4. Scrolled further down to service and enabled the Git Gateway (that way the CMS could comunicate with GitHub's API for pushing changes)

After generating my Oauth provider as per the third link above I navigated over to Settings > Access control in Netlify: 
1. Clicked Install provider
2. Added my Client ID and Secret which I had received by setting up the app in GitHub



## Particulars of this template

### Netlify.toml

We've included an netlify.toml that defines the build command and publish directory, it should be enough to get started. If you want to use the Netlify CLI you'll have to do a bit more work.

### contentHelper

In order to generate a list page where we can link to all the published items (things in the case of the example files) we created a file called contentHelper. You can see how it's being used in /src/routes/things.json.js to product a list of all the data with only a subset of the published key values. 

### Netlify CMS details

The html for netlify cms and the config.yml to define the data types are in /static/admin. We've added a button to the navbar when you load the demo - probably want to get rid of that at some point. We are publishing to the /static/things directory.

## Credit where credit is due 

This project builds off the [default Sapper template](https://github.com/sveltejs/sapper-template) all the documentation below are their amazing words. 

## Structure

Sapper expects to find two directories in the root of your project —  `src` and `static`.


### src

The [src](src) directory contains the entry points for your app — `client.js`, `server.js` and (optionally) a `service-worker.js` — along with a `template.html` file and a `routes` directory.


#### src/routes

This is the heart of your Sapper app. There are two kinds of routes — *pages*, and *server routes*.

**Pages** are Svelte components written in `.svelte` files. When a user first visits the application, they will be served a server-rendered version of the route in question, plus some JavaScript that 'hydrates' the page and initialises a client-side router. From that point forward, navigating to other pages is handled entirely on the client for a fast, app-like feel. (Sapper will preload and cache the code for these subsequent pages, so that navigation is instantaneous.)

**Server routes** are modules written in `.js` files, that export functions corresponding to HTTP methods. Each function receives Express `request` and `response` objects as arguments, plus a `next` function. This is useful for creating a JSON API, for example.

There are three simple rules for naming the files that define your routes:

* A file called `src/routes/about.svelte` corresponds to the `/about` route. A file called `src/routes/blog/[slug].svelte` corresponds to the `/blog/:slug` route, in which case `params.slug` is available to the route
* The file `src/routes/index.svelte` (or `src/routes/index.js`) corresponds to the root of your app. `src/routes/about/index.svelte` is treated the same as `src/routes/about.svelte`.
* Files and directories with a leading underscore do *not* create routes. This allows you to colocate helper modules and components with the routes that depend on them — for example you could have a file called `src/routes/_helpers/datetime.js` and it would *not* create a `/_helpers/datetime` route


### static

The [static](static) directory contains any static assets that should be available. These are served using [sirv](https://github.com/lukeed/sirv).

In your [service-worker.js](app/service-worker.js) file, you can import these as `files` from the generated manifest...

```js
import { files } from '@sapper/service-worker';
```

...so that you can cache them (though you can choose not to, for example if you don't want to cache very large files).


## Bundler config

Sapper uses Rollup or webpack to provide code-splitting and dynamic imports, as well as compiling your Svelte components. With webpack, it also provides hot module reloading. As long as you don't do anything daft, you can edit the configuration files to add whatever plugins you'd like.


## Production mode and deployment

To start a production version of your app, run `npm run build && npm start`. This will disable live reloading, and activate the appropriate bundler plugins.

You can deploy your application to any environment that supports Node 8 or above. As an example, to deploy to [Now](https://zeit.co/now), run these commands:

```bash
npm install -g now
now
```


## Using external components

When using Svelte components installed from npm, such as [@sveltejs/svelte-virtual-list](https://github.com/sveltejs/svelte-virtual-list), Svelte needs the original component source (rather than any precompiled JavaScript that ships with the component). This allows the component to be rendered server-side, and also keeps your client-side app smaller.

Because of that, it's essential that the bundler doesn't treat the package as an *external dependency*. You can either modify the `external` option under `server` in [rollup.config.js](rollup.config.js) or the `externals` option in [webpack.config.js](webpack.config.js), or simply install the package to `devDependencies` rather than `dependencies`, which will cause it to get bundled (and therefore compiled) with your app:

```bash
npm install -D @sveltejs/svelte-virtual-list
```


## Bugs and feedback

Sapper is in early development, and may have the odd rough edge here and there. Please be vocal over on the [Sapper issue tracker](https://github.com/sveltejs/sapper/issues).
