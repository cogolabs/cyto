module.exports = {
  templateId: 'cyto-template',
  dependencies: [
    '.gitignore',
    '{{config}}.js',
    '{{package}}.json',
    (args) => args.files.map((f) => f.id)
  ],
  args: [
    {
      id: 'config',
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
    },
    {
      id: 'createDirectory',
      type: 'boolean',
      default: false
    },
    {
      id: 'package',
      type: 'string',
      default: 'package',
      dontPrompt: true
    },
    {
      id: 'description'
    }
  ],
  options: {
    createDirectory: true,
    skipRuntimeRendering: true
  }
};