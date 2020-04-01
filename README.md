# About this repo

This is a dump from the internet archive of the wiki.unrealengine.com website.

PR's welcome.

# PLEASE NOTE THIS SITE WAS TAKEN OFFLINE FOR SECURITY REASONS.  

If the breach injected malicious code into the wiki pages, that malicious code may be archived here.  I can't speak to that either way - just the possibility.  

Many of these files were archived some years ago, so may not be "up to date" with the latest changes.

Many of the image files (.png) appear to be text files.  I tested out a GitHub pages site, but the formatting was not great, and there may be malicious code so I took it down.

# How this data was collected

The Internet Archive has a wayback machine:

```
https://web.archive.org/web/*/https://wiki.unrealengine.com/*
```

The Wayback-machine-downloader has a Docker image:

```
docker run --rm -it -v $PWD/websites:/websites hartator/wayback-machine-downloader https://wiki.unrealengine.com/ 
```

This is a `git add --all .` of the files it downloaded.

PR's welcome

# Why VuePress?

It's highly recommended and in active development: https://snipcart.com/blog/choose-best-static-site-generator

Gitbook is no longer in active development after a pivot to SaaS: https://github.com/GitbookIO/gitbook

# How can I help?

1) Clone this repo.
2) Join our discord: https://discord.gg/bfUcCh
2) While downloading, check out the [VuePress documentation](https://vuepress.vuejs.org/)
3) Check out the conversion scripts - There are three steps:
   1) Convert `original/**/*.html` to `markdown/**/*.md`
   2) Move/process attachments to the right locations
   3) Indexing
   4) Manual Cleanup (not yet, wait till 1,2,3 are done)
1) Look us up on Discord for how to help and submit a PR

# The Plan

x Create `transcode.sh` 
x process every `original/**/*.html`
- transcode from html to markdown
- copy assets


