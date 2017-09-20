module.exports = {
  templateId: "cyto-helloworld",
  dependencies: [
    '{{id}}.txt',
  ],
  args: [
    {
      id: 'thingToGreet',
      default: 'world'
    },
  ],
  options: {
    createDirectory: false,
  }
};