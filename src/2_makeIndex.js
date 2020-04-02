/**
There are better ways to do much of this.  I was in a hurry.
*/

var path = require('path')
var fs = require('fs')

// List all our files
// https://gist.github.com/victorsollozzo/4134793
function recFindByExt(base,ext,files,result) {
    files = files || fs.readdirSync(base) 
    result = result || [] 

    files.forEach( file => {
      var newbase = path.join(base,file)
      if ( fs.statSync(newbase).isDirectory() ) {
        result = recFindByExt(newbase,ext,fs.readdirSync(newbase),result)
      } else {
        if ( file.substr(-1*(ext.length+1)) == '.' + ext ) result.push(newbase)
      }
    })
    return result
}

// List the files
mdFiles = recFindByExt('../docs','md')

var readmeContent = fs.readFileSync('../README.md', 'UTF-8');

fileList = mdFiles.reduce((total, item) => {
  var name = item.replace('../docs/', '').replace('_', ' ').replace('/README.md', '').trim()
  var path = item.replace('../docs', '')
  total += `- [${name}](${path})\n\n`
  return total
}, '')
readmeContent += fileList

fs.writeFileSync('../docs/README.md', readmeContent)
