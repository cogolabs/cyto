<img src="logo.png" height="75"/>

A declarative boilerplate generator designed to help you write less meaningless code.

<Put a screen capture of some cool usage here>

## Installation

Cyto is primarily meant to be used as a global command line tool:

```bash
> yarn global add cyto
# or `npm install -g cyto`
> cyto init
```

It can also be used as a library in any node.js application (more on this later)

## Why Use Cyto?
Boilerplate generation is not a new problem. Many libraries have tried to solve this issue before, the most notable being [Yeoman](http://yeoman.io/). Yeoman was and still is great for spinning up boilerplate projects and has undoubtedly shaped how many people develop applications today. However, there were always some issues I had with it's approach to boilerplate generation, the most major being that it always felt like too much work to create your own generators. The Yeoman API is dense, to say the least, and although it does a lot for you, any truly useful generator always seemed to turn into a massive codebase on it's own (check out the [yeoman angular](https://github.com/yeoman/generator-angular) generator as an example). I've always felt that boilerplate generation is a hard problem to solve because every developer has slightly different preferences. If you can't create your own generator easily, you're forced to use generators written by others. These almost always do too much or too little and lock you into someone else's design choices , which can be irritating at best and more work in the long run at worst.

Cyto is different. While Yeoman solves boilerplate generation through an imperative API, Cyto is declarative. Instead of programming out what actions to take in a generator, Cyto instead requires that you declare what you need inside of **templates**. Templates are like blueprints, they tell Cyto exactly what boilerplate to generate, what arguments to prompt the user for, and what special options to set. By following a simple yet powerful declarative API, templates usually require significantly less code to implement, are more reusable, and can help bring more consistency to your projects. 

## Docs

1. [Getting Started](docs/gettingStarted.md)
2. [Argument Types](docs/arguments.md)
3. [Creating Your Own Template](docs/creatingTemplates.md)
4. [Composing Templates](docs/composing.md)
5. [Runtime Dependencies](docs/runtimeDependencies.md)
6. [Partial Templates](docs/partialTemplates.md)
7.  [Base Templates](docs/baseTemplates.md)
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

List to come later
