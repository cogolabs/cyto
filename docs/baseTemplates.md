# Base Templates

## What are base templates?

After you've written a few templates, you'll probably find that some of them have very similar structures to them. Let's say I have 2 templates for generating starter projects: one for [React](https://facebook.github.io/react/) and one for [Angular](https://angular.io/).  While they have their differences, there are a number of dependencies that will be the exact same for both: a `README.md`, a `.gitignore`, a `LICENSE`, etc. These dependencies aren't specific to a React project or an Angular project, but rather to **any** project. It would be great if we had a way some kind of template with these dependencies that our React and Angular templates could extend so that these repeated dependencies could be stored in one place. Enter base templates.

## How do base templates work?

Base templates are templates can be extended by other templates using the `base` key in the new template's `cyto.config.js` file. Any valid Cyto template can be used as a base template without any modifications. Let's take a look at the config files for the `cyto/baseConfig` and `cyto/childConfig` templates:

`<path/to/GTL>/cyto/baseConfig/cyto.config.js`:
```js
module.exports = {
  templateId: "cyto/baseConfig",
  dependencies: [
    'fromBase.txt',
  ],
  args: [
    { id: 'foo' }
  ],
  options: {
    createDirectory: false,
  }
};
```

`<path/to/GTL>/cyto/baseConfig/fromBase.txt`:
```
I came from a base template!

My id is the same as the child template: {{id}}
Value of argument foo: {{foo}}
```

`<path/to/GTL>/cyto/childConfig/cyto.config.js`:

```js
module.exports = {
  base: {
    templateId: "cyto/baseConfig",
    args: {
      foo: 'bar'
    }
  },
  templateId: "cyto/childConfig",
  dependencies: [
    'fromChild.txt',
  ],
  args: [],
  options: {
    createDirectory: false,
  }
};
```

The `cyto/childConfig` declares that it uses `cyto/baseConfig` as a base template. The `base` key expects an object with 2 keys:

1. `templateId`: The id of the base template
2. `args`: An object of arguments to pre-supply.

If you recall the structure of object dependencies, you'll notice that the `base` object is the exact same structure, since they're both representing the same thing: a Cyto template. When a user tries to generate `cyto/childConfig`, Cyto will notice that it has a base template and merge the two configs. Cyto merges the sets of arguments and dependencies (options are **not** merged) and prefers items from `cyto/childConfig` in the case of duplicates. After merging the two configs into one, the merged config is what is actually generated. The result for this example will look like this:

```bash
> cyto gen cyto/childConfig demo
Generating cyto/childConfig with id demo
> ls
fromBase.txt  fromChild.txt
> cat fromBase.txt
I came from a base template!

My id is the same as the child template: demo
Value of argument foo: bar
```

## Why use base templates?

Base templates help you keep your templates DRY. By moving shared dependencies to one location, base templates help you keep your templates smaller. Base templates also makes propagating changes much simpler. Instead of needing to make the same change to the same dependency file in numerous templates, you just have to update the base template. This feature was heavily inspired by how [Docker](https://www.docker.com/) uses base images.
