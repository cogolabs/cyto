module.exports = {
  templateId: 'cyto-preset',
  dependencies: [
    '.gitignore',
    'index.js',
    '{{package}}.json'
  ],
  args: [
    {
      id: 'package',
      type: 'string',
      default: 'package',
      dontPrompt: true
    },
    {
      id: 'description',
    }
  ],
  options: {
    createDirectory: true,
    skipRuntimeRendering: true
  }
};