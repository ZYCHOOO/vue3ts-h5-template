module.exports = {
  description: 'create an api file',
  prompts: [
    {
      type: 'input',
      name: 'apiName',
      message: 'please enter api name :',
      default: 'news'
    }
  ],
  actions: [
    {
      type: 'add',
      path: 'src/api/{{ apiName }}Api.ts',
      templateFile: 'plop-templates/templates/api.hbs'
    }
  ]
}