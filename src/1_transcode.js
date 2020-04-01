/**
There are better ways to do much of this.  I was in a hurry.
*/


var path = require('path')
var fs = require('fs')                // node's fs module
var fsRead = require('graceful-fs')  // backoff open file limit https://github.com/isaacs/node-graceful-fs
var fsWrite = require('fs-extra')    // makedirp on write
var TurndownService = require('turndown')
var turndownService = new TurndownService()

// Configure turndown html->md converter
turndownService.remove('head')
turndownService.remove('script')
turndownService.remove('style')

idsToSkip = ['head', 'pagenav', 'mw-navigation', 'footer'];
turndownService.addRule('remove div by id', {
  filter: function(node, options) {
    return idsToSkip.includes(node.getAttribute('id'))
  },
  replacement: function (content) { return '' }
})

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

// Rename the file
function markdownFilename(htmlFilename) {
  // ../original/Slate_Data_Binding_Part_3/index.html
  // ../docs/Slate_Data_Binding_Part_3/index.md
  var ret = htmlFilename.replace(/^\.\.\/original/g, "../docs/");
  ret = ret.replace(/\index.html$/g, "README.md");
  return ret
}

// List the files
htmlFiles = recFindByExt('../original','html')

// Loop each filename
htmlFiles.forEach(htmlFilename => {
  
  // Skip some directories
  if (/^\.\.\/original\/api.pnp\?/.test(htmlFilename)) return
  if (/^\.\.\/original\/Special\:/.test(htmlFilename)) return
  if (/^\.\.\/original\/index.php\?/.test(htmlFilename)) return
  if (/^\.\.\/original\/Talk:/.test(htmlFilename)) return
  if (/^\.\.\/original\/Template:/.test(htmlFilename)) return
  if (/^\.\.\/original\/User:/.test(htmlFilename)) return
  if (/^\.\.\/original\/User_talk:/.test(htmlFilename)) return
  if (/^\.\.\/original\/Version_Notes/.test(htmlFilename)) return
  if (/^\.\.\/original\/Videos\?/.test(htmlFilename)) return
  if (/^\.\.\/original\/Videos\/Player/.test(htmlFilename)) return
  
  // breaks the build
  if (htmlFilename.includes('!')) return
  if (htmlFilename.includes('?')) return
  
  // Skip some articles that break build
  var skipMe = [
    'Category:Community_Created_Content',
    'Entry_Level_Guide_to_UE4_C++',
    'File_Management,_Create_Folders,_Delete_Files,_and_More',
    'Global_Data_Access,_Data_Storage_Class_Accessible_From_Any_CPP_or_BP_Class_During_Runtime',
    'Logs,_Printing_the_Class_Name,_Function_Name,_Line_Number_of_your_Calling_Code',
    'Mass_Scale_of_Physics_Mesh,_Dynamically_Update_During_Runtime',
    'Survival_sample_game',
    'Unreal_Tournament',
  ].map(f => '../original/' + f + '/index.html')
  // These articles break the build
  if (skipMe.includes(htmlFilename)) return // untested
  
  
  // Read the file contents
  fsRead.readFile(htmlFilename, 'utf8', function(err, contents) {
    if (err) return console.error(htmlFilename, err)

    // get new name
    var newName = markdownFilename(htmlFilename)

    // Convert contents to markdown
    var markdown = turndownService.turndown(contents)
    
    fsWrite.outputFile(newName, markdown)
    .then(() => { console.log('SUCCESS ', newName) })  // Complete
    .catch(err => { console.error(newName, err) }) // Write error
  })
})
