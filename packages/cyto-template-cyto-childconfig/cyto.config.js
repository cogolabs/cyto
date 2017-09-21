module.exports = {
  base: {
    templateId: "cyto-baseconfig",
    args: {
      foo: 'bar'
    }
  },
  templateId: "cyto-childconfig",
  dependencies: [
    'fromChild.txt'
  ],
  args: [

  ],
  options: {
    createDirectory: false
  }
};
