# drawing_game

## Current State and things I've tried

The current state of the application is a user can pick a topic (shapes for testing), start the game, draw the corresponding shape on the canvas (change colour and erase also). Once a user is ready to submit there canvas picture, they can click the submit button and the image gets converted to a base64string, then gets sent over to the server along with the randomItem, which then in turn gets sent to Gemini to be compared and a "score" is returned.

## Ongoing and next steps

Comments - I'm currently adding a lot of comments. Now if your a seasoned developer these comments could seem pointless and advertising the obvious. But for me, as someone that is learning they are of a benefit as the project is getting rather large and I want to have a huge understanding of every small part that's happening.

Database - As the project grows I would like to add a lot more data with more shapes more animals and in general more data. To do this I am planning on adding a MonoDB Database and integrate this soon.

Score Component - Create a score component that displays the score.

AI Learning & Tweaking - Add a lot more data to the AI so it is smarter when it comes to comparing the images a user has drawn. It can sometimes be harsh and I need to train it to be more lenient at times.

Educational Research - While this starter as a small project thought up by a 4 year old. It genuinely has become far more than that. I want to research more into the educational side of it. I am trying to setup a meeting with a few teachers to get some insight on if it would be beneficial for primary age children and if I could add in things like diagraphs to make it even more targeted towards education.

Games - This is a game, so in complete opposition to the above I would like to add more game modes like a story and a battle mode.

## OVERVIEW

Since I started paying around with unity, I asked my kids of a game idea and my 4 year old daughter I think has actually come up with a good idea.
It's basic concept is an image appears and, in Ivy's words, you have 5 seconds to draw(copy) it. Now, 5 seconds may be a little quick. So it got me thinking, has this game been done? It must have right? Turns out possibly not, well not that I've found. The closest style game would be Google's Quick Draw where an AI tries to guess what you are drawing. Having thought even more this could actually be a fun learning game for children to learn shapes etc and more difficult fun game for adults. It could even be used for education purposes and has lots of scope for building out into a large application.

## TECH

I think this would be a good web based game. I have started playing around with Unity, but Eli's game will be better for that. With HTML's canvas element it "should" be fairly simple to create the basic game and layout. I can also fetch random images with certain filters from unsplash for example. Lastly I will use some sort of AI to compare the given image and the users drawn image and try and parse some kind of "score".

~~ All subject to change if a framework or tool is better ~~

- Frontend - React => I think the compartmentalised components will work well with this project along with the context and hooks separation.
- Backend - NodeJS and Express
- AI - I am using Gemini for this as it has the ability to parse base64images and can compare the user's drawing well.

## WHAT HAVE I LEARNT?

Canvas - how to draw with the mouse and add different colours, sizes of "pen" etc.
AI - how to send things to an AI agent, parse the data received and display on the frontend.
FullStack - this is very much a fullstack project and I've learnt how to send data from the client to the server, then to an AI agent then back to the server and in turn the client.
Context - This is ongoing but I am getting to grips with how context works and how much easier it makes passing props, variables and functions to components, and multiple components at that.
