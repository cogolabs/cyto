module.exports = {
  templateId: "cyto-helloWorld",
  dependencies: [
    '{{id}}.txt',
  ],
  args: [
    {
      id: 'thingToGreet',
      default: 'world',
    },
  ],
  options: {
    createDirectory: false,
  }
};