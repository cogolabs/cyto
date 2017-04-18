module.exports = {
  templateId: "cyto/composed",
  dependencies: [
    'composed.txt',
  ],
  args: [
    { id: 'templateArg' },
    { id: 'userArg' }
  ],
  options: {
    createDirectory: false,
  }
};