<!DOCTYPE html>
<html class="client-nojs" lang="en" dir="ltr">
<head>
<meta charset="UTF-8"/><script type="text/javascript">window.NREUM||(NREUM={}),__nr_require=function(e,t,n){function r(n){if(!t[n]){var o=t[n]={exports:{}};e[n][0].call(o.exports,function(t){var o=e[n][1][t];return r(o||t)},o,o.exports)}return t[n].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<n.length;o++)r(n[o]);return r}({1:[function(e,t,n){function r(){}function o(e,t,n){return function(){return i(e,[f.now()].concat(u(arguments)),t?null:this,n),t?void 0:this}}var i=e("handle"),a=e(2),u=e(3),c=e("ee").get("tracer"),f=e("loader"),s=NREUM;"undefined"==typeof window.newrelic&&(newrelic=s);var p=["setPageViewName","setCustomAttribute","setErrorHandler","finished","addToTrace","inlineHit","addRelease"],d="api-",l=d+"ixn-";a(p,function(e,t){s[t]=o(d+t,!0,"api")}),s.addPageAction=o(d+"addPageAction",!0),s.setCurrentRouteName=o(d+"routeName",!0),t.exports=newrelic,s.interaction=function(){return(new r).get()};var m=r.prototype={createTracer:function(e,t){var n={},r=this,o="function"==typeof t;return i(l+"tracer",[f.now(),e,n],r),function(){if(c.emit((o?"":"no-")+"fn-start",[f.now(),r,o],n),o)try{return t.apply(this,arguments)}catch(e){throw c.emit("fn-err",[arguments,this,e],n),e}finally{c.emit("fn-end",[f.now()],n)}}}};a("setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","),function(e,t){m[t]=o(l+t)}),newrelic.noticeError=function(e){"string"==typeof e&&(e=new Error(e)),i("err",[e,f.now()])}},{}],2:[function(e,t,n){function r(e,t){var n=[],r="",i=0;for(r in e)o.call(e,r)&&(n[i]=t(r,e[r]),i+=1);return n}var o=Object.prototype.hasOwnProperty;t.exports=r},{}],3:[function(e,t,n){function r(e,t,n){t||(t=0),"undefined"==typeof n&&(n=e?e.length:0);for(var r=-1,o=n-t||0,i=Array(o<0?0:o);++r<o;)i[r]=e[t+r];return i}t.exports=r},{}],4:[function(e,t,n){t.exports={exists:"undefined"!=typeof window.performance&&window.performance.timing&&"undefined"!=typeof window.performance.timing.navigationStart}},{}],ee:[function(e,t,n){function r(){}function o(e){function t(e){return e&&e instanceof r?e:e?c(e,u,i):i()}function n(n,r,o,i){if(!d.aborted||i){e&&e(n,r,o);for(var a=t(o),u=m(n),c=u.length,f=0;f<c;f++)u[f].apply(a,r);var p=s[y[n]];return p&&p.push([b,n,r,a]),a}}function l(e,t){v[e]=m(e).concat(t)}function m(e){return v[e]||[]}function w(e){return p[e]=p[e]||o(n)}function g(e,t){f(e,function(e,n){t=t||"feature",y[n]=t,t in s||(s[t]=[])})}var v={},y={},b={on:l,emit:n,get:w,listeners:m,context:t,buffer:g,abort:a,aborted:!1};return b}function i(){return new r}function a(){(s.api||s.feature)&&(d.aborted=!0,s=d.backlog={})}var u="nr@context",c=e("gos"),f=e(2),s={},p={},d=t.exports=o();d.backlog=s},{}],gos:[function(e,t,n){function r(e,t,n){if(o.call(e,t))return e[t];var r=n();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(e,t,{value:r,writable:!0,enumerable:!1}),r}catch(i){}return e[t]=r,r}var o=Object.prototype.hasOwnProperty;t.exports=r},{}],handle:[function(e,t,n){function r(e,t,n,r){o.buffer([e],r),o.emit(e,t,n)}var o=e("ee").get("handle");t.exports=r,r.ee=o},{}],id:[function(e,t,n){function r(e){var t=typeof e;return!e||"object"!==t&&"function"!==t?-1:e===window?0:a(e,i,function(){return o++})}var o=1,i="nr@id",a=e("gos");t.exports=r},{}],loader:[function(e,t,n){function r(){if(!x++){var e=h.info=NREUM.info,t=d.getElementsByTagName("script")[0];if(setTimeout(s.abort,3e4),!(e&&e.licenseKey&&e.applicationID&&t))return s.abort();f(y,function(t,n){e[t]||(e[t]=n)}),c("mark",["onload",a()+h.offset],null,"api");var n=d.createElement("script");n.src="https://"+e.agent,t.parentNode.insertBefore(n,t)}}function o(){"complete"===d.readyState&&i()}function i(){c("mark",["domContent",a()+h.offset],null,"api")}function a(){return E.exists&&performance.now?Math.round(performance.now()):(u=Math.max((new Date).getTime(),u))-h.offset}var u=(new Date).getTime(),c=e("handle"),f=e(2),s=e("ee"),p=window,d=p.document,l="addEventListener",m="attachEvent",w=p.XMLHttpRequest,g=w&&w.prototype;NREUM.o={ST:setTimeout,SI:p.setImmediate,CT:clearTimeout,XHR:w,REQ:p.Request,EV:p.Event,PR:p.Promise,MO:p.MutationObserver};var v=""+location,y={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-1071.min.js"},b=w&&g&&g[l]&&!/CriOS/.test(navigator.userAgent),h=t.exports={offset:u,now:a,origin:v,features:{},xhrWrappable:b};e(1),d[l]?(d[l]("DOMContentLoaded",i,!1),p[l]("load",r,!1)):(d[m]("onreadystatechange",o),p[m]("onload",r)),c("mark",["firstbyte",u],null,"api");var x=0,E=e(4)},{}]},{},["loader"]);</script>
<title>MediaWiki API help - Epic Wiki</title>
<script>document.documentElement.className = document.documentElement.className.replace( /(^|\s)client-nojs(\s|$)/, "$1client-js$2" );</script>
<script>(window.RLQ=window.RLQ||[]).push(function(){mw.config.set({"wgCanonicalNamespace":"Special","wgCanonicalSpecialPageName":"ApiHelp","wgNamespaceNumber":-1,"wgPageName":"Special:ApiHelp","wgTitle":"ApiHelp","wgCurRevisionId":0,"wgRevisionId":0,"wgArticleId":0,"wgIsArticle":false,"wgIsRedirect":false,"wgAction":"view","wgUserName":null,"wgUserGroups":["*"],"wgCategories":[],"wgBreakFrames":true,"wgPageContentLanguage":"en","wgPageContentModel":"wikitext","wgSeparatorTransformTable":["",""],"wgDigitTransformTable":["",""],"wgDefaultDateFormat":"dmy","wgMonthNames":["","January","February","March","April","May","June","July","August","September","October","November","December"],"wgMonthNamesShort":["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"wgRelevantPageName":"Special:ApiHelp","wgRelevantArticleId":0,"wgRequestId":"b7acbb07ad5310449a5de9d0","wgIsProbablyEditable":false,"wgRelevantPageIsProbablyEditable":false});mw.loader.state({"site.styles":"ready","noscript":"ready","user.styles":"ready","user":"ready","user.options":"loading","user.tokens":"loading","mediawiki.hlist":"ready","mediawiki.apihelp":"ready","mediawiki.legacy.shared":"ready","mediawiki.legacy.commonPrint":"ready","mediawiki.sectionAnchor":"ready","mediawiki.skinning.interface":"ready"});mw.loader.implement("user.options@0bhc5ha",function($,jQuery,require,module){mw.user.options.set([]);});mw.loader.implement("user.tokens@1xxwts3",function ( $, jQuery, require, module ) {
mw.user.tokens.set({"editToken":"+\\","patrolToken":"+\\","watchToken":"+\\","csrfToken":"+\\"});/*@nomin*/

});mw.loader.load(["site","mediawiki.page.startup","mediawiki.user","mediawiki.hidpi","mediawiki.page.ready","mediawiki.searchSuggest"]);});</script>
<link rel="stylesheet" href="/load.php?debug=false&amp;lang=en&amp;modules=mediawiki.apihelp%2Chlist%2CsectionAnchor%7Cmediawiki.legacy.commonPrint%2Cshared%7Cmediawiki.skinning.interface&amp;only=styles&amp;skin=apioutput"/>
<script async="" src="/load.php?debug=false&amp;lang=en&amp;modules=startup&amp;only=scripts&amp;skin=apioutput"></script>
<meta name="ResourceLoaderDynamicStyles" content=""/>
<meta name="generator" content="MediaWiki 1.30.0"/>
<link rel="shortcut icon" href="/favicon.ico"/>
<link rel="search" type="application/opensearchdescription+xml" href="/opensearch_desc.php" title="Epic Wiki (en)"/>
<link rel="EditURI" type="application/rsd+xml" href="https://wiki.unrealengine.com/api.php?action=rsd"/>
<link rel="license" href="https://www.mediawiki.org/wiki/Special:MyLanguage/Copyright"/>
<link rel="alternate" type="application/atom+xml" title="Epic Wiki Atom feed" href="/index.php?title=Special:RecentChanges&amp;feed=atom"/>
<!--[if lt IE 9]><script src="/resources/lib/html5shiv/html5shiv.min.js?40bd4"></script><![endif]-->
</head>
<body class="mediawiki ltr sitedir-ltr mw-hide-empty-elt ns--1 ns-special mw-special-ApiHelp page-Special_ApiHelp rootpage-Special_ApiHelp skin-apioutput action-view">
		<div class="mw-body" role="main">
			<h1 class="firstHeading">MediaWiki API help</h1>
			<div class="mw-body-content">
				<div id="mw-content-text"><p>This is an auto-generated MediaWiki API documentation page.
</p><p>Documentation and examples: <a class="external free" href="https://www.mediawiki.org/wiki/API">https://www.mediawiki.org/wiki/API</a>
</p><h2 class="apihelp-header" id="main">Main module</h2>
<div class="apihelp-block apihelp-flags"><ul><li><span class="apihelp-source">Source: <span dir="ltr" lang="en">MediaWiki</span></span></li><li><span class="apihelp-license">License: <a href="/index.php?title=Special:Version/License/MediaWiki" title="Special:Version/License/MediaWiki"><span dir="ltr" lang="en">GPL-2.0+</span></a></span></li></ul></div>
<div class="hlist plainlinks api-main-links">
<ul><li> <a href="https://www.mediawiki.org/wiki/Special:MyLanguage/API:Main_page" class="extiw" title="mw:Special:MyLanguage/API:Main page">Documentation</a></li>
<li> <a href="https://www.mediawiki.org/wiki/Special:MyLanguage/API:FAQ" class="extiw" title="mw:Special:MyLanguage/API:FAQ">FAQ</a></li>
<li> <a rel="nofollow" class="external text" href="https://lists.wikimedia.org/mailman/listinfo/mediawiki-api">Mailing list</a></li>
<li> <a rel="nofollow" class="external text" href="https://lists.wikimedia.org/mailman/listinfo/mediawiki-api-announce">API Announcements</a></li>
<li> <a rel="nofollow" class="external text" href="https://phabricator.wikimedia.org/maniphest/query/GebfyV4uCaLd/#R">Bugs &amp; requests</a></li></ul></div>
<p><strong>Status:</strong> All features shown on this page should be working, but the API is still in active development, and may change at any time. Subscribe to <a rel="nofollow" class="external text" href="https://lists.wikimedia.org/pipermail/mediawiki-api-announce/">the mediawiki-api-announce mailing list</a> for notice of updates.
</p><p><strong>Erroneous requests:</strong> When erroneous requests are sent to the API, an HTTP header will be sent with the key "MediaWiki-API-Error" and then both the value of the header and the error code sent back will be set to the same value. For more information see <a href="https://www.mediawiki.org/wiki/Special:MyLanguage/API:Errors_and_warnings" class="extiw" title="mw:Special:MyLanguage/API:Errors and warnings">API: Errors and warnings</a>.
</p><p><strong>Testing:</strong> For ease of testing API requests, see <a href="/index.php?title=Special:ApiSandbox" title="Special:ApiSandbox">Special:ApiSandbox</a>.
</p>

<div class="apihelp-block apihelp-parameters"><div class="apihelp-block-head">Parameters:</div><dl><dt><span dir="ltr" lang="en">action</span></dt><dd class="description"><p>Which action to perform.
</p><dl><dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=block">block</a></span></dt>
<dd>Block a user.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=changeauthenticationdata">changeauthenticationdata</a></span></dt>
<dd>Change authentication data for the current user.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=checktoken">checktoken</a></span></dt>
<dd>Check the validity of a token from <kbd><a href="/api.php?action=help&amp;modules=query%2Btokens">action=query&amp;meta=tokens</a></kbd>.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=clearhasmsg">clearhasmsg</a></span></dt>
<dd>Clears the <code>hasmsg</code> flag for the current user.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=clientlogin">clientlogin</a></span></dt>
<dd>Log in to the wiki using the interactive flow.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=compare">compare</a></span></dt>
<dd>Get the difference between two pages.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=createaccount">createaccount</a></span></dt>
<dd>Create a new user account.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=cspreport">cspreport</a></span></dt>
<dd>Used by browsers to report violations of the Content Security Policy. This module should never be used, except when used automatically by a CSP compliant web browser.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=delete">delete</a></span></dt>
<dd>Delete a page.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=edit">edit</a></span></dt>
<dd>Create and edit pages.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=emailuser">emailuser</a></span></dt>
<dd>Email a user.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=expandtemplates">expandtemplates</a></span></dt>
<dd>Expands all templates within wikitext.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=feedcontributions">feedcontributions</a></span></dt>
<dd>Returns a user contributions feed.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=feedrecentchanges">feedrecentchanges</a></span></dt>
<dd>Returns a recent changes feed.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=feedwatchlist">feedwatchlist</a></span></dt>
<dd>Returns a watchlist feed.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=filerevert">filerevert</a></span></dt>
<dd>Revert a file to an old version.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=help">help</a></span></dt>
<dd>Display help for the specified modules.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=imagerotate">imagerotate</a></span></dt>
<dd>Rotate one or more images.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=import">import</a></span></dt>
<dd>Import a page from another wiki, or from an XML file.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=linkaccount">linkaccount</a></span></dt>
<dd>Link an account from a third-party provider to the current user.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=login">login</a></span></dt>
<dd>Log in and get authentication cookies.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=logout">logout</a></span></dt>
<dd>Log out and clear session data.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=managetags">managetags</a></span></dt>
<dd>Perform management tasks relating to change tags.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=mergehistory">mergehistory</a></span></dt>
<dd>Merge page histories.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=move">move</a></span></dt>
<dd>Move a page.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=opensearch">opensearch</a></span></dt>
<dd>Search the wiki using the OpenSearch protocol.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=options">options</a></span></dt>
<dd>Change preferences of the current user.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=paraminfo">paraminfo</a></span></dt>
<dd>Obtain information about API modules.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=parse">parse</a></span></dt>
<dd>Parses content and returns parser output.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=patrol">patrol</a></span></dt>
<dd>Patrol a page or revision.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=protect">protect</a></span></dt>
<dd>Change the protection level of a page.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=purge">purge</a></span></dt>
<dd>Purge the cache for the given titles.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=query">query</a></span></dt>
<dd>Fetch data from and about MediaWiki.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=removeauthenticationdata">removeauthenticationdata</a></span></dt>
<dd>Remove authentication data for the current user.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=resetpassword">resetpassword</a></span></dt>
<dd>Send a password reset email to a user.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=revisiondelete">revisiondelete</a></span></dt>
<dd>Delete and undelete revisions.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=rollback">rollback</a></span></dt>
<dd>Undo the last edit to the page.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=rsd">rsd</a></span></dt>
<dd>Export an RSD (Really Simple Discovery) schema.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=setnotificationtimestamp">setnotificationtimestamp</a></span></dt>
<dd>Update the notification timestamp for watched pages.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=setpagelanguage">setpagelanguage</a></span></dt>
<dd>Change the language of a page.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=stashedit">stashedit</a></span></dt>
<dd>Prepare an edit in shared cache.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=tag">tag</a></span></dt>
<dd>Add or remove change tags from individual revisions or log entries.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=unblock">unblock</a></span></dt>
<dd>Unblock a user.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=undelete">undelete</a></span></dt>
<dd>Restore revisions of a deleted page.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=unlinkaccount">unlinkaccount</a></span></dt>
<dd>Remove a linked third-party account from the current user.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=upload">upload</a></span></dt>
<dd>Upload a file, or get the status of pending uploads.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=userrights">userrights</a></span></dt>
<dd>Change a user's group membership.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=validatepassword">validatepassword</a></span></dt>
<dd>Validate a password against the wiki's password policies.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=watch">watch</a></span></dt>
<dd>Add or remove pages from the current user's watchlist.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=tokens">tokens</a></span></dt>
<dd><span class="apihelp-deprecated">Deprecated.</span> Get tokens for data-modifying actions.</dd></dl></dd><dd class="info">One of the following values: <a href="/api.php?action=help&amp;modules=block"><span dir="ltr" lang="en">block</span></a>, <a href="/api.php?action=help&amp;modules=changeauthenticationdata"><span dir="ltr" lang="en">changeauthenticationdata</span></a>, <a href="/api.php?action=help&amp;modules=checktoken"><span dir="ltr" lang="en">checktoken</span></a>, <a href="/api.php?action=help&amp;modules=clearhasmsg"><span dir="ltr" lang="en">clearhasmsg</span></a>, <a href="/api.php?action=help&amp;modules=clientlogin"><span dir="ltr" lang="en">clientlogin</span></a>, <a href="/api.php?action=help&amp;modules=compare"><span dir="ltr" lang="en">compare</span></a>, <a href="/api.php?action=help&amp;modules=createaccount"><span dir="ltr" lang="en">createaccount</span></a>, <a href="/api.php?action=help&amp;modules=cspreport"><span dir="ltr" lang="en">cspreport</span></a>, <a href="/api.php?action=help&amp;modules=delete"><span dir="ltr" lang="en">delete</span></a>, <a href="/api.php?action=help&amp;modules=edit"><span dir="ltr" lang="en">edit</span></a>, <a href="/api.php?action=help&amp;modules=emailuser"><span dir="ltr" lang="en">emailuser</span></a>, <a href="/api.php?action=help&amp;modules=expandtemplates"><span dir="ltr" lang="en">expandtemplates</span></a>, <a href="/api.php?action=help&amp;modules=feedcontributions"><span dir="ltr" lang="en">feedcontributions</span></a>, <a href="/api.php?action=help&amp;modules=feedrecentchanges"><span dir="ltr" lang="en">feedrecentchanges</span></a>, <a href="/api.php?action=help&amp;modules=feedwatchlist"><span dir="ltr" lang="en">feedwatchlist</span></a>, <a href="/api.php?action=help&amp;modules=filerevert"><span dir="ltr" lang="en">filerevert</span></a>, <a href="/api.php?action=help&amp;modules=help"><span dir="ltr" lang="en">help</span></a>, <a href="/api.php?action=help&amp;modules=imagerotate"><span dir="ltr" lang="en">imagerotate</span></a>, <a href="/api.php?action=help&amp;modules=import"><span dir="ltr" lang="en">import</span></a>, <a href="/api.php?action=help&amp;modules=linkaccount"><span dir="ltr" lang="en">linkaccount</span></a>, <a href="/api.php?action=help&amp;modules=login"><span dir="ltr" lang="en">login</span></a>, <a href="/api.php?action=help&amp;modules=logout"><span dir="ltr" lang="en">logout</span></a>, <a href="/api.php?action=help&amp;modules=managetags"><span dir="ltr" lang="en">managetags</span></a>, <a href="/api.php?action=help&amp;modules=mergehistory"><span dir="ltr" lang="en">mergehistory</span></a>, <a href="/api.php?action=help&amp;modules=move"><span dir="ltr" lang="en">move</span></a>, <a href="/api.php?action=help&amp;modules=opensearch"><span dir="ltr" lang="en">opensearch</span></a>, <a href="/api.php?action=help&amp;modules=options"><span dir="ltr" lang="en">options</span></a>, <a href="/api.php?action=help&amp;modules=paraminfo"><span dir="ltr" lang="en">paraminfo</span></a>, <a href="/api.php?action=help&amp;modules=parse"><span dir="ltr" lang="en">parse</span></a>, <a href="/api.php?action=help&amp;modules=patrol"><span dir="ltr" lang="en">patrol</span></a>, <a href="/api.php?action=help&amp;modules=protect"><span dir="ltr" lang="en">protect</span></a>, <a href="/api.php?action=help&amp;modules=purge"><span dir="ltr" lang="en">purge</span></a>, <a href="/api.php?action=help&amp;modules=query"><span dir="ltr" lang="en">query</span></a>, <a href="/api.php?action=help&amp;modules=removeauthenticationdata"><span dir="ltr" lang="en">removeauthenticationdata</span></a>, <a href="/api.php?action=help&amp;modules=resetpassword"><span dir="ltr" lang="en">resetpassword</span></a>, <a href="/api.php?action=help&amp;modules=revisiondelete"><span dir="ltr" lang="en">revisiondelete</span></a>, <a href="/api.php?action=help&amp;modules=rollback"><span dir="ltr" lang="en">rollback</span></a>, <a href="/api.php?action=help&amp;modules=rsd"><span dir="ltr" lang="en">rsd</span></a>, <a href="/api.php?action=help&amp;modules=setnotificationtimestamp"><span dir="ltr" lang="en">setnotificationtimestamp</span></a>, <a href="/api.php?action=help&amp;modules=setpagelanguage"><span dir="ltr" lang="en">setpagelanguage</span></a>, <a href="/api.php?action=help&amp;modules=stashedit"><span dir="ltr" lang="en">stashedit</span></a>, <a href="/api.php?action=help&amp;modules=tag"><span dir="ltr" lang="en">tag</span></a>, <a href="/api.php?action=help&amp;modules=unblock"><span dir="ltr" lang="en">unblock</span></a>, <a href="/api.php?action=help&amp;modules=undelete"><span dir="ltr" lang="en">undelete</span></a>, <a href="/api.php?action=help&amp;modules=unlinkaccount"><span dir="ltr" lang="en">unlinkaccount</span></a>, <a href="/api.php?action=help&amp;modules=upload"><span dir="ltr" lang="en">upload</span></a>, <a href="/api.php?action=help&amp;modules=userrights"><span dir="ltr" lang="en">userrights</span></a>, <a href="/api.php?action=help&amp;modules=validatepassword"><span dir="ltr" lang="en">validatepassword</span></a>, <a href="/api.php?action=help&amp;modules=watch"><span dir="ltr" lang="en">watch</span></a>, <a href="/api.php?action=help&amp;modules=tokens"><span dir="ltr" lang="en" class="apihelp-deprecated-value">tokens</span></a></dd><dd class="info">Default: <span dir="auto">help</span></dd><dt><span dir="ltr" lang="en">format</span></dt><dd class="description"><p>The format of the output.
</p><dl><dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=json">json</a></span></dt>
<dd>Output data in JSON format.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=jsonfm">jsonfm</a></span></dt>
<dd>Output data in JSON format (pretty-print in HTML).</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=none">none</a></span></dt>
<dd>Output nothing.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=php">php</a></span></dt>
<dd>Output data in serialized PHP format.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=phpfm">phpfm</a></span></dt>
<dd>Output data in serialized PHP format (pretty-print in HTML).</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=rawfm">rawfm</a></span></dt>
<dd>Output data, including debugging elements, in JSON format (pretty-print in HTML).</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=xml">xml</a></span></dt>
<dd>Output data in XML format.</dd>
<dt><span dir="ltr" lang="en"><a href="/api.php?action=help&amp;modules=xmlfm">xmlfm</a></span></dt>
<dd>Output data in XML format (pretty-print in HTML).</dd></dl></dd><dd class="info">One of the following values: <a href="/api.php?action=help&amp;modules=json"><span dir="ltr" lang="en">json</span></a>, <a href="/api.php?action=help&amp;modules=jsonfm"><span dir="ltr" lang="en">jsonfm</span></a>, <a href="/api.php?action=help&amp;modules=none"><span dir="ltr" lang="en">none</span></a>, <a href="/api.php?action=help&amp;modules=php"><span dir="ltr" lang="en">php</span></a>, <a href="/api.php?action=help&amp;modules=phpfm"><span dir="ltr" lang="en">phpfm</span></a>, <a href="/api.php?action=help&amp;modules=rawfm"><span dir="ltr" lang="en">rawfm</span></a>, <a href="/api.php?action=help&amp;modules=xml"><span dir="ltr" lang="en">xml</span></a>, <a href="/api.php?action=help&amp;modules=xmlfm"><span dir="ltr" lang="en">xmlfm</span></a></dd><dd class="info">Default: <span dir="auto">jsonfm</span></dd><dt><span dir="ltr" lang="en">maxlag</span></dt><dd class="description"><p>Maximum lag can be used when MediaWiki is installed on a database replicated cluster. To save actions causing any more site replication lag, this parameter can make the client wait until the replication lag is less than the specified value. In case of excessive lag, error code <samp>maxlag</samp> is returned with a message like <samp>Waiting for $host: $lag seconds lagged</samp>.<br>See <a href="https://www.mediawiki.org/wiki/Special:MyLanguage/Manual:Maxlag_parameter" class="extiw" title="mw:Special:MyLanguage/Manual:Maxlag parameter">Manual: Maxlag parameter</a> for more information.
</p></dd><dd class="info">Type: integer</dd><dt><span dir="ltr" lang="en">smaxage</span></dt><dd class="description"><p>Set the <code>s-maxage</code> HTTP cache control header to this many seconds. Errors are never cached.
</p></dd><dd class="info">Type: integer</dd><dd class="info">Default: <span dir="auto">0</span></dd><dt><span dir="ltr" lang="en">maxage</span></dt><dd class="description"><p>Set the <code>max-age</code> HTTP cache control header to this many seconds. Errors are never cached.
</p></dd><dd class="info">Type: integer</dd><dd class="info">Default: <span dir="auto">0</span></dd><dt><span dir="ltr" lang="en">assert</span></dt><dd class="description"><p>Verify the user is logged in if set to <kbd>user</kbd>, or has the bot user right if <kbd>bot</kbd>.
</p></dd><dd class="info">One of the following values: <span dir="auto">user</span>, <span dir="auto">bot</span></dd><dt><span dir="ltr" lang="en">assertuser</span></dt><dd class="description"><p>Verify the current user is the named user.
</p></dd><dd class="info">Type: user name</dd><dt><span dir="ltr" lang="en">requestid</span></dt><dd class="description"><p>Any value given here will be included in the response. May be used to distinguish requests.
</p></dd><dt><span dir="ltr" lang="en">servedby</span></dt><dd class="description"><p>Include the hostname that served the request in the results.
</p></dd><dd class="info">Type: boolean (<a href="#main.2Fdatatypes">details</a>)</dd><dt><span dir="ltr" lang="en">curtimestamp</span></dt><dd class="description"><p>Include the current timestamp in the result.
</p></dd><dd class="info">Type: boolean (<a href="#main.2Fdatatypes">details</a>)</dd><dt><span dir="ltr" lang="en">responselanginfo</span></dt><dd class="description"><p>Include the languages used for <var>uselang</var> and <var>errorlang</var> in the result.
</p></dd><dd class="info">Type: boolean (<a href="#main.2Fdatatypes">details</a>)</dd><dt><span dir="ltr" lang="en">origin</span></dt><dd class="description"><p>When accessing the API using a cross-domain AJAX request (CORS), set this to the originating domain. This must be included in any pre-flight request, and therefore must be part of the request URI (not the POST body).
</p><p>For authenticated requests, this must match one of the origins in the <code>Origin</code> header exactly, so it has to be set to something like <kbd><a rel="nofollow" class="external free" href="https://en.wikipedia.org">https://en.wikipedia.org</a></kbd> or <kbd><a rel="nofollow" class="external free" href="https://meta.wikimedia.org">https://meta.wikimedia.org</a></kbd>. If this parameter does not match the <code>Origin</code> header, a 403 response will be returned. If this parameter matches the <code>Origin</code> header and the origin is whitelisted, the <code>Access-Control-Allow-Origin</code> and <code>Access-Control-Allow-Credentials</code> headers will be set.
</p><p>For non-authenticated requests, specify the value <kbd>*</kbd>. This will cause the <code>Access-Control-Allow-Origin</code> header to be set, but <code>Access-Control-Allow-Credentials</code> will be <code>false</code> and all user-specific data will be restricted.
</p></dd><dt><span dir="ltr" lang="en">uselang</span></dt><dd class="description"><p>Language to use for message translations. <kbd><a href="/api.php?action=help&amp;modules=query%2Bsiteinfo">action=query&amp;meta=siteinfo</a></kbd> with <kbd>siprop=languages</kbd> returns a list of language codes, or specify <kbd>user</kbd> to use the current user's language preference, or specify <kbd>content</kbd> to use this wiki's content language.
</p></dd><dd class="info">Default: <span dir="auto">user</span></dd><dt><span dir="ltr" lang="en">errorformat</span></dt><dd class="description"><p>Format to use for warning and error text output.
</p>
<dl><dt> plaintext</dt>
<dd> Wikitext with HTML tags removed and entities replaced.</dd>
<dt> wikitext</dt>
<dd> Unparsed wikitext.</dd>
<dt> html</dt>
<dd> HTML.</dd>
<dt> raw</dt>
<dd> Message key and parameters.</dd>
<dt> none</dt>
<dd> No text output, only the error codes.</dd>
<dt> bc</dt>
<dd> Format used prior to MediaWiki 1.29. <var>errorlang</var> and <var>errorsuselocal</var> are ignored.</dd></dl></dd><dd class="info">One of the following values: <span dir="auto">plaintext</span>, <span dir="auto">wikitext</span>, <span dir="auto">html</span>, <span dir="auto">raw</span>, <span dir="auto">none</span>, <span dir="auto">bc</span></dd><dd class="info">Default: <span dir="auto">bc</span></dd><dt><span dir="ltr" lang="en">errorlang</span></dt><dd class="description"><p>Language to use for warnings and errors. <kbd><a href="/api.php?action=help&amp;modules=query%2Bsiteinfo">action=query&amp;meta=siteinfo</a></kbd> with <kbd>siprop=languages</kbd> returns a list of language codes, or specify <kbd>content</kbd> to use this wiki's content language, or specify <kbd>uselang</kbd> to use the same value as the <var>uselang</var> parameter.
</p></dd><dd class="info">Default: <span dir="auto">uselang</span></dd><dt><span dir="ltr" lang="en">errorsuselocal</span></dt><dd class="description"><p>If given, error texts will use locally-customized messages from the MediaWiki namespace.
</p></dd><dd class="info">Type: boolean (<a href="#main.2Fdatatypes">details</a>)</dd></dl></div>
<div class="apihelp-block apihelp-examples"><div class="apihelp-block-head">Examples:</div><dl><dt>Help for the main module.</dt><dd><a href="/api.php?action=help" dir="ltr">api.php?action=help</a> <a href="/index.php?title=Special:ApiSandbox#action=help"><small>[open in sandbox]</small></a></dd><dt>All help in one page.</dt><dd><a href="/api.php?action=help&amp;recursivesubmodules=1" dir="ltr">api.php?action=help&amp;recursivesubmodules=1</a> <a href="/index.php?title=Special:ApiSandbox#action=help&amp;recursivesubmodules=1"><small>[open in sandbox]</small></a></dd></dl></div>
<div class="apihelp-block apihelp-permissions"><div class="apihelp-block-head">Permissions:</div><dl><dt>writeapi</dt><dd>Use of the write API</dd><dd>Granted to: all, user and bot</dd><dt>apihighlimits</dt><dd>Use higher limits in API queries (slow queries: 500; fast queries: 5000). The limits for slow queries also apply to multivalue parameters.</dd><dd>Granted to: bot and sysop</dd></dl></div>

<div id="main/datatypes"></div><h3 class="apihelp-header" id="main.2Fdatatypes">Data types</h3><p>Input to MediaWiki should be NFC-normalized UTF-8. MediaWiki may attempt to convert other input, but this may cause some operations (such as <a href="/api.php?action=help&amp;modules=edit">edits</a> with MD5 checks) to fail.
</p><p>Some parameter types in API requests need further explanation:
</p>
<dl><dt>boolean</dt>
<dd>Boolean parameters work like HTML checkboxes: if the parameter is specified, regardless of value, it is considered true. For a false value, omit the parameter entirely.</dd>
<dt>timestamp</dt>
<dd>Timestamps may be specified in several formats. ISO 8601 date and time is recommended. All times are in UTC, any included timezone is ignored.
<ul><li> ISO 8601 date and time, <kbd><var>2001</var>-<var>01</var>-<var>15</var>T<var>14</var>:<var>56</var>:<var>00</var>Z</kbd> (punctuation and <kbd>Z</kbd> are optional)</li>
<li> ISO 8601 date and time with (ignored) fractional seconds, <kbd><var>2001</var>-<var>01</var>-<var>15</var>T<var>14</var>:<var>56</var>:<var>00</var>.<var>00001</var>Z</kbd> (dashes, colons, and <kbd>Z</kbd> are optional)</li>
<li> MediaWiki format, <kbd><var>2001</var><var>01</var><var>15</var><var>14</var><var>56</var><var>00</var></kbd></li>
<li> Generic numeric format, <kbd><var>2001</var>-<var>01</var>-<var>15</var> <var>14</var>:<var>56</var>:<var>00</var></kbd> (optional timezone of <kbd>GMT</kbd>, <kbd>+<var>##</var></kbd>, or <kbd>-<var>##</var></kbd> is ignored)</li>
<li> EXIF format, <kbd><var>2001</var>:<var>01</var>:<var>15</var> <var>14</var>:<var>56</var>:<var>00</var></kbd></li>
<li>RFC 2822 format (timezone may be omitted), <kbd><var>Mon</var>, <var>15</var> <var>Jan</var> <var>2001</var> <var>14</var>:<var>56</var>:<var>00</var></kbd></li>
<li> RFC 850 format (timezone may be omitted), <kbd><var>Monday</var>, <var>15</var>-<var>Jan</var>-<var>2001</var> <var>14</var>:<var>56</var>:<var>00</var></kbd></li>
<li> C ctime format, <kbd><var>Mon</var> <var>Jan</var> <var>15</var> <var>14</var>:<var>56</var>:<var>00</var> <var>2001</var></kbd></li>
<li> Seconds since 1970-01-01T00:00:00Z as a 1 to 13 digit integer (excluding <kbd>0</kbd>)</li>
<li> The string <kbd>now</kbd></li></ul></dd></dl><dl><dt>alternative multiple-value separator</dt>
<dd>Parameters that take multiple values are normally submitted with the values separated using the pipe character, e.g. <kbd>param=value1|value2</kbd> or <kbd>param=value1%7Cvalue2</kbd>. If a value must contain the pipe character, use U+001F (Unit Separator) as the separator <i>and</i> prefix the value with U+001F, e.g. <kbd>param=%1Fvalue1%1Fvalue2</kbd>.</dd></dl><div id="main/credits"></div><h3 class="apihelp-header" id="main.2Fcredits">Credits</h3><p>API developers:
</p>
<ul><li> Yuri Astrakhan (creator, lead developer Sep 2006–Sep 2007)</li>
<li> Roan Kattouw (lead developer Sep 2007–2009)</li>
<li> Victor Vasiliev</li>
<li> Bryan Tong Minh</li>
<li> Sam Reed</li>
<li> Brad Jorsch (lead developer 2013–present)</li></ul><p>Please send your comments, suggestions and questions to mediawiki-api@lists.wikimedia.org
or file a bug report at <a rel="nofollow" class="external free" href="https://phabricator.wikimedia.org/">https://phabricator.wikimedia.org/</a>.
</p></div><div class="printfooter">
Retrieved from "<a dir="ltr" href="https://wiki.unrealengine.com/index.php?title=Special:ApiHelp">https://wiki.unrealengine.com/index.php?title=Special:ApiHelp</a>"</div>
			</div>
		</div>

		<script>(window.RLQ=window.RLQ||[]).push(function(){mw.config.set({"wgBackendResponseTime":446});});</script>		<script type="text/javascript">window.NREUM||(NREUM={});NREUM.info={"beacon":"bam.nr-data.net","licenseKey":"93a8bd5691","applicationID":"145396307","transactionName":"MlxXbUBZWkJUAkVQCgsWdFpGUVtfGgBBUEoNXFlJ","queueTime":0,"applicationTime":447,"atts":"HhtUGwhDSUw=","errorBeacon":"bam.nr-data.net","agent":""}</script></body></html>
