# Base Templates

## What are base templates?

After you've written a few templates, you'll probably find that some of them have very similar structures to them. Let's say I have 2 templates for generating starter projects: one for [React](https://facebook.github.io/react/) and one for [Angular](https://angular.io/).  While they have their differences, there are a number of dependencies that will be the exact same for both: a `README.md`, a `.gitignore`, a `LICENSE`, etc. These dependencies aren't specific to a React project or an Angular project, but rather to **any** project. It would be great if we had a way some kind of template with these dependencies that our React and Angular templates could extend so that these repeated dependencies could be stored in one place. Enter base templates.

## How do base templates work?

Base templates are templates that other templates can extend by using the `base` key in their `cyto.config.js` file. Any template can be used as a base template without any changes to their config file. Let's take a look at the config files for the `cyto/baseConfig` and `cyto/childConfig` templates:

`cyto/baseConfig/cyto.config.js`
```js
module.exports = {
  templateId: "cyto/baseConfig",
  dependencies: [
    'fromBase.txt',
  ],
  args: [

  ],
  options: {
    createDirectory: false,
  }
};
```

`cyto/childConfig/cyto.config.js`

```js
module.exports = {
  base: "cyto/baseConfig",
  templateId: "cyto/childConfig",
  dependencies: [
    'fromChild.txt',
  ],
  args: [

  ],
  options: {
    createDirectory: false,
  }
};
```

When a user tries to generate `cyto/childConfig`, Cyto will notice that it has a base template and load `cyto/baseConfig`. It then merges the two configs by merging their sets of arguments and dependencies, preferring items from `cyto/childConfig` in the case of duplicates. This merged config is what is actually generated. The result for this example will look like this:

```bash
> cyto gen cyto/childConfig foobar
Generating cyto/childConfig with id foobar
> ls
fromBase.txt  fromChild.txt
```

## Why use base templates?

Base templates help you keep your templates DRY. By moving shared dependencies to one location, base templates help you keep your templates smaller and also makes propagating changes much simpler. Instead of needing to make the same change to numerous templates, you can just update the base config and be done with it. This feature was heavily inspired by how [Docker](https://www.docker.com/) uses base images.