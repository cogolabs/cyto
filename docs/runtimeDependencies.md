# Runtime dependencies

If you created your own Cyto template earlier, you'll remember that creating a new template is, under the hood, generating the `cyto/template` template. One of the arguments this template takes is a list argument called `files` , which creates an empty file for each value in the list. But how did the `cyto/template` template declare those file dependencies if it only knows what files it needs at generation time after the user has supplied the required args? The answer is runtime dependencies.

A runtime dependency is a function (remember, dependencies can be strings, objects, or functions) placed in the `dependencies` section of `cyto.config.js` that takes the args supplied to the template at generation time and returns a new set of dependencies. This set can be one of four things: a single string, a single object, a list of strings, or a list of objects. Lets take a look at the `cyto.config.js` file for the `cyto/template`:

```js
module.exports = {
  templateId: "cyto/template",
  dependencies: [
    '{{name}}.js',
    (args) => args.files.map((f) => f.id),
  ],
  args: [
    {
      id: 'name',
      type: 'string',
      default: 'cyto.config',
      dontPrompt: true
    },
    {
      id: 'files',
      type: 'list',
      default: []
    },
    {
      id: 'args',
      type: 'list',
      default: []
    }
  ],
  options: {
    createDirectory: true
  }
};
```

As you can see, this template has 2 dependencies, `{{name}}.js`, which represents the `cyto.config.js` file to create for the new template, and a function. All this function does is [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) over the `args.files` array and returns a new array of strings. Each string in this new array represents an empty file to create and is merged into the existing set of dependencies automatically.
