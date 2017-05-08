module.exports = {
  templateId: "cyto/runtimeDependencies",
  dependencies: [
    // Case 1: Returns a string
    (args) => '{{fileName}}.txt',
    // Case 2: Returns an array of strings
    (args) => ['{{fileName}}.txt', 'blank.txt'],
    // Case 3: Returns an object
    (args) => {
      return {
        templateId: 'cyto/composed',
        args: {
          id: 'nonUnique',
          templateArg: 'I came from case 3'
        }
      };
    },
    // Case 4: Return an array of objects
    (args) => {
      return [
        {
          templateId: 'cyto/composed',
          args: {
            id: 'unique',
            templateArg: 'I came from case 4'
          }
        }
      ];
    },
    // A more realistic use case, creates a new template for each value in
    // args.templates
    (args) => {
      return args
        .templates
        .map((t) => {
          return {
            templateId: 'cyto/composed',
            args: {
              id: t.id,
              templateArg: 'I was created from a map statement'
            }
          }
        });
    }
  ],
  args: [
    { id: 'fileName' },
    {
      id: 'templates',
      type: 'list',
      default: []
    }
  ],
  options: {
    createDirectory: false,
  }
};