<img src="logo.png" height="75"/>

A declarative boilerplate generator designed to help you write less meaningless code.

[![npm](https://img.shields.io/npm/v/cyto.svg)]() [![Travis](https://img.shields.io/travis/cogolabs/cyto/master.svg)]() [![Coveralls](https://img.shields.io/coveralls/cogolabs/cyto.svg)]()

## Installation

Cyto is primarily meant to be used as a global command line tool:

```bash
> yarn global add cyto
# or `npm install -g cyto`
> cyto init
```

Note: If you installed `yarn` via homebrew, you may need to update your config. Following the steps outlined in [this comment](https://github.com/yarnpkg/yarn/issues/1321#issuecomment-283495343) should resolve that.

Cyto can also be used as a library in any node.js application (more on this later)

## Why Use Cyto?

Boilerplate generation is not a new problem. Many libraries have tried to solve this issue before, the most notable being [Yeoman](http://yeoman.io/). Yeoman was and still is great for spinning up boilerplate projects and has undoubtedly shaped how many people develop applications today. However, I've always some issues with it's approach to boilerplate generation, the most major being that it always felt like too much work to create your own generators. The Yeoman API is dense, to say the least, and although it does a lot for you, any truly useful generator always seemed to turn into a massive codebase on it's own (check out the [Yeoman Angular](https://github.com/yeoman/generator-angular) generator as an example). I've always felt that boilerplate generation is a hard problem to solve because every developer has slightly different preferences. If you can't create your own generator easily, you're forced to use generators written by others. These almost always do too much or too little and lock you into someone else's design choices, which can be irritating at best and more work in the long run at worst.

Cyto is different. While Yeoman solves boilerplate generation through an imperative API, Cyto is declarative. Instead of programming out what actions to take in a generator, Cyto instead requires that you declare what you need through templates. By following a simple yet powerful declarative API, these templates are smaller, easier to reuse, and simpler to reason about than Yeoman generators.

## Docs

1. [Getting Started](docs/gettingStarted.md)
2. [Argument Types](docs/arguments.md)
3. [Creating Your Own Template](docs/creatingTemplates.md)
4. [Composing Templates](docs/composing.md)
5. [Runtime Dependencies](docs/runtimeDependencies.md)
6. [Partial Templates](docs/partialTemplates.md)
7. [Base Templates](docs/baseTemplates.md)
8. [Template Options](docs/options.md)
9. [Best Practices](docs/bestPractices.md)
10. [API Reference](docs/reference.md)

## Contributing
1. Read the docs on contributing [here](CONTRIBUTING.md) and sign the CLA
1. Clone this repository
1. Run `yarn` or `npm i`
1. Run `npm run watch` and leave it running
1. Run `npm link` in a separate terminal
1. You should now have the cyto command installed! It will update with your latest changes while you have `npm watch` active

## Contributors
Cyto is written and maintained by Connor Taylor [@taylorc93](https://github.com/taylorc93). However, it wouldn't have been possible without the help of these amazing people:

1. Scott Staniewicz [scottstanie](https://github.com/scottstanie)
    - For all of the documentation edits and user testing
1. Alicia Payette [apayette](https://github.com/apayette)
    - For designing the awesome logo
1. Alex Kasemir [annarichardson](https://github.com/annarichardson)
    - For documentation edits and user testing
1. Anna Richardson [alexkasemir](https://github.com/alexkasemir)
    - For user testing
