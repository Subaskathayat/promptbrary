# Backend API Integration Plan

## Current Implementation
- Currently, users manually enter their OpenAI API key in the frontend
- The API key is sent directly from the client to OpenAI's API
- No server-side validation or management of API keys

## Proposed Changes

### 1. Backend API Endpoints
```
POST /api/enhance-prompt
- Request: { "prompt": "user prompt", "tone": "professional", "length": "medium" }
- Response: { "enhancedPrompt": "...", "tokensUsed": 42 }

POST /api/generate-social-post
- Request: { "platform": "twitter", "topic": "...", "style": "...", "tone": "..." }
- Response: { "post": "...", "tokensUsed": 85 }
```

### 2. Environment Configuration
- Store OpenAI API key in `.env`:
  ```
  OPENAI_API_KEY=your-api-key-here
  ```
- Add `.env` to `.gitignore`
- Create `.env.example` with placeholder values

### 3. Security Measures
- Add rate limiting to prevent abuse
- Add input validation
- Add error handling for API failures
- Consider adding API key rotation support

### 4. Frontend Changes
- Remove API key input field
- Update API calls to use new backend endpoints
- Add loading states and error handling
- Update UI to reflect server-side processing

## Implementation Steps
1. [ ] Set up environment variables
2. [ ] Create API endpoint for prompt enhancement
3. [ ] Create API endpoint for social media generation
4. [ ] Update frontend to use new endpoints
5. [ ] Add error handling and validation
6. [ ] Test thoroughly
7. [ ] Update documentation

## Questions
1. Should we implement user authentication now or later? not now
2. Do we need to track usage per user/session? not now 
3. Should we implement caching for similar requests? not now
4. Do we need to support multiple AI models? not now 

## Rules
api key should not be visible to users 
key should not even show in browser inspect for security reason 
