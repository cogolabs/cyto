module.exports = {
  templateId: "cyto-composing",
  dependencies: [
    'composing.txt',
    {
      templateId: 'cyto-composed',
      args: {
        id: 'composedTemplate',
        templateArg: 'I was passed via another template'
      }
    },
  ],
  args: [
    { id: 'userArg' },
  ],
  options: {
    createDirectory: false,
  }
};