module.exports = {
  templateId: 'cyto/template',
  dependencies: [
    '{{name}}.js',
    (args) => args.files.map((f) => f.id),
  ],
  args: [
    {
      id: 'name',
      type: 'string',
      default: 'cyto.config',
      dontPrompt: true
    },
    {
      id: 'files',
      type: 'list',
      default: []
    },
    {
      id: 'args',
      type: 'list',
      default: []
    }
  ],
  options: {
    createDirectory: true
  }
};