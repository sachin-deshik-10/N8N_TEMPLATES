# OpenAI Content Generator

An intelligent content generation workflow that uses OpenAI's GPT models to create various types of content including blog posts, social media content, product descriptions, and more.

## Overview

This template provides a powerful AI-driven content generation system that can produce high-quality, contextual content for various use cases. It includes prompt engineering, content formatting, and quality validation.

## Features

- ✅ Multiple content types (blog posts, social media, emails, etc.)
- ✅ Dynamic prompt engineering
- ✅ Content quality validation
- ✅ Multiple output formats (Markdown, HTML, Plain Text)
- ✅ Token usage tracking
- ✅ Error handling and retry logic
- ✅ Content moderation checks
- ✅ SEO optimization options

## Prerequisites

- n8n instance (version 1.0.0 or higher)
- OpenAI API account and API key
- Basic understanding of AI prompting

## Setup Instructions

### 1. Import the Workflow

1. Download the `workflow.json` file
2. Open your n8n editor
3. Click "Import from file"
4. Select the downloaded workflow file

### 2. Configure OpenAI Credentials

1. **Create OpenAI Credential**:
   - Go to Credentials in n8n
   - Add new credential of type "OpenAI"
   - Enter your OpenAI API key

2. **Set Model Preferences**:
   - Default: `gpt-4`
   - Alternative: `gpt-3.5-turbo` (faster, cheaper)
   - Advanced: `gpt-4-turbo` (for complex tasks)

### 3. Environment Variables

Create a `.env` file with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4
MAX_TOKENS=2000
TEMPERATURE=0.7
CONTENT_MODERATION=true
```

### 4. Test the Workflow

1. Use the webhook trigger or manual trigger
2. Provide content requirements in the input
3. Check generated content quality
4. Verify token usage tracking

## Usage Examples

### Example 1: Blog Post Generation

```json
{
  "content_type": "blog_post",
  "topic": "The Future of Artificial Intelligence",
  "target_audience": "Technology professionals",
  "tone": "professional",
  "word_count": 800,
  "seo_keywords": ["AI", "machine learning", "automation"],
  "include_sections": ["introduction", "main_points", "conclusion"]
}
```

### Example 2: Social Media Content

```json
{
  "content_type": "social_media",
  "platform": "linkedin",
  "topic": "Remote work productivity tips",
  "tone": "engaging",
  "include_hashtags": true,
  "character_limit": 280
}
```

### Example 3: Product Description

```json
{
  "content_type": "product_description",
  "product_name": "Smart Fitness Tracker",
  "key_features": ["heart rate monitoring", "GPS tracking", "waterproof"],
  "target_audience": "fitness enthusiasts",
  "tone": "persuasive",
  "word_count": 150
}
```

## Customization

### Content Types

The workflow supports these content types:
- `blog_post` - Long-form articles
- `social_media` - Platform-specific posts
- `product_description` - E-commerce descriptions
- `email` - Marketing and transactional emails
- `press_release` - Corporate announcements
- `technical_documentation` - Developer guides
- `creative_writing` - Stories and narratives

### Prompt Engineering

Customize prompts in the Function node:

```javascript
function generatePrompt(contentType, requirements) {
  const prompts = {
    blog_post: `Write a comprehensive blog post about "${requirements.topic}".
                Target audience: ${requirements.target_audience}
                Tone: ${requirements.tone}
                Word count: approximately ${requirements.word_count} words
                Include SEO keywords: ${requirements.seo_keywords.join(', ')}`,

    social_media: `Create an engaging ${requirements.platform} post about "${requirements.topic}".
                   Tone: ${requirements.tone}
                   ${requirements.include_hashtags ? 'Include relevant hashtags' : ''}
                   ${requirements.character_limit ? `Limit: ${requirements.character_limit} characters` : ''}`,

    // Add more prompt templates...
  };

  return prompts[contentType] || prompts.blog_post;
}
```

### Quality Validation

The workflow includes content quality checks:

```javascript
function validateContent(content, requirements) {
  const checks = {
    word_count: checkWordCount(content, requirements.word_count),
    tone_consistency: checkTone(content, requirements.tone),
    keyword_inclusion: checkKeywords(content, requirements.seo_keywords),
    readability: calculateReadabilityScore(content),
    grammar: checkGrammar(content)
  };

  return {
    score: calculateOverallScore(checks),
    details: checks,
    approved: checks.score >= 0.8
  };
}
```

## Advanced Features

### Content Moderation

The workflow includes OpenAI's moderation API to ensure safe content:

```javascript
// Moderation check
const moderationResponse = await openai.moderations.create({
  input: generatedContent
});

if (moderationResponse.results[0].flagged) {
  throw new Error('Content flagged by moderation system');
}
```

### SEO Optimization

Automatic SEO enhancements:
- Keyword density analysis
- Meta description generation
- Title tag optimization
- Internal linking suggestions

### Multi-language Support

```javascript
const languages = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian'
};

const prompt = `Write in ${languages[targetLanguage]}: ${basePrompt}`;
```

## Error Handling

The workflow handles common issues:

### Rate Limiting
```javascript
if (error.status === 429) {
  // Implement exponential backoff
  const delay = Math.pow(2, retryCount) * 1000;
  await sleep(delay);
  return retryRequest();
}
```

### Token Limits
```javascript
if (estimatedTokens > maxTokens) {
  // Split content into chunks
  return generateInChunks(prompt, maxTokens);
}
```

### Content Quality
```javascript
if (qualityScore < threshold) {
  // Regenerate with improved prompt
  return regenerateWithFeedback(prompt, qualityIssues);
}
```

## Performance Optimization

### Token Management
- Monitor token usage per request
- Implement token budgeting
- Use appropriate models for different tasks

### Caching
- Cache frequently requested content types
- Store successful prompts for reuse
- Implement content versioning

### Batch Processing
- Process multiple requests in parallel
- Implement queue management
- Optimize for cost efficiency

## Security Best Practices

- Store API keys securely
- Implement content filtering
- Log all generation requests
- Monitor for unusual usage patterns
- Validate all input parameters

## Troubleshooting

### Common Issues

**Issue**: API rate limit exceeded
- **Solution**: Implement retry logic with exponential backoff

**Issue**: Generated content is off-topic
- **Solution**: Improve prompt specificity and add examples

**Issue**: Content quality is inconsistent
- **Solution**: Add quality validation and regeneration logic

**Issue**: High token usage costs
- **Solution**: Optimize prompts and use appropriate models

### Debug Mode

Enable debug logging:

```javascript
const DEBUG = process.env.DEBUG === 'true';

if (DEBUG) {
  console.log('Prompt:', prompt);
  console.log('Response:', response);
  console.log('Token usage:', response.usage);
}
```

## Cost Management

### Token Optimization
- Use shorter prompts when possible
- Choose appropriate models for tasks
- Implement content caching

### Budget Controls
- Set daily/monthly spending limits
- Monitor token usage trends
- Implement cost alerts

## Integration Examples

### CMS Integration
Connect with popular CMS platforms:
- WordPress
- Contentful
- Strapi
- Ghost

### Marketing Automation
Integrate with marketing tools:
- HubSpot
- Mailchimp
- Buffer
- Hootsuite

## Support

For help with this template:
1. Check OpenAI API documentation
2. Review n8n community forums
3. Test with simple prompts first
4. Monitor token usage and costs

## Credits

Template created by the N8N Templates community.
Powered by OpenAI's GPT models.
