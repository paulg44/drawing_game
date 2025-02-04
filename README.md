# drawing_game

## Current State and things I've tried

The current state of the application is a user can pick a topic (shapes for testing), start the game, draw the corresponding shape on the canvas (change colour and erase also), then either save the images to the server to be compared later (more on this below), or compare the images straight away from the server. The issue I'm having is how exactly to compare the images, as it is a game aimed at kids.

Things tried so far

- The current way of it working is it using pixelMatch to compare both images when sent to the server. This works fine but it is far to exact for what I need
- Using resemblejs and sharp, I couldn't get these to work together well because of the file type's. Possible revisit
- Lastly I have tried with OpenCV.js. This felt like it could work as it is the SSIM I initially thought I would use, however it pretty much crashed my laptop when I tried to run it. JavaScript heap out of memory was the error. I think doing it this way the data set is too large and would, if ever in production, crash the users device.

Which leads me to what I will be trying next

- My current hypothesis is to use an external AI such as openai. I am currently learning openai and how it all works in a separate repo, along with working out how much it would actually cost to run a single image comparison.
- I could also possibly use something like TensorFlow, try BLIP (need more research), Azure or Google Cloud Vision.

## OVERVIEW

Since I started paying around with unity, I asked my kids of a game idea and my 4 year old daughter I think has actually come up with a good idea.
It's basic concept is an image appears and, in Ivy's words, you have 5 seconds to draw(copy) it. Now, 5 seconds may be a little quick. So it got me thinking, has this game been done? It must have right? Turns out possibly not, well not that I've found. The closest style game would be Google's Quick Draw where an AI tries to guess what you are drawing. Having thought even more this could actually be a fun learning game for children to learn shapes etc and more difficult fun game for adults.

## TECH

I think this would be a good web based game. I have started playing around with Unity, but Eli's game will be better for that. With HTML's canvas element it "should" be fairly simple to create the basic game and layout. I can also fetch random images with certain filters from unsplash for example. Lastly I will use some sort of AI to compare the given image and the users drawn image and try and parse some kind of "score".

~~ All subject to change if a framework or tool is better ~~

- Frontend - React => A tech I am familiar with and i think the compartmentalised components will work well with this project.
- Backend - NodeJS and Express => Again it's what I'm familiar with.
- AI - Currently looking at structural similarity index measure (SSIM) as I believe this will be the easiest way to get the project up and running quickly.

## WHAT WILL I LEARN?

Firstly the canvas element, how to draw with the mouse and add different colours, sizes of "pen" etc. Secondly some kind of AI comparison tool, this is to be determined exactly what I will use, but whatever it will be it will be new to me. Then there's the possibility of making this a mobile/tablet game. Having watched my children play game's on their tablets I think this could be a good mobile style game.
