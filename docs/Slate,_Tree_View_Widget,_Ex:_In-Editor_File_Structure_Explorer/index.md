Slate, Tree View Widget, Ex: In-Editor File Structure Explorer - Epic Wiki                    

Slate, Tree View Widget, Ex: In-Editor File Structure Explorer
==============================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Video](#Video)
*   [3 The Core Data](#The_Core_Data)
*   [4 Slate .h](#Slate_.h)
    *   [4.1 Constructor and DDEdEngine](#Constructor_and_DDEdEngine)
*   [5 Instancing the Slate Widget](#Instancing_the_Slate_Widget)
*   [6 Slate .cpp](#Slate_.cpp)
*   [7 Important Functions](#Important_Functions)
    *   [7.1 On Generate Row](#On_Generate_Row)
    *   [7.2 On Get Children](#On_Get_Children)
    *   [7.3 User Input](#User_Input)
*   [8 Core Function](#Core_Function)
*   [9 Core Data](#Core_Data)
*   [10 Summary](#Summary)

Overview
--------

_Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Here's a tutorial to help you get started with Slate tree views!

This is the widget that has those arrows you can click to expand/contract subcategories!

In this example, I was making a hard drive file structure viewer, and I saved off a version that would be a great starting point :)

Video
-----

This video shows the entire finished code that this code I am giving you here was the foundation for!

I wanted to keep this example simple, and also, not too implementation-specific.

You can use this coding as a starting point for your project-specific tree-view needs!

The Core Data
-------------

Trees are branching structures composed of a fundamental node data structure.

Here is that data structure for this example:

//Tree view data structure by Rama
 
#pragma once
 
 
typedef TSharedPtr< class FDDFileTreeItem \> FDDFileTreeItemPtr;
 
 
/\*\*
 \* The Data for a single node in the Directory Tree
 \*/
class FDDFileTreeItem
{
 
public:
 
	/\*\* @return Returns the parent or NULL if this is a root \*/
	const FDDFileTreeItemPtr GetParentCategory() const
	{
		return ParentDir.Pin();
	}
 
	/\*\* @return the path on hard disk, read-only \*/
	const FString& GetDirectoryPath() const
	{
		return DirectoryPath;
	}
 
	/\*\* @return name to display in file tree view! read-only \*/
	const FString& GetDisplayName() const
	{
		return DisplayName;
	}
 
	/\*\* @return Returns all subdirectories, read-only \*/
	const TArray< FDDFileTreeItemPtr \>& GetSubDirectories() const
	{
		return SubDirectories;
	}
 
        /\*\* @return Returns all subdirectories, read or write \*/
	TArray< FDDFileTreeItemPtr \>& AccessSubDirectories()
	{
		return SubDirectories;
	}
 
	/\*\* Add a subdirectory to this node in the tree! \*/
	void AddSubDirectory(const FDDFileTreeItemPtr NewSubDir)
	{
		SubDirectories.Add(NewSubDir);
	}
 
public:
 
	/\*\* Constructor for FDDFileTreeItem \*/
	FDDFileTreeItem(const FDDFileTreeItemPtr IN\_ParentDir, const FString& IN\_DirectoryPath, const FString& IN\_DisplayName)
		: ParentDir( 	 IN\_ParentDir)
		, DirectoryPath( IN\_DirectoryPath)
		, DisplayName(	 IN\_DisplayName)
	{
	}
 
 
private:
 
	/\*\* Parent item or NULL if this is a root  \*/
	TWeakPtr< FDDFileTreeItem \> ParentDir;
 
	/\*\* Full path of this directory in the tree \*/
	FString DirectoryPath;
 
	/\*\* Display name of the category \*/
	FString DisplayName;
 
	/\*\* Child categories \*/
	TArray< FDDFileTreeItemPtr \> SubDirectories;
};

Slate .h
--------

// File Tree Viewer by Rama
 
#pragma once
 
//DD File Tree Item
#include "DDFileTreeItem.h"
 
//~~~ Forward Declarations ~~~
class UDDEdEngine;
 
 
typedef STreeView< FDDFileTreeItemPtr \> SDDFileTreeView;
 
/\*\*
 \* File Tree View
 \*/
class SDDFileTree : public SCompoundWidget
{
 
public:
 
	SLATE\_BEGIN\_ARGS( SDDFileTree )
	{}
 
	SLATE\_END\_ARGS()
 
 
//~~~~~~~~
//		DDEdEngine
//~~~~~~~~
public:
	//owns this
	TWeakObjectPtr<class UDDEdEngine\> DDEdEngine;
 
 
	/\*\* Refresh the Tree \*/
	//bool DoRefresh;
 
 
//~~~
public:
	/\*\* Widget constructor \*/
	void Construct( const FArguments& Args, TWeakObjectPtr<class UDDEdEngine\> IN\_DDEdEngine );
 
	/\*\* Destructor \*/
	~SDDFileTree();
 
	/\*\* @return Returns the currently selected category item \*/
	FDDFileTreeItemPtr GetSelectedDirectory() const;
 
	/\*\* Selects the specified category \*/
	void SelectDirectory( const FDDFileTreeItemPtr& CategoryToSelect );
 
	/\*\* @return Returns true if the specified item is currently expanded in the tree \*/
	bool IsItemExpanded( const FDDFileTreeItemPtr Item ) const;
 
private:
 
	/\*\* Called to generate a widget for the specified tree item \*/
	TSharedRef<ITableRow\> DDFileTree\_OnGenerateRow( FDDFileTreeItemPtr Item, const TSharedRef<STableViewBase\>& OwnerTable );
 
	/\*\* Given a tree item, fills an array of child items \*/
	void DDFileTree\_OnGetChildren( FDDFileTreeItemPtr Item, TArray< FDDFileTreeItemPtr \>& OutChildren );
 
	/\*\* Called when the user clicks on an  item, or when selection changes by some other means \*/
	void DDFileTree\_OnSelectionChanged( FDDFileTreeItemPtr Item, ESelectInfo::Type SelectInfo );
 
	/\*\* Rebuilds the category tree from scratch \*/
	void RebuildFileTree();
 
	/\*\* SWidget overrides \*/
	virtual void Tick( const FGeometry& AllottedGeometry, const double InCurrentTime, const float InDeltaTime ) OVERRIDE;
 
 
private:
 
 
	/\*\* The tree view widget\*/
	TSharedPtr< SDDFileTreeView \> DDFileTreeView;
 
	/\*\* The Core Data for the Tree Viewer! \*/
	TArray< FDDFileTreeItemPtr \> Directories;
};

### Constructor and DDEdEngine

In my case I am calling this widget from within a custom version of the engine via a custom class that extends UnrealEdEngine.

I am passing in pointer to the UnrealEdEngine when the widget is first constructed.

You could use your HUD class instead!

I dont rely on any EdEngine functionality for this code sample, replace EdEngine with your own chosen parenting class.

/\*\* Widget constructor \*/
void Construct( const FArguments& Args, TWeakObjectPtr<class UDDEdEngine\> IN\_DDEdEngine );

Instancing the Slate Widget
---------------------------

Here's an example of creating the widget:

//in the .h of parent class: 
 
//TSharedPtr<class SDDFileTree> DDFileTree;
 
//in your parent class in which you want to create the widget
if( !DDFileTree.IsValid() )
{	
	SAssignNew(	DDFileTree,	SDDFileTree,	Cast<UDDEdEngine\>(this)	);
}

Slate .cpp
----------

// File Tree Viewer by Rama
 
#include "VictoryGame.h"
 
//This header
#include "SDDFileTree.h"
 
//The Data
#include "DDFileTreeItem.h"
 
void SDDFileTree::Construct(const FArguments& Args,TWeakObjectPtr<class UDDEdEngine\> IN\_DDEdEngine)
{
	//Set DDEdEngine
	DDEdEngine \= IN\_DDEdEngine;
	//~~~~~~~~~~~~~~~~~~~
 
	//Build Core Data
	RebuildFileTree();
 
	//Build the tree view of the above core data
	DDFileTreeView \=
		SNew( SDDFileTreeView )
 
		// For now we only support selecting a single folder in the tree
		.SelectionMode( ESelectionMode::Single )
		.ClearSelectionOnClick( false )		// Don't allow user to select nothing.
 
		.TreeItemsSource( &Directories )
		.OnGenerateRow( this, &SDDFileTree::DDFileTree\_OnGenerateRow ) 
		.OnGetChildren( this, &SDDFileTree::DDFileTree\_OnGetChildren )
 
		.OnSelectionChanged( this, &SDDFileTree::DDFileTree\_OnSelectionChanged )
		;
 
	/\*
	// Expand the root  by default
	for( auto RootDirIt( Directories.CreateConstIterator() ); RootDirIt; ++RootDirIt )
	{
		const auto& Dir = \*RootDirIt;
		DDFileTreeView->SetItemExpansion( Dir, true );
	}
 
	// Select the first item by default
	if( Directories.Num() > 0 )
	{
		DDFileTreeView->SetSelection( Directories\[ 0 \] );
	}
	\*/
 
	ChildSlot.Widget \= DDFileTreeView.ToSharedRef();
}
 
 
SDDFileTree::~SDDFileTree()
{
}
 
 
 
void SDDFileTree::RebuildFileTree()
{
 
	Directories.Empty();
 
	//~~~~~~~~~~~~~~~~~~~
	//Root Level
	TSharedRef<FDDFileTreeItem\> RootDir \= MakeShareable(new FDDFileTreeItem(NULL, TEXT("RootDir"), FString("RootDir")));
	Directories.Add( RootDir );
 
	TSharedRef<FDDFileTreeItem\> RootDir2 \= MakeShareable(new FDDFileTreeItem(NULL, TEXT("RootDir2"), FString("RootDir2")));
	Directories.Add( RootDir2 );
	//~~~~~~~~~~~~~~~~~~~
 
	//Root Category
	FDDFileTreeItemPtr ParentCategory \= RootDir;
 
 
	//Add
	FDDFileTreeItemPtr EachSubDir \= MakeShareable(new FDDFileTreeItem(ParentCategory,  "Joy", "Joy"));
	RootDir\-\>AddSubDirectory(EachSubDir);
 
	//Add
	EachSubDir \= MakeShareable(new FDDFileTreeItem(ParentCategory, "Song", "Song"));
	RootDir\-\>AddSubDirectory(EachSubDir);
 
		//Add
		FDDFileTreeItemPtr SongDir \= MakeShareable(new FDDFileTreeItem(ParentCategory,  "Dance", "Dance"));
		EachSubDir\-\>AddSubDirectory(SongDir);
 
		//Add
		SongDir \= MakeShareable(new FDDFileTreeItem(ParentCategory, "Rainbows", "Rainbows"));
		EachSubDir\-\>AddSubDirectory(SongDir);
 
	//Add
	EachSubDir \= MakeShareable(new FDDFileTreeItem(ParentCategory, "Butterflies", "Butterflies"));
	RootDir\-\>AddSubDirectory(EachSubDir);
 
 
	//Refresh
	if( DDFileTreeView.IsValid() )
	{
		DDFileTreeView\-\>RequestTreeRefresh();
	}
}
 
TSharedRef<ITableRow\> SDDFileTree::DDFileTree\_OnGenerateRow( FDDFileTreeItemPtr Item, const TSharedRef<STableViewBase\>& OwnerTable )
{
	if(!Item.IsValid())
	{
		return SNew( STableRow< FDDFileTreeItemPtr \>, OwnerTable )
		\[
			SNew(STextBlock)
			.Text( FString("THIS WAS NULL SOMEHOW") )
		\];
	}
	return SNew( STableRow< FDDFileTreeItemPtr \>, OwnerTable )
	\[
		SNew(STextBlock)
		.Text( Item\-\>GetDisplayName() )
		.Font(FSlateFontInfo(FPaths::EngineContentDir() / TEXT("Slate/Fonts/Roboto-Bold.ttf"), 12))
		.ColorAndOpacity(FLinearColor(1,0,1,1))
		.ShadowColorAndOpacity(FLinearColor::Black)
		.ShadowOffset(FIntPoint(\-2, 2))
	\];
}
 
 
void SDDFileTree::DDFileTree\_OnGetChildren( FDDFileTreeItemPtr Item, TArray< FDDFileTreeItemPtr \>& OutChildren )
{
	const auto& SubCategories \= Item\-\>GetSubDirectories();
	OutChildren.Append( SubCategories );
}
 
 
//Key function for interaction with user!
void SDDFileTree::DDFileTree\_OnSelectionChanged( FDDFileTreeItemPtr Item, ESelectInfo::Type SelectInfo )
{
	//Selection Changed! Tell DDEdEngine!
        UE\_LOG(YourLog,Warning,TEXT("Item Selected: %s"), \*Item\-\>GetDisplayName());
}
 
 
FDDFileTreeItemPtr SDDFileTree::GetSelectedDirectory() const
{
	if( DDFileTreeView.IsValid() )
	{
		auto SelectedItems \= DDFileTreeView\-\>GetSelectedItems();
		if( SelectedItems.Num() \> 0 )
		{
			const auto& SelectedCategoryItem \= SelectedItems\[ 0 \];
			return SelectedCategoryItem;
		}
	}
 
	return NULL;
}
 
 
void SDDFileTree::SelectDirectory( const FDDFileTreeItemPtr& CategoryToSelect )
{
	if( ensure( DDFileTreeView.IsValid() ) )
	{
		DDFileTreeView\-\>SetSelection( CategoryToSelect );
	}
}
 
//is the tree item expanded to show children?
bool SDDFileTree::IsItemExpanded( const FDDFileTreeItemPtr Item ) const
{
	return DDFileTreeView\-\>IsItemExpanded( Item );
}
 
 
 
void SDDFileTree::Tick( const FGeometry& AllottedGeometry, const double InCurrentTime, const float InDeltaTime )
{
	// Call parent implementation
	SCompoundWidget::Tick( AllottedGeometry, InCurrentTime, InDeltaTime );
 
	//can do things here every tick
}

Important Functions
-------------------

### On Generate Row

This is the function that decides how each item in the tree gets displayed visually!

You could make it so each item in the tree is its own very fancy Slate widget, I just used TextBlock.

TSharedRef<ITableRow\> SDDFileTree::DDFileTree\_OnGenerateRow( FDDFileTreeItemPtr Item, const TSharedRef<STableViewBase\>& OwnerTable )
{
	if(!Item.IsValid())
	{
		return SNew( STableRow< FDDFileTreeItemPtr \>, OwnerTable )
		\[
			SNew(STextBlock)
			.Text( FString("THIS WAS NULL SOMEHOW") )
		\];
	}
	return SNew( STableRow< FDDFileTreeItemPtr \>, OwnerTable )
	\[
		SNew(STextBlock)
		.Text( Item\-\>GetDisplayName() )
		.Font(FSlateFontInfo(FPaths::EngineContentDir() / TEXT("Slate/Fonts/Roboto-Bold.ttf"), 12))
		.ColorAndOpacity(FLinearColor(1,0,1,1))
		.ShadowColorAndOpacity(FLinearColor::Black)
		.ShadowOffset(FIntPoint(\-2, 2))
	\];
}

### On Get Children

Get children is specific to the Tree View Slate widget, and determines what appears when a tree view item is expanded using the arrow, assuming it has any children.

This function tells Tree view whether the node has any children!

Note that GetSubDirectories() is my own custom function for my data type, but because OnGetChildren uses it, the Tree View knows when one of my custom data structure nodes has any children, and so the arrow should appear and the children should appear when the arrow is expanded.

void SDDFileTree::DDFileTree\_OnGetChildren( FDDFileTreeItemPtr Item, TArray< FDDFileTreeItemPtr \>& OutChildren )
{
	const auto& SubCategories \= Item\-\>GetSubDirectories();
	OutChildren.Append( SubCategories );
}

### User Input

When the user clicks on an item in the tree view, this function below is run!

void SDDFileTree::DDFileTree\_OnSelectionChanged( FDDFileTreeItemPtr Item, ESelectInfo::Type SelectInfo )
{
	//Selection Changed! Tell DDEdEngine!
	UE\_LOG(YourLog,Warning,TEXT("Item clicked! %s"), \*Item\-\>GetDisplayName());
}

Core Function
-------------

The core function where the tree is made is below!

void SDDFileTree::RebuildFileTree()
{
 
	Directories.Empty();
 
	//~~~~~~~~~~~~~~~~~~~
	//Root Level
	TSharedRef<FDDFileTreeItem\> RootDir \= MakeShareable(new FDDFileTreeItem(NULL, TEXT("RootDir"), FString("RootDir")));
	Directories.Add( RootDir );
 
	TSharedRef<FDDFileTreeItem\> RootDir2 \= MakeShareable(new FDDFileTreeItem(NULL, TEXT("RootDir2"), FString("RootDir2")));
	Directories.Add( RootDir2 );
	//~~~~~~~~~~~~~~~~~~~
 
	//Root Category
	FDDFileTreeItemPtr ParentCategory \= RootDir;
 
 
	//Add
	FDDFileTreeItemPtr EachSubDir \= MakeShareable(new FDDFileTreeItem(ParentCategory,  "Joy", "Joy"));
	RootDir\-\>AddSubDirectory(EachSubDir);
 
	//Add
	EachSubDir \= MakeShareable(new FDDFileTreeItem(ParentCategory, "Song", "Song"));
	RootDir\-\>AddSubDirectory(EachSubDir);
 
		//Add
		FDDFileTreeItemPtr SongDir \= MakeShareable(new FDDFileTreeItem(ParentCategory,  "Dance", "Dance"));
		EachSubDir\-\>AddSubDirectory(SongDir);
 
		//Add
		SongDir \= MakeShareable(new FDDFileTreeItem(ParentCategory, "Rainbows", "Rainbows"));
		EachSubDir\-\>AddSubDirectory(SongDir);
 
	//Add
	EachSubDir \= MakeShareable(new FDDFileTreeItem(ParentCategory, "Butterflies", "Butterflies"));
	RootDir\-\>AddSubDirectory(EachSubDir);
 
 
	//Refresh
	if( DDFileTreeView.IsValid() )
	{
		DDFileTreeView\-\>RequestTreeRefresh();
	}
}

Core Data
---------

The core data is set to be used in the constructor, here:

.TreeItemsSource( &Directories )

Summary
-------

Now you know the basics of using a tree view!

You need

1\. your own custom data structure that is a node in the tree

2\. tree view .h

3\. tree view .cpp

and that's all!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Slate,\_Tree\_View\_Widget,\_Ex:\_In-Editor\_File\_Structure\_Explorer&oldid=10406](https://wiki.unrealengine.com/index.php?title=Slate,_Tree_View_Widget,_Ex:_In-Editor_File_Structure_Explorer&oldid=10406)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)