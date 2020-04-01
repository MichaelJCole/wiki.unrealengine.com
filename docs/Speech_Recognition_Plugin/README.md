Speech Recognition Plugin - Epic Wiki                    

Speech Recognition Plugin
=========================

  

Name

Speech Recognition Plugin

Category

Input

Author

ShaneC

  

Sphinx-UE4
----------

Sphinx-UE4 is a speech recognition plugin for Unreal Engine 4. The plugin makes use of the Pocketsphinx library. At the moment, this plugin should be used to detect phrases. (eg. "open browser"). Singular words recognition is poor. I am looking at ways to improve this to a passable level.

[http://cmusphinx.sourceforge.net](http://cmusphinx.sourceforge.net)

Example Projects
----------------

The following are links to example projects, which showcase how the plugin can be used to control a character. This functionality is showcased in the following video:

[https://www.youtube.com/watch?v=wtXIiFTre\_w](https://www.youtube.com/watch?v=wtXIiFTre_w)

UE4.10 [https://drive.google.com/open?id=0BxR5qe2wdwSLWUNBSWZhNGFFSXc](https://drive.google.com/open?id=0BxR5qe2wdwSLWUNBSWZhNGFFSXc)

UE4.11 [https://drive.google.com/open?id=0BxR5qe2wdwSLWk5HR1hpU1o0LVU](https://drive.google.com/open?id=0BxR5qe2wdwSLWk5HR1hpU1o0LVU)

How to use
----------

*   Download the latest code from GitHub ([https://github.com/shanecolb/sphinx-ue4](https://github.com/shanecolb/sphinx-ue4))
*   Copy Plugins and Content folders into the project of your choosing.
*   From the Binaries folder, copy the appropriate .dll into Plugins\\SpeechRecognition\\Binaries\\Win64.

Eg. for version 4.10, I would copy Binaries\\4\_10\\UE4Editor-SpeechRecognition.dll

*   Download and extract the following archive into the path "Content/model" within your project.

[Language Models](https://drive.google.com/file/d/0BxR5qe2wdwSLMUVZQmpaUDRHeTg/view?usp=sharing)

[![Sphinx UE4 older.png](https://d26ilriwvtzlb.cloudfront.net/c/c4/Sphinx_UE4_older.png)](/File:Sphinx_UE4_older.png)

*   Open the project, and enable the Speech Recognition plugin.
*   I have included within the Content folder, a configured demo asset. This blueprint showcases the speech recognition plugin.

_It is currently configured to listen for the phrases ("open browser", "close browser", "hello world"). If one of the spoken phrases is detected, then the phrase is logged to the screen._

*   If the blueprint is unavailable, I have included steps/screenshots that can be followed, to re-create the functionality:

Blueprint Changes
-----------------

1) When the Begin Game event is fired, create a Speech Recognition actor, and save a reference to this actor. After this, bind a method to OnWordSpoken. (This method will be triggered each time a recognised phrase is spoken) Lastly, ensure Shutdown is called during End Play. [![Sphinx UE4 2.png](https://d26ilriwvtzlb.cloudfront.net/5/56/Sphinx_UE4_2.png)](/File:Sphinx_UE4_2.png)

2) From a key event of 'I', call Init on the speech recognition actor. Init is passed an array of Recognition keywords. (this is explained later) From a key event of 'S', call Shutdown on the speech recognition actor. [![Sphinx UE4 3.png](https://d26ilriwvtzlb.cloudfront.net/8/8d/Sphinx_UE4_3.png)](/File:Sphinx_UE4_3.png)

3) Finally, the word spoken event will simply print the phrase to the screen. [![Sphinx UE4 4.png](https://d26ilriwvtzlb.cloudfront.net/5/5c/Sphinx_UE4_4.png)](/File:Sphinx_UE4_4.png)

Recognition Keywords/Adding additional words
--------------------------------------------

A set of Recognition Keywords are passed to Init. These are used to determine which phrases are spoken by the player. A Recognition Keyword comprises a string (representing the phrase we wish to detect) and a tolerance setting. This tolerance determines how easily a phrase will trigger. Play around with the tolerance settings, to test the balance between sensitivity, and false positives.

If your phrase features words which are not in the dictionary, they will not be detected. To add words to the dictionary, open the .dict file that matches the language of your chosing (eg. English is "Content\\model\\en\\en.dict"). This contains a list of recognised words. The first string is the recognised word. The rest is the phonetics of how the word is recognised.

Here are some examples:

abbott AE B AH T

ball B AO L

bandit B AE N D AH T

Simply add a word in a similar manner, and re-save the file.

Plans ahead
-----------

*   Create C++ only examples which showcase the plugin:

Currently, I have only included a Blueprint example. I wish to write some C++ examples, showing how the plugin can run in a C++ class, instead of a Blueprint.

*   Adding additional languages:

Currently there exists a number of sphinx trained language models for languages other than English. If the language is supported by Unreal Engine 4, and there exists a trained model, then I will add it.

*   Improving the accuracy:

At the moment, my testing has been anecdotal testing. I wish to work on improving the accuracy. Either by tweaking of the parameters passed into Sphinx, or by the tweaking of the keyword tolerance values for the keyword Tolerance enumeration.

Contact Information
-------------------

If you have any suggestions or questions, I would love to hear them. Please feel free to e-mail me at shane.colbert@gmail.com. If you have any suggestions, or wish to help out, the project is on github.

[https://github.com/shanecolb/sphinx-ue4](https://github.com/shanecolb/sphinx-ue4)

Known Issues
------------

*   At the moment, there is a minor issue, where a phrase is spoken eg "start game", and the phrase is not detected.

The phrase is then spoken again, and both phrases are detected. Eg. "start game" "start game"

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Speech\_Recognition\_Plugin&oldid=21081](https://wiki.unrealengine.com/index.php?title=Speech_Recognition_Plugin&oldid=21081)"

[Category](/Special:Categories "Special:Categories"):

*   [Plug-ins](/Category:Plug-ins "Category:Plug-ins")

  ![](https://tracking.unrealengine.com/track.png)