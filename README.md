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



