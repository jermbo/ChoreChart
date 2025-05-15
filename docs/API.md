# API Documentation

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

All API endpoints require authentication using JWT tokens.

### Headers

```
Authorization: Bearer <token>
Content-Type: application/json
```

## Rate Limiting

- 100 requests per minute per IP
- Rate limit headers included in response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## Error Handling

### Error Response Format

```json
{
	"error": {
		"code": "ERROR_CODE",
		"message": "Human readable error message",
		"details": {} // Optional additional error details
	}
}
```

### Common Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Endpoints

### Authentication

#### POST /auth/register

Register a new parent account.

**Request Body:**

```json
{
	"email": "string",
	"password": "string",
	"firstName": "string",
	"lastName": "string"
}
```

**Response:**

```json
{
	"user": {
		"id": "string",
		"email": "string",
		"firstName": "string",
		"lastName": "string",
		"role": "PARENT"
	},
	"token": "string"
}
```

#### POST /auth/login

Login to existing account.

**Request Body:**

```json
{
	"email": "string",
	"password": "string"
}
```

**Response:**

```json
{
	"user": {
		"id": "string",
		"email": "string",
		"firstName": "string",
		"lastName": "string",
		"role": "string"
	},
	"token": "string"
}
```

### Children

#### GET /children

Get all children for authenticated parent.

**Response:**

```json
{
	"children": [
		{
			"id": "string",
			"firstName": "string",
			"lastName": "string",
			"allowance": "number",
			"avatar": "string"
		}
	]
}
```

#### POST /children

Create a new child account.

**Request Body:**

```json
{
	"firstName": "string",
	"lastName": "string",
	"allowance": "number",
	"avatar": "string"
}
```

**Response:**

```json
{
	"id": "string",
	"firstName": "string",
	"lastName": "string",
	"allowance": "number",
	"avatar": "string"
}
```

### Chores

#### GET /chores

Get all chores for a child.

**Query Parameters:**

- `childId` (required): string
- `status` (optional): "PENDING" | "COMPLETED" | "VERIFIED"

**Response:**

```json
{
	"chores": [
		{
			"id": "string",
			"title": "string",
			"description": "string",
			"value": "number",
			"dueDate": "string",
			"status": "string",
			"childId": "string"
		}
	]
}
```

#### POST /chores

Create a new chore.

**Request Body:**

```json
{
	"title": "string",
	"description": "string",
	"value": "number",
	"dueDate": "string",
	"childId": "string"
}
```

**Response:**

```json
{
	"id": "string",
	"title": "string",
	"description": "string",
	"value": "number",
	"dueDate": "string",
	"status": "PENDING",
	"childId": "string"
}
```

#### PATCH /chores/:id

Update chore status.

**Request Body:**

```json
{
  "status": "COMPLETED" | "VERIFIED"
}
```

**Response:**

```json
{
	"id": "string",
	"title": "string",
	"description": "string",
	"value": "number",
	"dueDate": "string",
	"status": "string",
	"childId": "string"
}
```

### Allowance

#### GET /allowance/:childId

Get allowance history for a child.

**Query Parameters:**

- `startDate` (optional): string
- `endDate` (optional): string

**Response:**

```json
{
  "history": [
    {
      "id": "string",
      "amount": "number",
      "date": "string",
      "type": "EARNED" | "PAID",
      "description": "string"
    }
  ],
  "total": "number"
}
```

#### POST /allowance/:childId/pay

Record an allowance payment.

**Request Body:**

```json
{
	"amount": "number",
	"description": "string"
}
```

**Response:**

```json
{
	"id": "string",
	"amount": "number",
	"date": "string",
	"type": "PAID",
	"description": "string"
}
```

## Webhooks (Future Feature)

> **Note:** Webhook functionality is planned for a future release. The following documentation outlines the planned implementation.

### Planned Events

- `chore.completed`
- `chore.verified`
- `allowance.paid`
- `child.created`

### Planned Webhook Payload Format

```json
{
	"event": "string",
	"timestamp": "string",
	"data": {}
}
```

### Webhook Configuration

Webhook configuration will be available in a future release. This will include:

- API credentials management
- Webhook endpoint configuration
- Event subscription management
- Payload customization
- Retry policies
- Security measures

## API Versioning

- Current version: v1
- Version specified in URL path
- Breaking changes will increment major version
- Minor changes will be backward compatible

## Best Practices

1. Always include authentication token
2. Handle rate limiting
3. Implement proper error handling
4. Use appropriate HTTP methods
5. Follow RESTful conventions
6. Validate request/response data
7. Implement proper logging
8. Use HTTPS in production
