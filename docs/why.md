# Why You Should Use Cyto

## An Example Scenario
The best way to demonstrate the benefits of Cyto and explain how I came up with the core ideas behind it is through a real world example. Let's walk through the steps of creating a new React project. Even though the example is React focused, Cyto is language independent (with the exception of the config files) and can be used to generate any type of project. This is simply meant to provide a real world context to highlight Cyto's main benefits.

Now let's think of all of the things that we're doing to create this new project. At the bare minimum, we need:
  1. `README.md`
  1. `package.json`
  1. `.gitignore`
  1. Some kind of build config (eg. `webpack.config.js`)
  1. If you like ES6 (you really should), some kind of transpiler (eg. `.babelrc`)
  1. `src/`
      * `index.js` - Where you call `React.render`
      * `App.js` - The component we're going to render
      * `index.css` - Our css styles

There are a few ways that we can create all of these things without having to manually create them, which is tedious and very prone to mistakes. I'm going to list what I consider to be the top 3 alternatives.

#### create-react-app
We could use [create-react-app](https://github.com/facebookincubator/create-react-app), which will give us all of this for free. However, we have nothing to help us create new pieces of the project like React components, React Router, Redux, etc. We'll have to do all of that manually. Plus, the build config is managed unless ejecting, which then gives us a dense, complicated set of new config files.  As much as I love `create-react-app`, I find myself avoiding it for most medium or large size projects that require more control.

#### Yeoman
Another option would be to use [Yeoman](http://yeoman.io/), the current leading boilerplate generator. Yeoman uses the concept of generator plugins to let you scaffold new web apps (not any kind of project) and perform common operations within that project, such as creating new components, contatiners, etc. The big problem I have with Yeoman is that the generators usually do too much and end up locking you into a certain project structure. It's also hard to create your own generators as you'll have to know javascript and learn their api, which is no small task. As an example, take a quick look at how complex the project for generating an angular project is [here](https://github.com/yeoman/generator-angular). I've never really enjoyed using Yeoman because at the end of the day, it makes me feel like I'm jumping through too many hoops for not enough payoff.

#### Roll your own starter project
The final option would be to roll your own starter project for React applications. This will give you the control you want and allow you to easily 

## Creating a React app with Cyto

1. `cyto gen react/app`

## In Summary

It should be pretty clear of the immediate benefit of using Cyto: you can do more with less typing. But there are more benefits to using Cyto. You can:
   * Enforce a common style and structure across your projects
   * Think more deeply about your project structure

