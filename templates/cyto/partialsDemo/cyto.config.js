module.exports = {
  templateId: "cyto/partialsDemo",
  dependencies: [
    'demo.txt',
  ],
  args: [
    {
      id: 'thingsToGreet',
      type: 'list',
      default: [],
    },
    {
      id: 'thingToGreet',
      default: 'Cyto expert :D'
    }
  ],
  options: {
    createDirectory: false,
  }
};