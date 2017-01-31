# Hello World with Cyto

## How does Cyto work?
Cyto is built around the concept of structuring your projects as a tree of templates. A template represents "something" in your project's file system. It can be as small as a single file (eg. `README.md`, `.gitignore`, etc), or as complex as a directory with multiple subdirectories and lots of files (eg. a full project). To understand how templates work, let's start with a simple exammple: a project that can be represented by one template.

## Hello World
Cyto templates, at a bare minimum, are made up of a single directory that contains a `cyto.config.js` file. A `cyto.config.js` file is the core of a template: it declares everything that a template needs to generate itself.  Let's take a look at what a very basic `cyto.config.js` file looks like for a hello world project:

```js
module.exports = {
  templateId: 'taylorc93/cyto-tutorial',
  dependencies: [
    'hello.js'
  ],
  args: [
    {
      id: 'thingToGreet',
      default: 'world'
    }
  ],
  createDirectory: true
};
```

There are 4 major pieces to this config:

1. `templateId`: A globally unique identifier for this template. A `templateId` is made of two values separated by a `/`: `namespace` and `name`. A template's `namespace` is the logical grouping for a template, while the template `name` is a more specific identifier for the template. Examples of valid and helpful `templateId` are: `taylorc93/cyto-tutorial`, `react/component`, `django/view`, etc.
1. `dependencies`: All of the required "things" that a template requires to generate itself. Dependencies can be strings, objects, or functions, but we're only going to talk about string dependencies here. Strings are the most basic and are used to represent required files in the template. In the case above, we're saying that the only dependency is the file `hello.js` in the `taylorc93/cyto-tutorial` template. In Cyto, all files are treated as [mustache](https://mustache.github.io/mustache.5.html) templates and rendered when a template is generated
1. `args`: The values passed to Mustache when each file is rendered for a template. Templates are expected to declare each argument that they need in order to render. Above, we declare that we need 1 argument `thingToGreet`, which has a default value of `world`. Each template is provided 2 arguments by default, `id` and `author`.
1. `createDirectory`: A flag that indicates whether Cyto should create a new directory to hold the generated template's contents. In our case, we do want a directory to be created. The new directory always uses the `id` arg to determine it's name

## Template Files

Now let's take a look at what the `hello.js` file for our example template looks like:

```js
/**
 * hello.js
 * Written by: {{author}}
 * 
 */

/**
 * Says hello to something
 */
export default function hello() {
  return 'Hello {{thingToGreet}}!';
}

```

## Generating Our Hello World Example
Cyto is primarily envoked through the command line. Generating the `taylorc93/cyto-tutorial` template would look like this:

```bash
> cyto gen taylorc93/cyto-tutorial cyto-example
Generating taylorc93/cyto-tutorial
  - id cyto-example
? thingToGreet:  world
```
The `gen` command (short for generate), requires two things, the `templateId` of the template to generate and an `id` for the template being generated. Each generated template must have a unique id and this is where it's provided.

After running this command, we'll see a new directory called `cyto-example` with one file, `hello.js`, which will look like this:

```js
/**
 * hello.js
 * Written by: Connor Taylor
 * 
 */

/**
 * Says hello to something
 */
export default function hello() {
  return 'Hello world!';
}

```

And that's it! You've just generated your first cyto template :D
