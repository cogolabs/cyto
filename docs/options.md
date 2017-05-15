# Options

Up til now, we haven't talked about the `options` key and what values you can set there. This document serves as a reference for all of the different options that you can set for a Cyto template. All options are false by default.

1. `createDirectory` : If set to `true`, the generated template will be stored within a new directory. The name of this directory will be whatever the `id` arg is set to.
2. `skipRuntimeRendering`: If set to `true`, any string dependencies that were created by a runtime dependency will not be passed through the Mustache renderer.

Right now, there are extremely few options that you can set for Cyto. There will almost certainly be more to come.
