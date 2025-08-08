# REST API Data Fetcher

A simple yet powerful workflow template for fetching data from REST APIs with error handling, data transformation, and output formatting.

## Overview

This template provides a robust foundation for REST API integrations in n8n. It includes error handling, retry logic, data transformation capabilities, and flexible output options.

## Features

- ✅ HTTP request with configurable endpoints
- ✅ Error handling and retry logic
- ✅ Data transformation and filtering
- ✅ JSON/CSV output formatting
- ✅ Webhook trigger support
- ✅ Rate limiting considerations
- ✅ Authentication support (API Key, Bearer Token)

## Prerequisites

- n8n instance (version 0.200.0 or higher)
- API endpoint access
- API credentials (if required)

## Setup Instructions

### 1. Import the Workflow

1. Download the `workflow.json` file
2. Open your n8n editor
3. Click "Import from file"
4. Select the downloaded workflow file

### 2. Configure API Settings

1. **Set API Endpoint**: Update the HTTP Request node with your API URL
2. **Authentication**: Configure credentials in the HTTP Request node:
   - API Key authentication
   - Bearer Token
   - Basic Auth
3. **Headers**: Add required headers (Content-Type, etc.)

### 3. Environment Variables

Create a `.env` file with the following variables:

```env
API_BASE_URL=https://api.example.com
API_KEY=your_api_key_here
RATE_LIMIT_DELAY=1000
```

### 4. Test the Workflow

1. Use the manual trigger to test
2. Check the output in each node
3. Verify error handling with invalid requests

## Customization

### Modify API Endpoint

Update the HTTP Request node:
- Change the URL to your target API
- Adjust HTTP method (GET, POST, PUT, DELETE)
- Modify request headers and parameters

### Data Transformation

The template includes a Function node for data transformation:

```javascript
// Example transformation
const items = $input.all();
return items.map(item => ({
  id: item.json.id,
  name: item.json.name,
  email: item.json.email,
  created_at: new Date(item.json.created_at).toISOString()
}));
```

### Error Handling

The workflow includes error handling for:
- Network timeouts
- HTTP error codes (4xx, 5xx)
- Rate limiting
- Invalid JSON responses

## Usage Examples

### Example 1: Fetch User Data

```json
{
  "endpoint": "/users",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer your_token",
    "Content-Type": "application/json"
  }
}
```

### Example 2: Create New Record

```json
{
  "endpoint": "/users",
  "method": "POST",
  "body": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Troubleshooting

### Common Issues

**Issue**: 401 Unauthorized
- **Solution**: Check API credentials and permissions

**Issue**: Rate limit exceeded
- **Solution**: Increase delay between requests or implement exponential backoff

**Issue**: Timeout errors
- **Solution**: Increase timeout value in HTTP Request node

**Issue**: Invalid JSON response
- **Solution**: Check API endpoint and verify response format

### Debug Mode

Enable debug mode by:
1. Setting `debug` variable to `true`
2. Checking browser console for detailed logs
3. Using the "View" option in each node

## Performance Considerations

- **Rate Limiting**: Respect API rate limits
- **Batch Processing**: Process data in batches for large datasets
- **Caching**: Implement caching for frequently accessed data
- **Error Recovery**: Use exponential backoff for retries

## Security Best Practices

- Store credentials securely using n8n's credential system
- Use environment variables for sensitive data
- Implement proper error handling to avoid exposing sensitive information
- Validate and sanitize all input data

## Support

If you encounter issues:
1. Check the [n8n documentation](https://docs.n8n.io)
2. Review the workflow logs
3. Test with a simple API first
4. Check API documentation for requirements

## Credits

Template created by the N8N Templates community.
Based on common REST API integration patterns.
