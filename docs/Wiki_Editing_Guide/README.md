Wiki Editing Guide - Epic Wiki                    

Wiki Editing Guide
==================

Contents
--------

*   [1 How to edit the Wiki](#How_to_edit_the_Wiki)
    *   [1.1 UE4 Wiki Format Guide](#UE4_Wiki_Format_Guide)
        *   [1.1.1 Page Content](#Page_Content)
        *   [1.1.2 Wiki Markup](#Wiki_Markup)
        *   [1.1.3 Images](#Images)
        *   [1.1.4 Videos](#Videos)
        *   [1.1.5 Page Rating](#Page_Rating)
    *   [1.2 Example Pages](#Example_Pages)
        *   [1.2.1 Tutorial Template](#Tutorial_Template)
        *   [1.2.2 Plugin](#Plugin)

How to edit the Wiki
====================

You can find out more about general Wiki editing at the [MediaWiki](//www.mediawiki.org/wiki/MediaWiki) website. Before editing any pages, you will need to [create an account](https://www.unrealengine.com/register).

UE4 Wiki Format Guide
---------------------

### Page Content

*   Create a new page by connecting to a page that does not exist yet. Try typing it into the URL or linking text on another page.
*   Make use of [Wiki formatting](https://www.mediawiki.org/wiki/Help:Formatting) to organize the content of a page
    *   Use tables when applicable
    *   Include a Category tag to organize the page into a category of other similar pages _(eg: **\[\[Category:Tutorial\]\]** )_
    *   Make proper use of Headers to separate sections
        *   Don't use headers to style - use them to organize
*   Use correct/consistent UE4 terminology
    *   Don't use several terms to refer to the same thing in a page. Use only one
*   Don't overuse colors and formatting, as this can be distracting
*   Don't use foul language
*   Use proper spelling and grammar, and be sure to proof read
*   Add a link to your user page at the bottom so that people will know that you are the original author

### Wiki Markup

To experiment with Wiki markup, edit the **[Wiki Sandbox](/Wiki_Sandbox "Wiki Sandbox")** page.

  
You can read more about the wiki markup used to format Wiki pages here:

*   [Mediawiki: Formatting](http://www.mediawiki.org/wiki/Help:Formatting)
*   [Mediawiki: Lists](http://www.mediawiki.org/wiki/Help:Lists)
*   [Mediawiki: Links](http://www.mediawiki.org/wiki/Help:Links)
*   [Mediawiki: Images](http://www.mediawiki.org/wiki/Help:Images)
*   [Complete List of Markup Documentation](http://www.mediawiki.org/wiki/Help:Contents)

### Images

*   For blueprint screenshots consider using PNG format
*   Give your images unique and descriptive names when uploading
*   Larger images should be kept in thumbnail or gallery form to save space
*   If you are unfamiliar with Wiki markup, avoid aligning images to the right or left, for the sake of page consistency. Use an alignment property of **none** instead. _(see example below)_
*   Go back and update images if there are updates in the engine

  
Example of wiki-markup for adding an image to the page:

\[\[File:ImageName.png|thumb|none|940px|Optional Caption Here\]\]

*   **File** specifies the file name of the image.
*   **thumb** specifies that the image should be displayed as a small thumbnail.
    *   Replacing **thumb** with **frame** causes the image to be displayed in its native size - that is, the size that it was originally uploaded with. This use is obsolete and should not be used because it is disruptive for many displays, especially mobile devices.
    *   Thumbnails can be resized by specifying a **size** parameter _(see below)_
*   **none** specifies that the image has no alignment properties, and will appear on the left of the page by default. Aligning the image using **left** or **right** instead will cause the text on the page to wrap around the image, and may cause unwanted formatting in the flow of the page. **center** will simply center the image on the page.
    *   If you are unfamiliar with wiki-formatting, it's best to avoid using **left** and **right**, as these may disrupt the flow of the page.
    *   If you use **left** or **right** and want to avoid text-wrapping, place `<br clear=all>` after the image file to clear the text-wrapping effect.
*   **size** sets the maximum width of the image. In the example below, the image is limited to 500 pixels wide. **940px** is a good width for displaying large images.
*   **Caption** is optional, and can be added as the last parameter. Captions can be useful by describing what's going on in an image. The caption will be displayed at the bottom of images that are either set as **thumb**.

  
**Result (example):**

[![](https://d3ar1piqh1oeli.cloudfront.net/c/cd/Generic_viewport_screenshot.jpg/500px-Generic_viewport_screenshot.jpg)](/File:Generic_viewport_screenshot.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Generic_viewport_screenshot.jpg "Enlarge")

An example image

  

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) [You can read more about Image formatting here.](http://en.wikipedia.org/wiki/Wikipedia:Picture_tutorial)

### Videos

*   Add a Youtube video using <youtube>(URL)</youtube>
    *   Describe video contents on page
    *   Only embed UE4 related videos
        *   NSFW video content is not allowed
    *   Do not create a page with only an embedded video, please make sure to add text describing the purpose of the video too.

### Page Rating

*   Include a Page Rating on all of your submitted tutorials and content
    *   The syntax for adding the rating template is {{Rating|Type=Page|Versions=4.0}}
        *   You can then alter the Type of page and Version number that the information applies to. Example: {{Rating|Type=Video|Versions=4.0, 4.1}}

Example Pages
-------------

### Tutorial Template

[Wiki Tutorial Template](/Wiki_Tutorial_Template "Wiki Tutorial Template")

### Plugin

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Wiki\_Editing\_Guide&oldid=16866](https://wiki.unrealengine.com/index.php?title=Wiki_Editing_Guide&oldid=16866)"

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)