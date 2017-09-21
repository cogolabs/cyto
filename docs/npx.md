## NPX

Cyto needs to be installed locally for a few reasons

1. **Template resolution**: When modules are installed globally, their dependencies are installed in a separate `node_modules` folder inside of the package. Since Cyto loads templates from `node_modules`, this would make finding the templates immensely more difficult
2. **Better versioning**: You can install different versions of the same template for different projects. This wouldn't be possibly globally
3. **Easier project setup**: By putting Cyto in your project's dependencies, you don't need to include extra install steps to make sure everyone is working with the same setup

You might be tempted to make an npm script to run Cyto:

```js
{
  "scripts": {
    "cyto": "cyto"
  }
}
```

However, Cyto also needs to know where you run the command in order to output your boilerplate properly. Whenever you use `npm run`, it always runs the command from the root of your project. AFAIK, there is no method of getting the directory an `npm run` command was executed in.

`npx` offers similar functionality to `npm run`, but preserve the working directory information for the process it executes. Thus, `npx` was the best way to enable local installation for Cyto.

I'm very much open to alternatives as this makes the install flow a little bit more complicated. Any ideas are welcome!