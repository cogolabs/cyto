# API Reference

## cyto.config.js files

```js
module.exports = {
  // The name of the template. This is a unique identifier in the template
  // ecosystem. The format is <group>-<name>.
  templateId: "cyto-reference",

  // Templates can also specify a different template as their base template.
  // These are conceptually similar to docker base images. Anything that is in a
  // base template will get generated with the child template's dependencies
  base: {
    templateId: 'cyto-baseconfig',

    // You must include the args key, even if you aren't providing any args
    args: {}
  }

  // dependencies contains all of the required files and templates to create a
  // template.
  dependencies: [
    // Strings are interpreted as files in the file system. Files are pulled
    // from the template's directory
    'README.md',
    '.gitignore',

    // Templates are objects with at least 2 keys, `templateId` and `id`.
    // This is the same format as the input to `base`
    {
      templateId: 'cyto-helloworld',
      args: {
        id: 'reference'
      }
    },

    // Functions provide custom ways to generate dependencies at generation time.
    // Most often, this is used to render sets of templates based on the
    // provided args
    (args) => {
      return args
        .units
        .map((u) => ({
          templateId: 'cyto-helloworld',
          args: {
            id: u.id
          }
        }));
    }
  ],

  // Args is a collection of objects that represents all of the data that a
  // template needs to render itself.
  args: [
    {
      // Every arg must have an id. This must be unique among all other args in
      // the template
      id: 'foo',

      // The type of the arg. Valid types are `string`, `boolean`, `list`, and
      // `function`. The default is `string`, you can omit the type if your
      // arg is a string
      type: 'list',

      // default is used as the default value if not provided by the user.
      default: [],

      // If you want to always use the default value, you can set dontPrompt to
      // true so that Cyto will not prompt the user for the value. Default is
      // false
      dontPrompt: false
    }
  ],

  // Any special options to set while generating this template
  options: {
    // Set to true if you want to create a new directory to hold a generated template's
    // contents
    createDirectory: true,

    // Set to true if you want any string dependencies generated at runtime to
    // not be rendered (ie. '{{id}}.txt' will be written to the filesystem as
    // '{{id}}.txt')
    skipRuntimeRendering: false
  }
};
```

## Template Files
Template files are language independent. They are each rendered via [mustache](https://mustache.github.io/mustache.5.html), so anything that is valid in a mustache file is valid in cyto. The only thing difference is with partials, more on this later.

## Commands

1. `cat <templateId>`
1. `create <templateId>` - Creates a new template with the given template id.
1. `gen <templateId> <id>` - Generates the given template with the given id.

