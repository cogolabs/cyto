module.exports = {
  templateId: "cyto/arg",
  dependencies: [
    'arg.js',
  ],
  args: [
    { id: 'type' },
    { id: 'default' },
    {
      id: 'dontPrompt',
      type: 'boolean',
      default: false,
    }
  ],
  options: {
    createDirectory: false,
  }
};