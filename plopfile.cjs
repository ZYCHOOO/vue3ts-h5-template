const apiGenerator = require('./plop-templates/generators/apiGenerator.cjs')
const viewGenerator = require('./plop-templates/generators/viewGenerator.cjs')
const componentGenerator = require('./plop-templates/generators/componentGenerator.cjs')
//  Plop 入口文件 需要导出一个函数
// 此函数接收一个 plop 对象，用于创建生成器任务

module.exports = plop => {
  plop.setHelper('lowerCase', (val) => {
    return val.toLowerCase()
  })
  plop.setHelper('pascalCase2Line', (val) => {
    arr = val.split('')
    arr[0] = arr[0].toLowerCase()
    return arr.join('').replace(/([A-Z])/g,"-$1").toLowerCase()
  })
  plop.setHelper('firstUpper', (val) => {
    const arr = val.split('')
    arr[0] = arr[0].toUpperCase()
    return arr.join('')
  })
  // 指定一个生成器
  // 第一个参数是指定生成器名称
  // 第二个参数是用来定义生成的具体可选项

  // 生成页面
  plop.setGenerator('view', viewGenerator)

  // 生成api
  plop.setGenerator('api', apiGenerator)

  // 生成component
  plop.setGenerator('component', componentGenerator)
}