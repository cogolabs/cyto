module.exports = {
  templateId: "cyto/composing",
  dependencies: [
    'composing.txt',
    {
      templateId: 'cyto/composed',
      args: {
        id: 'composedTemplate',
        blurb: 'I was passed via another template'
      }
  ],
  args: [
    { id: 'templateArg' },
    { id: 'userArg' }
  ],
  options: {
    createDirectory: false,
  }
};