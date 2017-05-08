module.exports = {
  templateId: "cyto/composed",
  dependencies: [
    '{{id}}.txt',
  ],
  args: [
    { id: 'templateArg' },
    { id: 'userArg' }
  ],
  options: {
    createDirectory: false,
  }
};