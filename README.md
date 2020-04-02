# Welcome to the internet archive dump of the wiki.unrealengine.com website.

For the articles, [see below](#Articles).

### About this Site

- Is this site awesome?  Hell no.
- Is this site a replacement?  Nope.  No formatting, tagging, or images came in the dump.
- Can you read and build on the wiki's?  Yes.

Please note this site was taken offline for security reasons, so handle the "original" folder in the [git repo](https://github.com/MichaelJCole/wiki.unrealengine.com) appropriately.

### How this data was collected

The [Internet Archive](https://archive.org] has a wayback machine:

```
https://web.archive.org/web/*/https://wiki.unrealengine.com/*
```

The [Wayback-machine-downloader](https://github.com/hartator/wayback-machine-downloader) has a Docker image:

```
docker run --rm -it -v $PWD/websites:/websites hartator/wayback-machine-downloader https://wiki.unrealengine.com/ 
```

Some scripts and some [VuePress](https://snipcart.com/blog/choose-best-static-site-generator) and viola!

### How can I help?

PR's welcome.  I wanted to setup Git, so wanted to read the Git articles.  I'm not planning to maintain the site, but will merge PR's.

### Articles

Here is a [list of articles](https://michaeljcole.github.io/wiki.unrealengine.com/):

