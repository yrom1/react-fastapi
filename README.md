# react-fastapi
React dashboard site with a fastapi backend!

# notes
## 2022-12-24
Because React Router was such a pain and breaks the API so often I'm doing everything in pure React following https://ncoughlin.com/posts/react-navigation-without-react-router/. Theme stuff from https://www.makeuseof.com/how-to-add-dark-mode-to-a-react-application/.

## 2022-12-30
Something I've been thinking about. You see how this is one page: https://tobymao.com/? That's kinda nice actually. If you think of the site as a resume, I have one page–who am I to have three pages? People aren't going to click through my site anyway, probably. If they click on the site then I can go full tilt and put all my cool stuff on that single home page, rather than spread stuff across pages.

## 2022-01-08
http://rymo.xyz/

## 2022-01-09
It's live, just felt like doing it. It's on EC2 with an elastic ip that I set up like this on google domains: https://stackoverflow.com/questions/32467541/link-a-google-domain-to-amazon-ec2-server. Here's how I used nginx to listen on port 80 to redirect to port 3000 react:

![](nginx.png)

I only had to change the server_name and proxy_pass. None of the backend is set up yet.
