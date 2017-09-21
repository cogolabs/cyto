module.exports = {
  templateId: "cyto-partials",
  dependencies: [
    'demo.txt'
  ],
  args: [
    {
      id: 'thingsToGreet',
      type: 'list',
      default: []
    },
    {
      id: 'thingToGreet',
      default: 'Cyto expert :D'
    },
    {
      id: 'partialToGenerate',
      default: 'cyto-helloworld'
    }
  ],
  options: {
    createDirectory: false
  }
};