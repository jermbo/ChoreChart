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
  "lastName": "string",
  "role": "PARENT"
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
    "role": "PARENT",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "token": "string"
}
```

**Notes:**

- Registration is only available for parents
- `role` field must be set to "PARENT"
- Children accounts can only be created by parents through the parent dashboard
- Children can then login using their credentials

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
    "role": "PARENT" | "CHILD",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "token": "string"
}
```

**Notes:**

- Login is available for both parents and children
- The `role` in the response indicates whether the user is a parent or child
- Frontend should redirect to appropriate dashboard based on the role

### Children

#### GET /children

Get all children for authenticated parent.

**Response:**

```json
{
  "children": [
    {
      "id": "string",
      "userId": "string",
      "parentId": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "baseAllowance": "number",
      "avatarUrl": "string",
      "role": "CHILD",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### POST /children

Create a new child account.

**Request Body:**

```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "baseAllowance": "number",
  "avatarUrl": "string"
}
```

**Response:**

```json
{
  "id": "string",
  "userId": "string",
  "parentId": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "baseAllowance": "number",
  "avatarUrl": "string",
  "role": "CHILD",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Chores

#### GET /chores

Get all chores for a child.

**Query Parameters:**

- `childId` (required): string
- `status` (optional): "PENDING" | "COMPLETED" | "VERIFIED" | "REJECTED"

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
      "childrenId": ["string"],
      "createdAt": "string",
      "updatedAt": "string"
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
  "childrenId": ["string"]
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
  "childrenId": ["string"],
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### PATCH /chores/:id

Update chore status.

**Request Body:**

```json
{
  "status": "COMPLETED" | "VERIFIED" | "REJECTED",
  "feedback": "string"
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
  "childrenId": ["string"],
  "createdAt": "string",
  "updatedAt": "string"
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
      "childId": "string",
      "amount": "number",
      "type": "EARNED | PAID",
      "description": "string",
      "transactionDate": "string",
      "createdAt": "string",
      "updatedAt": "string"
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
  "childId": "string",
  "amount": "number",
  "type": "string",
  "description": "string",
  "transactionDate": "string",
  "createdAt": "string",
  "updatedAt": "string"
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
