# promptbrary
Enhance simple prompts into professional ready to use prompts

test text

for my quick access :

git add .
git commit -m "Fix"
git push origin main

prompt: 

Now we will make a Social Media Post generator work

for that we will write whole  logic for prompt enhancer feature in @socialMediaPostGenerator.js

so remove old dummy code that are related to Social media post generator function from app.js which were created for testing ui

we will use API key that user puts in api-key input to send the post idea along with the tone formality and platform and recieve ready to post Content  from ai model

we wil send text and selected tone formality and platform like this so write a logic to send the users post idea to the ai , if you need idea that how to write a code to call ai you can see it in file prompt_enhance.js 

Generate an SEO-optimized social media post based on the details I provide.
Use the tone and formality level I specify.
Make it clear, engaging, and platform-friendly.
Here are my details:
Idea: <your idea>
Tone: <Auto / Enthusiastic / Humorous/ professional / friendly >
Formality: <Auto / Casual / Neutral / Formal>
Platform: <Twitter / LinkedIn / Threads>

output

recieved output should be written into output area no other extra text