/**

There are better ways to do much of this.

This is a first draft to see what happens next.  

I've been beating my head against Unreal for a few months, and web data processing is a nice relaxing change :-)

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
  ret = ret.replace(/\.html$/g, ".md");
  return ret
}

// List the files
htmlFiles = recFindByExt('../original','html')

// Useful for testing
//htmlFiles = htmlFiles.slice(0, 1)

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
  
  // Skip some articles that break build
  skipMe = [
    '../original/Category:Community_Created_Content',
    '../original/Entry_Level_Guide_to_UE4_C++',
    '../original/Logs,_Printing_the_Class_Name,_Function_Name,_Line_Number_of_your_Calling_Code',
    '../original/Mass_Scale_of_Physics_Mesh,_Dynamically_Update_During_Runtime',
    '../original/Mass_Scale_of_Physics_Mesh,_Dynamically_Update_During_Runtime!',
    '../original/Survival_sample_game',
    '../original/Unreal_Tournament',
    '../original/Entry_Level_Guide_to_UE4_C++?utm_source=Academic List one&utm_campaign=9b53f822a3-Unreal_Engine_Newsletter-4-2015&utm_medium=email&utm_term=0_fc87d0107c-9b53f822a3-30674041',
    '../original/Global_Data_Access,_Data_Storage_Class_Accessible_From_Any_CPP_or_BP_Class_During_Runtime',
    '../original/Global_Data_Access,_Data_Storage_Class_Accessible_From_Any_CPP_or_BP_Class_During_Runtime!',
    '../original/Survival_sample_game?utm_medium=referral&utm_source=zeef.io',
    '../original/Unreal_Tournament?month=June&day=15&year=1990&x=47&y=19',
    'File_Management,_Create_Folders,_Delete_Files,_and_More',
    'Slate!_Hello',
    'docs/Draw_3D_Debug_Points,_Lines,_and_Spheres:_Visualize_Your_Algorithm_in_Action!',
    'docs/Blueprint_Function_Library,_Create_Your_Own_to_Share_With_Community!',
    'docs/Blueprint_Function_Library,_Create_Your_Own_to_Share_With_Others!',
    
  ]
  // This was everythign with a ! or url params I think
  // TODO FIXME this won't work.  The above folders need to be removed manually, or this part fixed.
  // I have some other stuff to do and this is over time.
  if (skipMe.includes(htmlFileName)) return // untested
  
  
  // Read the file contents
  fsRead.readFile(htmlFilename, 'utf8', function(err, contents) {
    if (err) return console.log(htmlFilename, err) // read error

    // get new name
    var newName = markdownFilename(htmlFilename)

    // Convert contents to markdown
    var markdown = turndownService.turndown(contents)
    
    fsWrite.outputFile(newName, markdown)
    .then(() => { console.log('SUCCESS ', newName) })  // Complete
    .catch(err => { console.log(newName, err) }) // Write error
  })
})
