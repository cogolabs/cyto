module.exports = {
  templateId: "cyto-composed",
  dependencies: [
    '{{id}}.txt',
  ],
  args: [
    { id: 'templateArg' },
    { id: 'userArg' },
    {
      id: 'listArg',
      default: [],
      type: 'list',
    }
  ],
  options: {
    createDirectory: false,
  }
};