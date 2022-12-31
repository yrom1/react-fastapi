inspo https://tobymao.com/

most to least important todos:
- [ ] site looks like garbage how did i make flask-dashboard look so good? copy all the css, this will be painful
  - [ ] can we have a loading symbols for the projects one at a time? somethings off about the formatting
- [ ] light and dark themes but please dont make a mess of it like in flask-dashboard
- [x] Need to authenticate github api requests:
- [ ] okay im not sure if there's a bug but: if you do `sh run.sh` click some header links, walk away and tab out, the next time you click a tab the page component doesn't update... does fastapi or react have some timeout thing in non production mode? it only happens sometimes
  - okay i thought it was a cross origin problem but actually if you're on the home page and click the home button it breaks
