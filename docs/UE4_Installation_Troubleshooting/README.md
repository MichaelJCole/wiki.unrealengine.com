UE4 Installation Troubleshooting - Epic Wiki                    

UE4 Installation Troubleshooting
================================

This page provides solutions and troubleshooting steps for common issues experienced during the installation and first load of the UE4 Editor. If none of the below information is able to help you, then please submit your issue to the UE4 [Answerhub](https://answers.unrealengine.com/) under the 'Installation & Setup' section.

This page is a work-in-progress and will be added to over time.

If the Epic Games Launcher fails to install the Unreal Engine 4 and it provides the following error messages, please see the potential resolutions:

The necessary prerequisites have failed to install. Error Code 23.
------------------------------------------------------------------

*   For UE 4.10 and above, Visual Studio 2015 redistributable components are required for the editor to run. UE4 includes Microsoft's standalone installer which attempts to install these, but this can fail if your Windows Update is disabled or if your version of Windows is not updated to the latest patch. To resolve this issue, please run [Windows Update](http://windows.microsoft.com/en-us/windows/windows-update).

The necessary prerequisites have failed to install. Error Code E-1223
---------------------------------------------------------------------

*   Required Visual Studio 2015 redistributable pre-reqs are installed at the end of the download. The administrator access request popup window can time out if no action is taken. If you ignore/not see this in the task bar or possibly behind the launcher, the installation will fail.

*   Restart the installation process (which will be faster as it is a verify of what was already downloaded) and look for the admin prompt at the end of the process.

The necessary prerequisites have failed to install. Error Code E-1223 / R-1638 / R-5 / R-23 / R-1603
----------------------------------------------------------------------------------------------------

*   These errors are typically due to a conflict with the existing Visual Studio 2015 redistributable components on your system. To try to resolve this, navigate to the Windows Uninstall Program in the Control Panel and uninstall the Microsoft Visual C++ 2015 Redistributables. Afterwards, run the UE4 installer from the Epic Games Launcher to reinstall the redistributables.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UE4\_Installation\_Troubleshooting&oldid=22366](https://wiki.unrealengine.com/index.php?title=UE4_Installation_Troubleshooting&oldid=22366)"

[Category](/Special:Categories "Special:Categories"):

*   [Troubleshooting](/Category:Troubleshooting "Category:Troubleshooting")

  ![](https://tracking.unrealengine.com/track.png)