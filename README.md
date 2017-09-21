<img src="logo.png" height="75"/>

A declarative boilerplate generator designed to help you write less meaningless code.

[![npm](https://img.shields.io/npm/v/cyto-core.svg)]() [![Travis](https://img.shields.io/travis/cogolabs/cyto/master.svg)]() [![Coveralls](https://img.shields.io/coveralls/cogolabs/cyto.svg)]()

## Installation

#### CLI
```bash
> npm i -g npx
> npm i --save-dev cyto-cli
# Add this line to your .bash_profile / .bashrc / other
> alias cyto='npx cyto'
```

Npx isn't technically required, but it makes running Cyto much simpler. More discussion on this can be found [here](docs/npx.md)

#### Library
The `cyto-core` package can be used in a node.js app as a standalone library, but this feature is currently untested and the API is still not entirely stable. This will be updated when the functionality is fully supported.

## Docs

1. [Getting Started](docs/gettingStarted.md)
2. [Argument Types](docs/arguments.md)
3. [Composing Templates](docs/composing.md)
4. [Creating Your Own Template](docs/creatingTemplates.md)
5. [Runtime Dependencies](docs/runtimeDependencies.md)
6. [Partial Templates](docs/partialTemplates.md)
7. [Base Templates](docs/baseTemplates.md)
8. [Template Options](docs/options.md)
9. [Best Practices](docs/bestPractices.md)
10. [API Reference](docs/reference.md)

## Contributing
1. Read the docs on contributing [here](CONTRIBUTING.md) and sign the CLA
1. Clone this repository
1. Run `npm i`

## Contributors
Cyto is written and maintained by Connor Taylor [@taylorc93](https://github.com/taylorc93). However, it wouldn't have been possible without the help of these amazing people:

1. Scott Staniewicz [scottstanie](https://github.com/scottstanie)
    - For all of the documentation edits and user testing
1. Alicia Payette [apayette](https://github.com/apayette)
    - For designing the awesome logo
1. Alex Kasemir [alexkasemir](https://github.com/alexkasemir)
    - For documentation edits and user testing
1. Anna Richardson [annarichardson](https://github.com/annarichardson)
    - For user testing
