# Runtime dependencies

## What are runtime dependencies?
If you created your own Cyto template earlier, you'll remember that creating a new template is, under the hood, generating the `cyto/template` template. One of the arguments this template takes is a list argument called `files` , which creates an empty file for each value in the list. But how did the `cyto/template` template declare those file dependencies if it only knows what files it needs at generation time after the user has supplied the required args? The answer is runtime dependencies.

A runtime dependency is a function placed in the `dependencies` section of `cyto.config.js` that takes the args supplied to the template at generation time and returns a new set of dependencies. This set can be one of four things: a single string, a single object, a list of strings, or a list of objects.

## An example
Lets take a look at the`cyto.config.js` file for the  `cyto/runtimeDependencies` template to see how runtime dependencies actually work:

```js
module.exports = {
  templateId: "cyto/runtimeDependencies",
  dependencies: [
    // Case 1: Returns a string
    (args) => '{{fileName}}.txt',
    // Case 2: Returns an array of strings
    (args) => ['{{fileName}}.txt', 'blank.txt'],
    // Case 3: Returns an object
    (args) => {
      return {
        templateId: 'cyto/composed',
        args: {
          id: 'nonUnique',
          templateArg: 'I came from case 3'
        }
      };
    },
    // Case 4: Return an array of objects
    (args) => {
      return [
        {
          templateId: 'cyto/composed',
          args: {
            id: 'unique',
            templateArg: 'I came from case 4'
          }
        }
      ];
    },
    // A more realistic use case, creates a new template for each value in
    // args.templates
    (args) => {
      return args
        .templates
        .map((t) => {
          return {
            templateId: 'cyto/composed',
            args: {
              id: t.id,
              templateArg: 'I was created from a map statement'
            }
          }
        });
    }
  ],
  args: [
    { id: 'fileName' },
    {
      id: 'templates',
      type: 'list',
      default: []
    }
  ],
  options: {
    createDirectory: false,
  }
};
```

As you can see, a runtime dependency is just a function that takes a single parameter `args`.  This template demonstrates two important things: what the return types for a runtime dependency are and how dependencies are uniqued. If these dependencies weren't uniqued, we'd end up with a new set of dependencies that looks like this:

```js
[
  '{{fileName}}.txt',
  '{{fileName}}.txt',
  'blank.txt',
  {
    templateId: 'cyto/composed',
    args: {
      id: 'nonUnique',
      templateArg: 'I came from case 3'
    }
  },
  {
    templateId: 'cyto/composed',
    args: {
      id: 'nonUnique',
      templateArg: 'I came from case 4'
    }
  },
]
```

```bash
> cyto gen cyto/runtimeDependencies demo
Generating cyto/runtimeDependencies with id demo
? fileName:  example
? templates:  foo,bar
Generating cyto/tutorial with id nonUnique
Generating cyto/composed with id unique
? userArg:  Some cool string
Generating cyto/composed with id foo
? userArg:  Another cool string
Generating cyto/composed with id bar
? userArg:  A lame string... :(
> ls
blank.txt bar.txt       example.txt   foo.txt       nonUnique.txt unique.txt
```

## The args parameter

As you can see, a runtime dependency is just a function that takes a single parameter `args`, which is an object that maps argument ids to supplied values. If we were to log out what `args` was, assuming we ran `cyto gen cyto/runtimeDependencies demo` and provided the values `test` and `foo,bar` for the `fileName` and `templates` args respectively, it would look like this:
```js
{
  id: 'demo',
  author: 'Connor Taylor',
  fileName: 'test',
  templates: [
    { id: 'foo' },
    { id: 'bar' }
  ]
}
```

The `args` object is a mapping of argument ids to supplied values and is also what is passed as context for the mustache renderer. One important thing to note is that list args are not arrays of strings but rather arrays of objects. This is because mustache [sections](http://mustache.github.io/mustache.5.html#Sections) require arrays of objects, not strings. Cyto converts each string to an object with the string stored under the `id` key.

## How to use runtime dependencies
In this template, all the runtime dependency does is [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) over the `args.files` array and returns a new array containing just the ids. This return value is merged into the existing set of dependencies automatically. Assuming that we had a set of args like the one above, the final set of dependencies would look like this:

```js
[
  '{{name}}.js',
  'foo.txt',
  '{{id}}.js'
]
```
