Bind keyboard and mouse input events dynamically - Epic Wiki                    

Bind keyboard and mouse input events dynamically
================================================

Hi ,

In this tutorial I am going to show you how to bind your input axis and action events in runtime, as in most of today's game , we have the option of customizing keyboard input. So , here I am assuming that you have one datatable imported which contains the following columns :

1>Action 2>DefaultInput 3>Input

Action is the column which contains the event name , DefaultInput contains the default value the event is bound to(this column is useful only when you hit the RESET button in your key customization menu) , and Input column contains the current input value , which is the value user has saved most recently. You can modify this Input column in your widget class on key pressed event , however , that is a story for another day.

Lets move on to our playercharacter class. Include these three namespaces.

1.  include "Runtime/Engine/Classes/GameFramework/PlayerInput.h"
2.  include "Runtime/Engine/Classes/GameFramework/InputSettings.h"
3.  include "Runtime/CoreUObject/Public/UObject/UObjectGlobals.h"

Now in your constructor , initialize your datatable , whcih you have to define in the header file

static ConstructorHelpers::FObjectFinder<UDataTable> KeyBoardBindingTable\_BP(TEXT("DataTable'/Game/DataTables/KeyboardConfig.KeyboardConfig'"));

KeyBoardBindingTable = KeyBoardBindingTable\_BP.Object;

Now , in your SetupPlayerInputComponent method inside your playercharacter, add the following lines

 
	check(InputComponent);
	const UInputSettings\* InputSettings = GetDefault<UInputSettings>();
	int rowindex = 1;
	while (true)
	{
		FKeyBoardBindingTable\* LookUpRow = KeyBoardBindingTable->FindRow<FKeyBoardBindingTable>(FName(\*FString::FromInt(rowindex)), TEXT("Look Up"));
		if (LookUpRow)
		{
			if (LookUpRow->Action == "Move Forward")
			{
				const FInputAxisKeyMapping axismapping(FName("Move Forward"), FKey(FName(\*LookUpRow->Input)), 1);
				((UInputSettings\*)InputSettings)->AddAxisMapping(axismapping);
			}
			else if (LookUpRow->Action == "Move Backward")
			{
				const FInputAxisKeyMapping axismapping(FName("Move Forward"), FKey(FName(\*LookUpRow->Input)), -1);
				((UInputSettings\*)InputSettings)->AddAxisMapping(axismapping);

			}
			else if (LookUpRow->Action == "Move Left")
			{
				const FInputAxisKeyMapping axismapping(FName("Move Right"), FKey(FName(\*LookUpRow->Input)), -1);
				((UInputSettings\*)InputSettings)->AddAxisMapping(axismapping);
			}
			else if (LookUpRow->Action == "Move Right")
			{
				const FInputAxisKeyMapping axismapping(FName("Move Right"), FKey(FName(\*LookUpRow->Input)), 1);
				((UInputSettings\*)InputSettings)->AddAxisMapping(axismapping);
			}

			else
			{
				const FInputActionKeyMapping actionmapping(FName(\*LookUpRow->Action), FKey(FName(\*LookUpRow->Input)), false, false, false, false);
				((UInputSettings\*)InputSettings)->AddActionMapping(actionmapping);
			}
			rowindex++;

		}
		else
		{
			break;
		}
	}

	const FInputAxisKeyMapping turnaxismapping(FName("Turn"), FKey(FName("MouseX")), 1);
	((UInputSettings\*)InputSettings)->AddAxisMapping(turnaxismapping);

	const FInputAxisKeyMapping lookupaxismapping(FName("LookUp"), FKey(FName("MouseY")), 1);
	((UInputSettings\*)InputSettings)->AddAxisMapping(lookupaxismapping);

	((UInputSettings\*)InputSettings)->SaveKeyMappings();

	InputComponent->BindAction("Jump", IE\_Pressed, this, &ACharacter::Jump);

	InputComponent->BindAxis("Move Forward", this, &AForgottenLegionCharacter::MoveForward);
	InputComponent->BindAxis("Move Right", this, &AForgottenLegionCharacter::MoveRight);
	InputComponent->BindAxis("Turn", this, &APawn::AddControllerYawInput);
	InputComponent->BindAxis("LookUp", this, &APawn::AddControllerPitchInput);

That's it. Now every time , you are going to hit "Play" in your editor , the input column will be read from your datatable and saved in your config file , which you can verify by going to Project Settings->Input section.

Enjoy.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Bind\_keyboard\_and\_mouse\_input\_events\_dynamically&oldid=14313](https://wiki.unrealengine.com/index.php?title=Bind_keyboard_and_mouse_input_events_dynamically&oldid=14313)"

[Categories](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)