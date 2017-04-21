# Runtime dependencies

## What are runtime dependencies?
If you created your own Cyto template earlier, you'll remember that creating a new template is, under the hood, generating the `cyto/template` template. One of the arguments this template takes is a list argument called `files` , which creates an empty file for each value in the list. But how did the `cyto/template` template declare those file dependencies if it only knows what files it needs at generation time after the user has supplied the required args? The answer is runtime dependencies.

A runtime dependency is a function placed in the `dependencies` section of `cyto.config.js` that takes the args supplied to the template at generation time and returns a new set of dependencies. This set can be one of four things: a single string, a single object, a list of strings, or a list of objects. 

## Runtime dependencies in the wild
Lets take a look at the `cyto.config.js` file for the `cyto/template`:

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

## The args parameter
As you can see, a runtime dependency is just a function that takes a single parameter `args`. If we were to log out what `args` was, it would look something like this, assuming we ran `cyto create foo/bar` and provided the inputs `foo,{{id}}.js` and `bar` when prompted for `files` and `args` respectively:
```js
{
  name: 'cyto.config',
  files: [
    { id: 'foo.txt' },
    { id: '{{id}}.js'}
  ],
  args: [
    { id: 'bar' }
  ],
  id: 'foo/bar',
  author: 'Connor Taylor'
}
```

This object is a mapping of argument ids to supplied values and is also what is passed as context for the mustache renderer. One important thing to note is that list args are not arrays of strings but rather arrays of objects. This is because mustache [sections](http://mustache.github.io/mustache.5.html#Sections) require arrays of objects, not strings, so Cyto converts them immediately after they're received. 

## How to use runtime dependencies
In this template, all the runtime dependency does is [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) over the `args.files` array and returns a new array containing just the ids. This return value is merged into the existing set of dependencies automatically. Assuming that we had a set of args like the one above, the final set of dependencies would look like this:

```js
[
  '{{name}}.js',
  'foo.txt',
  '{{id}}.js'
]
```
