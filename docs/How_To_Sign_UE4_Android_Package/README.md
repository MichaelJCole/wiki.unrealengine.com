 How To Sign UE4 Android Package - Epic Wiki             

 

How To Sign UE4 Android Package
===============================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Here's a step-by-step guide to "signing" an Unreal 4 Android app (.apk file) for distribution (e.g. for release on Google Play or through other channels).

This distribution signing process is required for submitting apps to Google Play, and (in my experience) for .apk apps to run on everyday Android devices that do not have Developer Mode enabled, regardless of where the app is downloaded from.

When I needed to package an app for non-developer testing and shipping, I had to piece this process together from snippets on various help forums; this page aims to run through the whole process in one place.

**These instructions are current as of version 4.12.3.**

Contents
--------

*   [1 1\. GO TO PROJECT SETTINGS](#1._GO_TO_PROJECT_SETTINGS)
*   [2 2\. UPDATE YOUR "PACKAGING" SETTINGS](#2._UPDATE_YOUR_.22PACKAGING.22_SETTINGS)
*   [3 3\. FILL IN YOUR "DISTRIBUTION SIGNING" SETTINGS](#3._FILL_IN_YOUR_.22DISTRIBUTION_SIGNING.22_SETTINGS)
*   [4 4\. CREATE YOUR SIGNING KEY (.keystore file)](#4._CREATE_YOUR_SIGNING_KEY_.28.keystore_file.29)
*   [5 5\. VERIFY .keystore FILE CREATION AND TEST PACKAGING FOR ANDROID (SHIPPING)](#5._VERIFY_.keystore_FILE_CREATION_AND_TEST_PACKAGING_FOR_ANDROID_.28SHIPPING.29)

### 1\. GO TO PROJECT SETTINGS

Start by opening the Unreal project you want to sign. Open the "Project Settings" menu by clicking the Settings icon and selecting Project Settings from the dropdown, or going to Edit > Project Settings.

[![unframed](https://d26ilriwvtzlb.cloudfront.net/7/71/HowToFindProjectSettings.PNG)](/index.php?title=File:HowToFindProjectSettings.PNG "unframed")

There are two Settings sections you'll be working with here...

### 2\. UPDATE YOUR "PACKAGING" SETTINGS

First, find and click to "Packaging" section under the "Project" header (near the top of the left-side list of Settings sections).

Go ahead and check the "For distribution" box. This will automatically set the Unreal packaging process to output a Shipping build (instead of Development build) the next time you run it...

[![unframed](https://d26ilriwvtzlb.cloudfront.net/c/ce/PackagingSettings.PNG)](/index.php?title=File:PackagingSettings.PNG "unframed")

  
  

...BUT if you try to package now, you'll very likely get an error and build failure, because you haven't signed the package yet.

### 3\. FILL IN YOUR "DISTRIBUTION SIGNING" SETTINGS

Next, go to the other Settings section relevant to distribution signing: the "Android" section under "Platforms" (found near the bottom of the left-side settings list).

Within the Android section, there's a set of options titled "Distribution Signing," with four form fields:

[![unframed](https://d26ilriwvtzlb.cloudfront.net/7/78/SigningSettings.PNG)](/index.php?title=File:SigningSettings.PNG "unframed")

  
  

These fields (at least the first 3) need to be filled in with text that corresponds to the distribution signing "key" you're going to create in the next step.

a.) **Key Store:** this is the name of the signing key file you're about to create. This name MUST end with ".keystore" (that's the file type of the key file), but beyond that you can pick whatever name you want. So, for example...

"MyGame-key.keystore"

As long as it's in the format \[YourCustomKeyName\].keystore, Unreal should be able to find the file path during packaging.

b.) **Alias:** as far as I can tell, this is exactly what it sounds like - an alternate name for the signing key you'll create that'll help you easily recognize / identify it later on. Again, whatever you like... "MyGame" would be fine.

c.) **Key Store Password:** A general password for accessing any .keystore files you create. If you've never created a .keystore file or used the command line "keytool" for anything else, enter whatever you want here. If you have, enter the password you've used before.

d.) **Key Password:** A specific password for accessing THIS specific signing key (i.e. this specific .keystore file). YOU CAN LEAVE THIS BLANK if you just want to use the general keystore password you typed above.

So, after filling in each of those items, your Distribution Signing settings should look something like this:

[![unframed](https://d26ilriwvtzlb.cloudfront.net/d/d2/SampleSigningKeySettings.PNG)](/index.php?title=File:SampleSigningKeySettings.PNG "unframed")  

### 4\. CREATE YOUR SIGNING KEY (.keystore file)

The final step is to create the actual .keystore file using your computer's command line. (You'll sometimes see Android documentation refer to this as "manually creating" your signing key.)

_IMPORTANT NOTE: Some of the older Unreal help threads on this topic tell you to copy in and/or modify a preexisting SigningConfig.xml file. This is no longer necessary! Don't go looking for that file, you won't find it in your project folder or Unreal's general Engine folders._

\- Open a command line window. (In Windows, the easiest way to do this is hit the 'Windows' symbol key, type "cmd," and then hit 'Enter' or choose the "Command Prompt" program option that pops up. I haven't tested this process on a Mac, but using the same commands in Terminal should be pretty similar.)

\- Now, in the command line window, you need to navigate to the subfolder in your Unreal project called "Builds/Android". If you can find that folder in your actual file browser (e.g. Windows Explorer) project files, you can just type "cd " (include that space) in the command window and then drag and drop the folder in - the Command Prompt will convert it to a file path, and hitting enter in the command line should put you inside that folder. For example:

_cd "C:\\Users\\Me\\Documents\\Unreal Projects\\MyGame\\Android\\Builds"_

(If you've never packaged or launched your project for Android before, you may not have a "Builds" folder or the "Android" folder inside it... but just creating them now should work fine.)

\- Once you're in the right folder in the Command window, the final step is to type in the command that will create the .keystore file with all the necessary data.

**The one CRUCIAL THING** here is to make sure that the details you type when creating the file match what you entered in your Unreal Distribution Signing settings (Step 3 above). If you get something wrong, you'll have to go back to the settings and change the information there to match whatever you actually created in the .keystore file.

So if I were using the same info I entered in Step 3 above, I'd type:

_keytool -genkey -v -keystore MyGame-key.keystore -alias MyGame -keyalg RSA -keysize 2048 -validity 10000_

Or, the same command with the parts you should change to your own specific settings in brackets:

_keytool -genkey -v -keystore \[YourKeystoreFileName.keystore\] -alias \[YourAlias\] -keyalg RSA -keysize 2048 -validity 10000_

(This follows the instructions under "Sign your App Manually" at the very bottom of this page: [https://developer.android.com/studio/publish/app-signing.html#releasemode](https://developer.android.com/studio/publish/app-signing.html#releasemode) )

\- Hit "Enter," and you'll be prompted to "Enter keystore password." Here you should enter **EXACTLY the same "Key Store Password" you typed into your Unreal settings** ("xxxxxx" in my case). You'll be prompted to re-enter the password to confirm it.

You'll then get a series of questions requesting identifying information. Most of these are pretty straightforward (name, etc). I generally typed what was requested, or hit "enter" to leave a field blank (skipping fields this way didn't seem to cause any problems with signing, but I can't guarantee that it won't).

At the end of this list, you'll have the option of entering a password for this specific key. If you just want to use your general Key Store Password, hit 'Enter.' If you also want a specific password for this .keystore file, again enter exactly what you typed in the 4th/last field of your Unreal Distribution Signing settings.

And...that's it! The final output you should see from the Command Prompt is a rundown of the data for the .keystore file you just created. **If you want to be extra-safe, screenshot this line** so that you have this information on file, in case there were any typos or mismatches with what you entered in the Unreal settings.

### 5\. VERIFY .keystore FILE CREATION AND TEST PACKAGING FOR ANDROID (SHIPPING)

To verify that your distribution signing key was created, you can go to your Android/Builds folder within your project. You should see the "MyProject-key.keystore" in there. If it's not, something went wrong.

And now, when you go to **File > Package Project > Android** within the Unreal Editor, and then watch the build log, you will see, toward the end, that Unreal checks for the signing file.

If you still get an error at that stage of the build process, it is most likely because there is a mismatch between the filename or data in your actual .keystore file and what you entered in the Unreal Distribution Signing settings. Go back and check what you entered when you created the .keystore file in the command line (this is why screenshotting the final record is helpful). If anything doesn't match, change your Unreal settings to the correct text.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_To\_Sign\_UE4\_Android\_Package&oldid=431](https://wiki.unrealengine.com/index.php?title=How_To_Sign_UE4_Android_Package&oldid=431)"