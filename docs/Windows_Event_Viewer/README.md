Windows Event Viewer - Epic Wiki                    

Windows Event Viewer
====================

  

Contents
--------

*   [1 About This Guide](#About_This_Guide)
*   [2 Documentation and Links](#Documentation_and_Links)
*   [3 Retrieving Event Viewer Logs](#Retrieving_Event_Viewer_Logs)
    *   [3.1 Step 1: Locating the Event Viewer](#Step_1:_Locating_the_Event_Viewer)
    *   [3.2 Step 2: The Event Viewer](#Step_2:_The_Event_Viewer)
    *   [3.3 Step 3: Overview and Summary Tab](#Step_3:_Overview_and_Summary_Tab)
    *   [3.4 Step 4: Event Errors for Applications](#Step_4:_Event_Errors_for_Applications)
    *   [3.5 Step 5: Application Error Events](#Step_5:_Application_Error_Events)
    *   [3.6 Step 6: Selecting and Saving the Event Logs](#Step_6:_Selecting_and_Saving_the_Event_Logs)

About This Guide
----------------

There may be times where Unreal Engine 4 will crash but will not open the Crash Reporter windows so that you can add comments and submit the report. This can make it difficult to see what exactly caused your crash in the Editor. Typically, these kinds of crashes are not attributed directly to Unreal Engine 4 causing the crash, but instead are attributed to an error with Windows that causes the application in question to shut down.

This guide will walk through the steps of using **Windows Event Viewer** (think of this like a crash reporter for Windows) to locate the error code from the application in question being shut down. This guide will not attempt to diagnose specific instances and should be considered as a broad overview for retrieving the necessary information for our Support team or for yourself to help diagnose what may be causing the issue in Windows that closes the application.

  

Documentation and Links
-----------------------

*   [Event Viewer Wiki](https://en.wikipedia.org/wiki/Event_Viewer)
*   [Using Event Viewer](https://www.winhelp.us/event-viewer-in-windows.html)
*   [YouTube: How to use Event Viewer](https://www.youtube.com/watch?v=J6vUOyxmU1o)

  

Retrieving Event Viewer Logs
----------------------------

### Step 1: Locating the Event Viewer

Navigate to your Control Panel in Windows and click on **System and Security**.

[![S1 ControlPanel.png](https://d3ar1piqh1oeli.cloudfront.net/5/58/S1_ControlPanel.png/500px-S1_ControlPanel.png)](/File:S1_ControlPanel.png)

  
Then you will need to click on **Administrative Tools**

[![S1 ControlPane admintoolsl.png](https://d3ar1piqh1oeli.cloudfront.net/5/5a/S1_ControlPane_admintoolsl.png/500px-S1_ControlPane_admintoolsl.png)](/File:S1_ControlPane_admintoolsl.png)

This will open a separate window with the applications related to Administrative Tools.

[![S1 AdminTools EventViewer.png](https://d3ar1piqh1oeli.cloudfront.net/c/cc/S1_AdminTools_EventViewer.png/500px-S1_AdminTools_EventViewer.png)](/File:S1_AdminTools_EventViewer.png)

Now double-click on **Event Viewer** to open the application.

  

### Step 2: The Event Viewer

Once you have opened the Event Viewer you will see a window like this.

[![S2 EventViewer.png](https://d3ar1piqh1oeli.cloudfront.net/e/eb/S2_EventViewer.png/500px-S2_EventViewer.png)](/File:S2_EventViewer.png)

  

### Step 3: Overview and Summary Tab

In the top left you will see the section **Event Viewer (Local)**. This should be selected by default when you open the Event Viewer, but in the case it is not you can select it here to see the Overview section we will need access to.

[![S3 EventViewer 1.png](https://d3ar1piqh1oeli.cloudfront.net/d/d0/S3_EventViewer_1.png/500px-S3_EventViewer_1.png)](/File:S3_EventViewer_1.png)

  

### Step 4: Event Errors for Applications

In the Overview and Summary tab you will see the options for several drop-downs that can be expanded by clicking on the **plus sign \[+\]**. These drop downs will provide selections where we can grab the event logs we will need.

[![S4 ErrorExpand.png](https://d3ar1piqh1oeli.cloudfront.net/9/94/S4_ErrorExpand.png/500px-S4_ErrorExpand.png)](/File:S4_ErrorExpand.png)

Select the **plus sign \[+\]** next to **Error** then scroll down until you see the option for **Application Error**. Click on this to highlight it.

[![S4 ApplicationError.png](https://d3ar1piqh1oeli.cloudfront.net/2/28/S4_ApplicationError.png/500px-S4_ApplicationError.png)](/File:S4_ApplicationError.png)

  

### Step 5: Application Error Events

Now that we have Application Error highlighted there is a option now in the panel on the right.

Select **View All Instances of This Event**.

[![S5 AppErrorViewAllLogs.png](https://d3ar1piqh1oeli.cloudfront.net/3/31/S5_AppErrorViewAllLogs.png/500px-S5_AppErrorViewAllLogs.png)](/File:S5_AppErrorViewAllLogs.png)

This will now populate the center area with a **Summary page events** section.

[![S5 AppErrorLogsWindow.png](https://d3ar1piqh1oeli.cloudfront.net/6/60/S5_AppErrorLogsWindow.png/500px-S5_AppErrorLogsWindow.png)](/File:S5_AppErrorLogsWindow.png)

  

### Step 6: Selecting and Saving the Event Logs

Now that we have the Event Logs for any errors that may have occurred in Windows in front of us, you can select the application errors individually to see what application caused the error.

[![S6 AppErrorWindow.png](https://d3ar1piqh1oeli.cloudfront.net/e/ed/S6_AppErrorWindow.png/500px-S6_AppErrorWindow.png)](/File:S6_AppErrorWindow.png)

In the **General** tab you will see information about a specific **Exception Code** that can then be cross referenced with Windows errors to better help determine why the application closed without warning.

Next we will want to save the individual or multiple logs needed.

You can do this by selecting the Error(s), then in the right side **Actions** panel you can select **Save Selected Events...**.

[![S6 AppErrorSaveEvents.png](https://d3ar1piqh1oeli.cloudfront.net/5/57/S6_AppErrorSaveEvents.png/500px-S6_AppErrorSaveEvents.png)](/File:S6_AppErrorSaveEvents.png)

Now choose a location to save your Event Log files.

[![S6 AppErrorSaveFolder.png](https://d3ar1piqh1oeli.cloudfront.net/0/07/S6_AppErrorSaveFolder.png/500px-S6_AppErrorSaveFolder.png)](/File:S6_AppErrorSaveFolder.png)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Windows\_Event\_Viewer&oldid=15112](https://wiki.unrealengine.com/index.php?title=Windows_Event_Viewer&oldid=15112)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)