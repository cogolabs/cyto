# Runtime dependencies

## What are runtime dependencies?
If you created your own Cyto template earlier, you'll remember that creating a new template is, under the hood, generating the `cyto-template` template. One of the arguments this template takes is a list argument called `files` , which creates an empty file for each value in the list. But how did the `cyto-template` template declare those file dependencies if it only knows what files it needs after the user has supplied the required args? The answer is runtime dependencies.

Runtime dependencies are represented by functions is in the `dependencies` section of a `cyto.config.js` file. They take as their sole parameter the args supplied to the template at generation time and return a new set of dependencies. This set can be one of four things: a single string, a single object, a list of strings, or a list of objects.

## An example
Lets take a look at the`cyto.config.js` file for the  `cyto-runtimedeps` template to see how runtime dependencies actually work:

```js
module.exports = {
  templateId: "cyto-runtimedeps",
  dependencies: [
    // Case 1: Returns a string
    (args) => '{{id}}.txt',
    // Case 2: Returns an array of strings
    (args) => ['{{id}}.txt', 'blank.txt'],
    // Case 3: Returns an object
    (args) => {
      return {
        templateId: 'cyto-composed',
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
          templateId: 'cyto-composed',
          args: {
            id: 'nonUnique',
            templateArg: 'I came from case 4'
          }
        },
        {
          templateId: 'cyto-composed',
          args: {
            id: 'unique',
            templateArg: 'I also came from case 4'
          }
        }
      ];
    },
    // Case 5: A more realistic use case, creates a new template for each value
    // in args.templates
    (args) => {
      return args
        .templates
        .map((t) => {
          return {
            templateId: 'cyto-composed',
            args: {
              id: t.id,
              templateArg: 'I was created from a map statement'
            }
          }
        });
    }
  ],
  args: [
    {
      id: 'templates',
      type: 'list',
      default: []
    }
  ],
  options: {
    createDirectory: false,
    skipRuntimeRendering: false
  }
};
```

## The args parameter

As you can see, a runtime dependency is just a function that takes a single parameter `args`. If we were to `console.log` what `args` was, assuming we ran `cyto gen cyto-runtimedeps demo` and provided the value `foo,bar` for the `templates` argument, it would look like this:
```js
{
  id: 'demo',
  author: 'Connor Taylor',
  isPartial: false,
  templates: [
    { id: 'foo' },
    { id: 'bar' }
  ]
}
```

The `args` object is just a mapping of argument ids to supplied values. This object has the same structure as the `args` parameter passed to a runtime argument function. Each key is the `id` of the argument and the value is whatever the user supplied. This `args` object is also what is passed to the Mustache renderer when file dependencies are processed.

One important thing to note is that list args like `templates` are not arrays of strings but arrays of objects. This is because Mustache [sections](http://mustache.github.io/mustache.5.html#Sections) are generally represented as arrays of objects, not strings. To avoid this issue, Cyto converts each string to an object with the string stored under the `id` key. If your section requires more values than `id`, consider making a Cyto partial for the contents.

## Uniquing runtime dependencies

Now that we understand how runtime dependencies are structured, let's see what the generated `cyto-runtimedeps` template looks like:

```bash
cyto gen cyto-runtimedeps demo
Generating cyto-runtimedeps with id demo
? templates:  foo,bar
Generating cyto-composed with id nonUnique
? userArg:  test1
Generating cyto-composed with id unique
? userArg:  test2
Generating cyto-composed with id foo
? userArg:  test3
Generating cyto-composed with id bar
? userArg:  test4
> ls
bar.txt       blank.txt     demo.txt      foo.txt       nonUnique.txt unique.txt
```

Let's break down how each of these files was created:

1. `bar.txt`: From case 5 when we created a new object dependency for each item in the `templates` arg
2. `blank.txt`: From case 2.
3. `demo.txt`: From case 2. Case 2 provided an `{{id}}.txt` dependency, which was passed through the Mustache renderer with the set of arguments we showed above. Since `id` was set to `demo`, the generated dependency file was called `demo.txt`. Note that case 1 also provided an `{{id}}.txt`. Cyto uniques runtime dependencies, preferring the output of runtime dependencies closer to the end of the list. Since case 2 provided a duplicate `{{id}}.txt`, it used that one since case 2 comes after case 1.
4. `foo.txt`: Same as `bar.txt`
5. `nonUnique.txt`: From case 4. Again, Cyto uniques runtime dependencies. For object dependencies, it uses the `id` key to unique them. Since case 3 and case 4 both provided an object dependency with an id of `nonUnique`, Cyto used the one from case 4 because it was provided after case 3. This can be proven by looking at the contents of `nonUnique.txt`:
```bash
> cat nonUnique.txt
cyto/composed was generated by another template and given an id of: nonUnique

This template was given a userArg value of: test1

The parent template supplied this value: I came from case 4
```
6. `unique.txt`: From case 4.

## The skipRuntimeRendering option

You'll notice that there's an option in this template that we haven't seen yet: `skipRuntimeRendering`. This is a special option that will prevent string dependencies created through a runtime dependency from being rendered by Mustache. If we set this option to true and provided the same arguments as we did before, we'd get the following set of files:

```bash
> ls
bar.txt       blank.txt     foo.txt       nonUnique.txt unique.txt    {{id}}.txt
```

We get almost the exact same set of files, but `demo.txt` has been replaced with `{{id}}.txt`. This is because we didn't pass the `{{id}}.txt` file through the Mustache renderer, so the name never changed like it did before. The default value for `skipRuntimeRendering` is `false`, meaning that runtime dependencies are rendered by Mustache by default. This option provides a way to bypass that functionality if desired, although it's often not necessary. The best example of where this is necessary is in the `cyto-template` template. Since a desired output file may very well be something like `{{id}}.txt`, `cyto-template` sets `skipRuntimeRendering` to true.

## When to use runtime dependencies

Runtime dependencies are provided as a catch-all for generating boilerplate in ways not directly handled by the core Cyto API. Some examples of this are:

1. Rendering a set of templates based on some user input, as we did in case 5 in the example above.
2. Supplying a dependency only if a certain argument was set to true (or false)

There are many other ways to use runtime dependencies as well. Keep an open mind and you'll be sure to find a good use case runtime dependencies!