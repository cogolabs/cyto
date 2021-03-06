module.exports = {
  templateId: "cyto-arguments",
  dependencies: [
    'demo.txt'
  ],
  args: [
    {
      id: 'stringArg',
      default: "I'm a string"
    },
    {
      id: 'booleanArg',
      type: 'boolean',
      default: false
    },
    {
      id: 'listArg',
      type: 'list',
      default: []
    },
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
    },
    {
      id: 'runtimeArg',
      type: 'string',
      default: (args) => `stringArg was set to ${args.stringArg}`,
      dontPrompt: true
    }
  ],
  options: {
    createDirectory: false
  }
};