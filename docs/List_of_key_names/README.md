List of Key/Gamepad Input Names - Epic Wiki              

List of Key/Gamepad Input Names
===============================

From Epic Wiki

(Redirected from [List of key names](/index.php?title=List_of_key_names&redirect=no "List of key names"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Key Name List](#Key_Name_List)
    *   [2.1 Keyboard](#Keyboard)
    *   [2.2 Mouse](#Mouse)
    *   [2.3 Gamepads](#Gamepads)
    *   [2.4 Touch Devices](#Touch_Devices)

Overview
--------

This page will detail the internal names used for various keys and gamepad bindings. These are used primarily in the DefaultInput.ini file, as shown in the example below (Taken from the first person shooter template)

+ActionMappings=(ActionName="Jump", Key=SpaceBar)
+ActionMappings=(ActionName="Fire", Key=LeftMouseButton)

(Here, SpaceBar and LeftMouseButton are the internal names to bind to the spacebar and left mouse button respectively)

For the most part, these bindings will tend to be obvious (A-Z, F1-F12 etc) but some keys may have odd or different names, hence the purpose of this document. This list will also contain gamepad bindings and touch device bindings, which are internally interpreted as 'keys'.

This is a reference document and may not be fully up to date with the latest version of Unreal Engine 4. For your most up to date list of these key names, view the InputCoreTypes.h file in 'Engine\\Source\\Runtime\\InputCore\\Classes'.

Key Name List
-------------

### Keyboard

*   A
*   B
*   C
*   D
*   E
*   F
*   G
*   H
*   I
*   J
*   K
*   L
*   M
*   N
*   O
*   P
*   Q
*   R
*   S
*   T
*   U
*   V
*   W
*   X
*   Y
*   Z

  
_Arrow keys_

*   Left
*   Up
*   Right
*   Down

  
_Numbers above the alphabet characters, below the functions keys on a traditional QWERTY keyboard'_

*   Zero
*   One
*   Two
*   Three
*   Four
*   Five
*   Six
*   Seven
*   Eight
*   Nine

  

*   NumPadZero
*   NumPadOne
*   NumPadTwo
*   NumPadThree
*   NumPadFour
*   NumPadFive
*   NumPadSix
*   NumPadSeven
*   NumPadEight
*   NumPadNine

  
_These are on the numpad, not the characters near the main alphabet typing area_

*   Multiply
*   Add
*   Subtract
*   Decimal
*   Divide

  

*   BackSpace
*   Tab
*   Enter
*   Pause (The pause/break key on some keyboards)

  

*   NumLock
*   ScrollLock
*   CapsLock

  

*   Escape
*   SpaceBar
*   PageUp
*   PageDown
*   End
*   Home
*   Insert
*   Delete

  

*   F1
*   F2
*   F3
*   F4
*   F5
*   F6
*   F7
*   F8
*   F9
*   F10
*   F11
*   F12

  

*   LeftShift
*   RightShift
*   LeftControl
*   RightControl
*   LeftAlt
*   RightAlt
*   LeftCommand
*   RightCommand

  

*   Semicolon
*   Equals
*   Comma
*   Underscore
*   Period
*   Slash
*   Tilde
*   LeftBracket
*   Backslash
*   RightBracket
*   Quote

### Mouse

*   MouseX
*   MouseY

*   MouseScrollUp
*   MouseScrollDown
*   MouseWheelSpin

Note: There is a comment in InputCoreTypes stating that the viewport clients use MouseScrollUp and MouseScrollDown while Slate uses MouseWheelSpin. Epic plan to merge these in the future.

*   LeftMouseButton
*   RightMouseButton
*   MiddleMouseButton
*   ThumbMouseButton
*   ThumbMouseButton2

### Gamepads

*   Gamepad\_LeftX
*   Gamepad\_LeftY
*   Gamepad\_RightX
*   Gamepad\_RightY
*   Gamepad\_LeftTriggerAxis
*   Gamepad\_RightTriggerAxis

  

*   Gamepad\_LeftThumbstick
*   Gamepad\_RightThumbstick
*   Gamepad\_Special\_Left
*   Gamepad\_Special\_Right
*   Gamepad\_FaceButton\_Bottom
*   Gamepad\_FaceButton\_Right
*   Gamepad\_FaceButton\_Left
*   Gamepad\_FaceButton\_Top
*   Gamepad\_LeftShoulder
*   Gamepad\_RightShoulder
*   Gamepad\_LeftTrigger
*   Gamepad\_RightTrigger
*   Gamepad\_DPad\_Up
*   Gamepad\_DPad\_Down
*   Gamepad\_DPad\_Right
*   Gamepad\_DPad\_Left

  
_Virtual key codes used for input axis button press/release emulation_

*   Gamepad\_LeftStick\_Up
*   Gamepad\_LeftStick\_Down
*   Gamepad\_LeftStick\_Right
*   Gamepad\_LeftStick\_Left

  

*   Gamepad\_RightStick\_Up
*   Gamepad\_RightStick\_Down
*   Gamepad\_RightStick\_Right
*   Gamepad\_RightStick\_Left

### Touch Devices

*   Tilt
*   RotationRate
*   Gravity
*   Acceleration

  

*   Gesture\_SwipeLeftRight
*   Gesture\_SwipeUpDown
*   Gesture\_TwoFingerSwipeLeftRight
*   Gesture\_TwoFingerSwipeUpDown
*   Gesture\_Pinch
*   Gesture\_Flick

  

*   PS4\_Special

  

*   Invalid

  

*   TouchKeys (Array - defaults to a size of '10' through the constant 'NUM\_TOUCH\_KEYS')

Retrieved from "[https://wiki.unrealengine.com/index.php?title=List\_of\_Key/Gamepad\_Input\_Names&oldid=3319](https://wiki.unrealengine.com/index.php?title=List_of_Key/Gamepad_Input_Names&oldid=3319)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")