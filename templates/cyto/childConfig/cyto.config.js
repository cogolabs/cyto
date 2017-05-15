module.exports = {
  base: {
    templateId: "cyto/baseConfig",
    args: {
      foo: 'bar'
    }
  },
  templateId: "cyto/childConfig",
  dependencies: [
    'fromChild.txt',
  ],
  args: [

  ],
  options: {
    createDirectory: false,
  }
};