# Creating Your Own Templates

As stated earlier, one of the main goals of Cyto is to make it as easy as possible to write your own templates. Creating your own Cyto templates is just as important as generating them and is done via the `cyto create <templateId>` command:

```
> cyto create taylorc93/myFirstTemplate
Generating cyto/template with id taylorc93/myFirstTemplate
? files: someDependencyFile.js
? args:
> ls /path/to/GTL/taylorc93/myFirstTemplate
cyto.config.js        someDependencyFile.js
```

Under the hood, `cyto create` is just generating the `cyto/template` template. It's almost equivalent to calling `cyto gen cyto/template <yourTemplateName>`, except that `cyto create` always writes new templates to the GTL instead of relative to where the command was run. This template accepts two list argument: `files` and `args`. `files` will both pre-populate the `dependencies` section of the new `cyto.config.js` file as well as create the boilerplate files the new template needs. `args` pre-populates the `args` section of the `cyto.config.js`. 

Your new template is ready to be generated immediately after you run `cyto create`. However, you'll probably want to add some boilerplate to each dependency file. 