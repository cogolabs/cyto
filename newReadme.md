## Getting Started
Cyto is a boilerplate generator. If you're unfamiliar with these terms, boilerplate code is code that is repeated in many places with little to no alteration. A boilerplate generator is a tool that can generate that code for you automatically.

The core concept of Cyto is the generation of templates. Let's take a look at what the simplest possible cyto template looks like:

1. `cyto.config.js`
2. `helloWorld.txt`

Let's take a more detailed look at each file. The most important piece of any template is the `cyto.config.js` file. This is essentially a blueprint that contains all of the information needed to generate a template. At it's most basic, this is 3 things:

1. `templateId`
2. `dependencies`
3. `arguments`

The `helloWorld.txt` is listed in the `cyto.config.js` file as a dependency. Dependencies can be one of 3 types: strings, objects, or functions. String dependencies represent local files relative to the `cyto.config.js` file (more on objects and functions later). These files can have whatever you want inside of them. At generation time, these will be passed to a mustache renderer and the rendered output will be written to the filesystem. 

To actually generate this template, we have to make sure that it's located inside of our global template library. Assuming that your template library is located at `~`, the 2 required files would need to be stored in the `~/cyto/helloWorld/` directory. Once that's taken care of, generation is a single step:

```
> cyto gen cyto/helloWorld cyto-demo
```

