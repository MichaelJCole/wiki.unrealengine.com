UPARAM - Epic Wiki                    

UPARAM
======

Contents
--------

*   [1 Description](#Description)
*   [2 Valid Specifiers](#Valid_Specifiers)
    *   [2.1 ref](#ref)
    *   [2.2 DisplayName](#DisplayName)
*   [3 Related](#Related)

Description
===========

UPARAM is a macro used to alter the behavior of function parameters.

Valid Specifiers
================

ref
---

By default, a BlueprintCallable function that takes a parameter passed by reference, will expose that parameter as a \*\*output\*\* pin (return value) instead of an input pin. You can change this behavior using a UPARAM(ref) macro.

Example:

 UFUNCTION(BlueprintCallable)
 static void ModifySomeArray(TArray<bool> &BooleanArray);

The above function would have zero input pins and one output pin named BooleanArray. However, take this example:

 UFUNCTION(BlueprintCallable)
 static void ModifySomeArray(UPARAM(ref) TArray<bool> &BooleanArray);

In this case, the function would have zero output pins, and one input pin named BooleanArray, which would take an array of bool values.

DisplayName
-----------

Changes the pin label to one that you desire. Allows for use of reserved characters not normally allowed in variable names in C++.

![Example](https://d26ilriwvtzlb.cloudfront.net/1/16/Icon_template_example.png)

static FRotator MakeRotator(

UPARAM(**DisplayName**\="X (Roll)") float Roll,  

UPARAM(**DisplayName**\="Y (Pitch)") float Pitch,  

UPARAM(**DisplayName**\="Z (Yaw)") float Yaw

);

Related
=======

[UCLASS](/index.php?title=UCLASS&action=edit&redlink=1 "UCLASS (page does not exist)"), [UPROPERTY](/UPROPERTY "UPROPERTY"), [UFUNCTION](/UFUNCTION "UFUNCTION"), [USTRUCT](/USTRUCT "USTRUCT"), [UMETA](/index.php?title=UMETA&action=edit&redlink=1 "UMETA (page does not exist)"), **UPARAM**, [UENUM](/index.php?title=UENUM&action=edit&redlink=1 "UENUM (page does not exist)"), [UDELEGATE](/index.php?title=UDELEGATE&action=edit&redlink=1 "UDELEGATE (page does not exist)")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UPARAM&oldid=23135](https://wiki.unrealengine.com/index.php?title=UPARAM&oldid=23135)"

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)