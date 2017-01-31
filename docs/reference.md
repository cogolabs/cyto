# API Reference

## cyto.config.js files

```js
module.exports = {
  // The name of the template. This is a unique identifier in the template
  // ecosystem. The format is <namespace>/<name>. For individuals, a
  // recommended namespace is your github username.
  templateId: "taylorc93/project",

  // Templates can also specify a different template as their base template. These
  // are conceptually similar to docker base images. Anything that is in a base template
  // will get generated along with the template using it as a base.
  base: 'taylorc93/base-demo',

  // dependencies contains all of the required files and templates to create a
  // template.
  dependencies: [
    // Strings are interpreted as files in the file system. Files are pulled
    // from the template's directory
    'README.md',
    '.gitignore',

    // Templates are objects with at least 2 keys, `templateId` and `id`.
    // `templateId` is the global template id and `id` is a unique identifier for
    // that template instance. Templates are pulled from the user's local library
    { templateId: 'taylorc93/node-module', id: 'src' },

    // Templates can also take an `args` object that will act the same as arguments
    // passed via the CLI (ie. the user won't be prompted to provide a value
    {
      templateId: 'webpack/config',
      id: 'webpack.config.js',
      args: {
        foo: 'bar'
      }
    },

    // Functions provide custom ways to generate dependencies at generation time.
    // Most often, this is used to render sets of templates based on the
    // provided args
    (args) => {
      return args
        .units
        .map((u) => { id: u.id, templateId: 'taylorc93/node-unit'  });
    }
  ],

  // Args is a collection of objects that represents all of the data that a
  // template needs to render itself.
  args: [
    {
      // Every arg must have an id and can be supplied on the command line
      // via <id>=<val>
      id: 'foo',
      // If an argument is a list, it's type should be set to `list` in order
      // to be parsed properly when passed via the CLI
      type: 'list',
      // default is used as the default value if not provided by the user.
      default: [],
      // If you want to always use the default value, you can set dontPrompt to
      // true so that Cyto will not prompt the user for the value. Default is
      // false
      dontPrompt: false
    }
  ],

  // Set to true if you want to create a new directory to hold a generated template's
  // contents
  createDirectory: true
};
```

## Template Files
Template files are language independent. They are each rendered via [mustache](https://mustache.github.io/mustache.5.html), so anything that is valid in a mustache file is valid in cyto. The only thing difference is with partials, more on this later.

## Commands

1. `config` - Sets some required information for Cyto. Must be run at least once after installation
1. `create <templateId>` - Creates a new template with the given template id.
1. `gen <templateId> <id>` - Generates the given template with the given id.

