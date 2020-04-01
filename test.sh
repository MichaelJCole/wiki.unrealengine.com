rm -rf docs/.vuepress/wiki.unrealengine.com  
mv docs/.vuepress/dist docs/.vuepress/wiki.unrealengine.com  
sensible-browser http://localhost:8080/wiki.unrealengine.com
http-server docs/.vuepress 
