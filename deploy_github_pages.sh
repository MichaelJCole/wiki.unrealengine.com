#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn docs:build

# Theme crashes on 12 gig memory and 45 min build when using sidebar
cd src
node makeIndex.js
cd ..

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:MichaelJCole/wiki.unrealengine.com.git master:gh-pages

cd -