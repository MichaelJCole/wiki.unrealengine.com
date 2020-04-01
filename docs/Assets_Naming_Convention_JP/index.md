 Assets Naming Convention JP - Epic Wiki             

 

Assets Naming Convention JP
===========================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

アセットの命名規則 [Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 概要](#.E6.A6.82.E8.A6.81)
*   [2 基本原則](#.E5.9F.BA.E6.9C.AC.E5.8E.9F.E5.89.87)
*   [3 アセット フォルダ](#.E3.82.A2.E3.82.BB.E3.83.83.E3.83.88_.E3.83.95.E3.82.A9.E3.83.AB.E3.83.80)
*   [4 カテゴリ別フォルダ](#.E3.82.AB.E3.83.86.E3.82.B4.E3.83.AA.E5.88.A5.E3.83.95.E3.82.A9.E3.83.AB.E3.83.80)
*   [5 アセット名](#.E3.82.A2.E3.82.BB.E3.83.83.E3.83.88.E5.90.8D)
*   [6 テクスチャ マスク](#.E3.83.86.E3.82.AF.E3.82.B9.E3.83.81.E3.83.A3_.E3.83.9E.E3.82.B9.E3.82.AF)

概要
--

このページではアセットの命名規則とコンテンツ フォルダの構造について説明します。

  

基本原則
----

1\. 名前はすべて英語で付けること。  
2\. すべてのアセット依存は、そのフォルダに属すること (共有アセットにせずに)。  

  

アセット フォルダ
---------

(マップ)

**Content\\Maps**

親マップのフォルダ

............ **Maps\\Episode(\_Number)**

ゲーム エピソードナンバー (\_Number) 例、01, 02, 03, 等

............ **Maps\\TestMaps**

テスト用マップ やプロトタイプのマップなどのプロダクションに含めないもの

(アセット)

**Content\\Base**

ベーシックマテリアルや、マテリアルファンクション その他にも “基礎となる” アセット

**Content\\Characters**

キャラクター用フォルダ

............ **Characters\\NPC**

NPC用フォルダ

............ **Characters\\Player**

プレイヤーキャラクター用フォルダ

**Content\\Dev**

開発アセット用フォルダ 例、アイコンや開発段階でのみ使うメッシュやテクスチャー等

**Content\\Effects**

共有するエフェクト用フォルダ

**Content\\Environment**

環境アセット用フォルダ

............ **Environment\\Background**

背景用フォルダ

............ **Environment\\Buildings**

建物用フォルダ (シンプルなものからプロシージャルのもの)

............ **Environment\\Foliage**

フォリッジ用フォルダ

............ **Environment\\Props**

プロップ用フォルダ

............ **Environment\\Sky**

空用フォルダ

............ **Environment\\Landscape**

テレインアセット用フォルダ

............ **Environment\\Water**

水のメッシュとマテリアル用フォルダ

**Content\\Gameplay**

ゲームプレイ用フォルダ

**Content\\PostProcess**

プストプロセス用フォルダ

**Content\\Sound**

サウンド関係用フォルダ

**Content\\UI**

UI アセット用フォルダ

**Content\\Vehicles**

エフェクト付き乗り物（ヴィークル）用フォルダ

**Content\\Weapons**

エフェクト付き武器（ウェポン）用フォルダ

カテゴリ別フォルダ
---------

**Blueprints**

ブループリント

**Meshes**

スタティック、スケルタル メッシュ、物理アセット

**Materials**

マテリアル、マテリアルインスタンス

**Textures**

テクスチャー

**Animations**

アニメーション

**Particles**

パーティクルシステム

**LensFlares**

フレア

**Sounds**

サウンド、サウンドキュー

**Morphs**

モーフ

**FaceFX**

FaceFX アセット

アセット名
-----

**形式：**  
(Prefix\_)AssetName(\_Number)(\_Suffix)  

例：  
T\_Rock\_01\_D  

  
**プレフィックス:** (コンテンツ ブラウザでのフィルタリングのためのオプション)

(使用対象別)

CH\_

キャラクター

UI\_

ユーザーインターフェイス

VH\_

乗り物（ヴィークル）

WP\_

武器（ウェポン）

(タイプ別)

BP\_

ブループリント

SK\_

スケルタルメッシュ

SM\_

スタティックメッシュ

AD\_

Apex ディストラクティブルアセット（破壊可能）

AC\_

Apex クロスアセット（布）

MT\_

モーフターゲット（変形先）

ST\_

スピードツリー

PS\_

パーティクルシステム

LF\_

レンズフレア

VF\_

ベクターフィールド

S\_

サウンド

SC\_

サウンドキュー

M\_

マテリアル

MI\_

マテリアルインスタンス

MITV\_

マテリアルインスタンス タイムバリング（時間変化）

MF\_

マテリアルファンクション

MPC\_

マテリアルパラメターコレクション

T\_

テクスチャー

TC\_

テクスチャーキューブ

RT\_

レンダーターゲット

PM\_

フィジカルマテリアル（物理マテリアル）

  
**サフィックス:**  

(テクスチャ)

\_BC

ベースカラー

\_MT

メタリック

\_S

スペキュラー

\_R

ラフネス

\_N

ノーマル

\_DP

ディスプレイスメント

\_AO

アンビエントオクルージョン

\_H

ハイトマップ

\_FM

フローマップ

\_L

ライトマップ (フェイク)

\_M

マスク

(メッシュ)

\_Physics

フィジックス (生成される名前)

\_FaceFX

FaceFx アセット

(アニメーション)

\_BlendSpace

ブレンドスペース (生成される名前)

\_AnimBlueprint

アニメーションブループリント (生成される名前)

テクスチャ マスク
---------

キャラクター用の RGB マスク:  

*   R = メタリック  
    
*   G = ラフネス  
    
*   B = サブサーフェス オパシティ  
    

  
キャラクタの髪の毛用の RGB:  

*   R = 髪の毛用のアルファ  
    
*   G = スペキュラ / ラフネス マップ  
    
*   B = 異方性マップ  
    

  
背景用の RGB マスク:  

*   R = メタリック  
    
*   G = ラフネス  
    
*   B = アンビエント オクルージョン  
    

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Assets\_Naming\_Convention\_JP&oldid=695](https://wiki.unrealengine.com/index.php?title=Assets_Naming_Convention_JP&oldid=695)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")