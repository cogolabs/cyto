module.exports = {
  templateId: "cyto/tutorial",
  dependencies: [
    '{{id}}.txt',
  ],
  args: [
    {
      id: 'thingToGreet',
      default: 'world'
    }
  ],
  options: {
    createDirectory: false,
  }
};