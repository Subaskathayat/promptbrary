Prompt engineering is as much art as it is science. Generative AI tools like ChatGPT, Stable Diffusion, Midjourney, Gemini, etc. have been slowly transforming industries, to the point where it’s simply too laborious and inefficient to work without them. Despite their relevance, being able to write clear and concise instructions for large language models is a foundational process that many user still ignore.

It’s unfortunate, because with a little bit of creativity and deliberation, you can do some wonderful things. I wrote this tiny guide to give users a glimpse into my own methods for building prompts. I’ve provided some practical techniques that demonstrate how to get better responses from any LLM.

In short, in this walkthrough, we’re going to:

Write a basic prompt
Examine that prompt
Improve it with the help of AI
But first…

Context, context (and some more context)!
Think of a prompt as something like a putting blinders on a horse. You want to narrow its field-of-view so that only the goal you have in mind is visible. Think of context as the direction in which you want that horse to travel.

The other day I was trying to cook up ideas for a new tech product. As usual, I logged into Claude (my current LLM of choice, if only for the Projects feature) and began to sculpt a role for the language model. This, of course, was not necessary — but it’s incredibly useful.

When you assign a role, task, goal, or any other specifics to a large language model, its responses are waaay better tailored to match your expectations. The best part — you can give the AI a standard prompt and request it to flesh it out further.


The Basics of Writing Good Prompts
Keep the following components in mind as you construct your prompts. They each serve a distinct purpose and they will greatly shape the resulting output.

1. Role and Context Setting
Instead of simply asking a question, establish the AI’s role and context:

❌ Bad: “Write a blog post about microservices.”

✅ Good: “As a senior software architect with 15 years of experience building distributed systems, write a technical blog post about microservices architecture patterns.”

2. Clear Objectives and Constraints
Specify your desired outcome and any limitations:

❌ Bad: “Help me with this Python code.”

✅ Good: “Review this Python function for performance optimization. Focus on reducing memory usage and improving time complexity. The code must maintain backward compatibility.”

3. Output Format Definition
Define exactly how you want the information structured:

❌ Bad: “Tell me about different database types.”

✅ Good: “Compare NoSQL and SQL databases using this format:
- Use cases:
- Performance characteristics:
- Scalability considerations:
- Cost implications:”

our prompthancer can do thia all.