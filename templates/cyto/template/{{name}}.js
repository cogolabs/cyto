module.exports = {
  templateId: "{{id}}",
  dependencies: [
  {{#files}}
    '{{id}}',
  {{/files}}
  ],
  args: [
  {{#args}}
    {{> cyto/arg}},
  {{/args}}
  ],
  options: {
    createDirectory: false,
  }
};