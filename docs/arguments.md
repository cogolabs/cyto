# Template Arguments

The `cyto/tutorial` template is great for explaining the core mechanics of Cyto but glosses over some important details. In this section, we're going to dive into more detail about the `args` section of a Cyto template, using the `cyto/argumentDemo` template to help demonstrate the different types of arguments Cyto accepts. Remember that the `args` section of each `cyto.config.js` file is just an array of objects that declares what values to prompt a user for during generation. These values are then passed to mustache when each dependency is rendered. Let's take a look at an argument with all of the possible keys you can use:

```js
{
  id: 'demoArg',
  type: 'list', // default: string
  default: [] // default: undefined
  dontPrompt: false, // default: false
}
```

1. `id`: A unique identifier for an argument within a given template.
2. `type`: A string identifier for what type an argument is. Cyto supports four different types of arguments: `string` (default), `list`, `boolean`, and `function`.
3. `default`: A default value for the argument. Pretty self explanatory.
4. `dontPrompt`: A boolean flag that indicates if Cyto should avoid prompting the user for a value for this argument and use its default.

That's all there is to arguments! Cyto will automatically handle prompting a user for you, so all you need to do is declare what you need. However, there are a couple caveats regarding `function` arguments. Let's take a look at the `functionArg` from the `cyto/argumentDemo` template:

```js
{
  id: 'functionArg',
  type: 'function',
  default: () => {
    return (text, render) => {
      return render(text)
        .then((renderedText) => {
          return renderedText.replace('Replace me', 'Got replaced');
        });
    }
  },
  dontPrompt: true
}
```

Currently, Cyto is unable to prompt the user for functions via the command line, so they must be provided via `default` and have `dontPrompt` set to `true`. Function arguments also look a bit different than how they are detailed in the mustache documentation. This is because Cyto uses a slightly modified version of [mustache.js](https://github.com/janl/mustache.js/) where the rendering process is asynchronous. This means that the `render` function returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves with the rendered text, instead of returning the rendered text immediately. The reason behind this is due to how Cyto handles mustache partials, which will be explained in a later section. If you are familiar with [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) and are running a version of Node that supports them, you can express this in a much cleaner fashion:

```js
{
  id: 'functionArg',
  type: 'function',
  default: () => {
    return async (text, render) => {
      const renderedText = await render(text);
      return renderedText.replace('Replace me', 'Got replaced');
    }
  },
  dontPrompt: true
}
```
