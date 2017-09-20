module.exports = {
  templateId: "{{#scope}}{{.}}/{{/scope}}{{id}}",
  dependencies: [
  {{#files}}
    '{{id}}',
  {{/files}}
  ],
  args: [
  {{#args}}
    {{> cyto-arg}},
  {{/args}}
  ],
  options: {
    createDirectory: {{createDirectory}},
  }
};