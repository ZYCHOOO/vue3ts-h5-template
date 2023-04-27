module.exports = {
  description: 'create a view page',
  // 定义终端的询问方式
  prompts: [
    {
      type: 'input',
      name: 'name', // 作为接收用户输入结果的键
      message: 'please enter view page name :',
      default: 'myView'
    },
    {
      type: 'confirm',
      name: 'wantRouter',
      message: 'do you want to generate router ?',
      default: 'Y'
    }
  ],
  // 定义生成器在收集完用户的回答后需要进行的任务
  actions: function(data) {
    let actions = []
    actions.push({
      type: 'add', // 代表添加文件
      path: 'src/views/{{ name }}/{{ name }}.vue', // 这里的name就是上面定义的键
      templateFile: 'plop-templates/templates/view.hbs'
    })
    if (data.wantRouter) {
      actions.push({
        type: 'add',
        path: 'src/router/modules/{{ camelCase name }}Router.ts',
        templateFile: 'plop-templates/templates/router.ts.hbs'
      })
      // 修改已存在文件的内容
      actions.push({
        type: 'modify',
        path: 'src/router/index.ts',
        pattern: /(\/\/ append import)/gi,
        // camelCase 用来将输入的名称转化为驼峰
        template: "import {{ camelCase name }}Router from './modules/{{ camelCase name }}Router'\r\n$1"
      })
      actions.push({
        type: 'modify',
        path: 'src/router/index.ts',
        pattern: /(\/\/ append new router)/gi,
        // camelCase 用来将输入的名称转化为驼峰
        // $1 用于在结束的时候添加匹配的占位，用于下次使用
        template: '...{{ camelCase name }}Router,\r\n$1'
      })
    }
    return actions
  }
}