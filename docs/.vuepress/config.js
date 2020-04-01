const glob = require('glob');

let markdownFiles = glob.sync('docs/**/*.md').map(markdownFile => {
  var path = markdownFile.replace('docs', '').replace('README.md', '')
  return [path, path]
}); 

console.log(markdownFiles)
// update the docs/**/*.md pattern with your folder structure 

module.exports = {
  title: 'wiki.unrealengine.com',
  description: 'A static site pulled from the internet archive',
  base: '/wiki.unrealengine.com/',
  theme: '@vuepress/theme-default',
  themeConfig: {
    sidebar: markdownFiles
  }
}