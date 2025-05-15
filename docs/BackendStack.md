# Backend Stack Documentation

## 1. Project Structure

```
src/
├── app/                    # Application entry and configuration
│   ├── index.ts           # Server entry point
│   └── config.ts          # Environment configuration
├── routes/                # API route definitions and business logic
│   ├── auth/             # Authentication routes
│   │   ├── login.ts      # Login route and logic
│   │   └── register.ts   # Registration route and logic
│   ├── chores/           # Chore management routes
│   │   ├── create.ts     # Create chore route and logic
│   │   └── complete.ts   # Complete chore route and logic
│   └── users/            # User management routes
│       ├── profile.ts    # Profile management route and logic
│       └── settings.ts   # User settings route and logic
├── db/                   # Database related code
│   ├── schema/          # Drizzle schema definitions
│   ├── migrations/      # Database migrations
│   └── seeds/           # Seed data
├── lib/                  # Shared utilities
│   ├── api/             # API utilities and middleware
│   ├── utils/           # Helper functions
│   └── constants/       # Application constants
└── types/               # TypeScript type definitions
```

### 1.1 Folder Intent

#### `app/`

- Server initialization and configuration
- Middleware setup
- Environment variable management
- Error handling setup

#### `routes/`

- API route definitions and handlers
- Business logic implementation
- Request validation
- Response formatting
- Each route file contains both the route handler and its associated business logic
- Keeps related code together for better maintainability

#### `db/`

- Database schema definitions
- Migration management
- Query builders
- Database utilities

#### `lib/`

- Shared utilities and helpers
- Common middleware
- API response formatters
- Error handling utilities

#### `types/`

- TypeScript type definitions
- API request/response types
- Database model types
- Shared interfaces

## 2. API Design

### 2.1 Route Structure

```typescript
// Example route file structure (routes/chores/create.ts)
import { z } from "zod";
import { db } from "@/db";
import { chores } from "@/db/schema";
import { authMiddleware } from "@/lib/api/middleware";

// Request validation schema
const createChoreSchema = z.object({
	title: z.string().min(1),
	amount: z.number().positive(),
	frequency: z.enum(["daily", "weekly"]),
});

// Route handler with business logic
export const createChore = async (req: Request) => {
	// Validate request
	const data = createChoreSchema.parse(await req.json());

	// Business logic
	const chore = await db
		.insert(chores)
		.values({
			title: data.title,
			amount: data.amount,
			frequency: data.frequency,
			userId: req.user.id,
		})
		.returning();

	return { success: true, data: chore };
};

// Route definition with versioning
export const route = {
	method: "POST",
	path: "/api/v1/chores",
	handler: createChore,
	middleware: [authMiddleware],
};
```

### 2.2 API Versioning

All API routes should follow the versioning pattern:

- Base path: `/api/v1/`
- Example endpoints:
  - `/api/v1/auth/login`
  - `/api/v1/chores`
  - `/api/v1/users/profile`

Benefits of versioning:

- Allows for breaking changes in future versions
- Maintains backward compatibility
- Clearer API lifecycle management
- Better documentation organization

### 2.3 Response Format

```typescript
interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: {
		code: string;
		message: string;
	};
	meta?: {
		version: string;
		timestamp: string;
	};
}
```

## 3. Database Design

### 3.1 Schema Definition

```typescript
// Example Drizzle schema
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	email: text("email").notNull().unique(),
	role: text("role").notNull(),
	createdAt: integer("created_at").notNull(),
});
```

### 3.2 Query Patterns

- Use prepared statements
- Implement proper indexing
- Follow database normalization principles
- Use transactions for related operations

## 4. Authentication & Authorization

### 4.1 JWT Implementation

- Secure token generation
- Token validation middleware
- Refresh token rotation
- Role-based access control

### 4.2 Security Measures

- Rate limiting
- CORS configuration
- Input validation
- XSS protection

## 5. Error Handling

### 5.1 Error Types

```typescript
interface AppError extends Error {
	code: string;
	status: number;
	details?: unknown;
}
```

### 5.2 Error Middleware

- Global error handler
- Request validation
- Database error handling
- External service error handling

## 6. Testing Strategy

### 6.1 Unit Testing

- Use Vitest for testing
- Mock external dependencies
- Test business logic in isolation
- Implement proper test coverage

```typescript
import { describe, it, expect, vi } from "vitest";
import { ChoreService } from "./services/chores";

describe("ChoreService", () => {
	it("should create a new chore", async () => {
		const service = new ChoreService(mockDb);
		const result = await service.createChore({
			title: "Clean Room",
			userId: "123",
		});

		expect(result).toMatchObject({
			title: "Clean Room",
			status: "pending",
		});
	});
});
```

### 6.2 Integration Testing

- Test API endpoints
- Database integration tests
- External service integration
- Authentication flows

## 7. Performance Optimization

### 7.1 Caching Strategy

- Implement Redis for caching
- Cache invalidation patterns
- Response caching
- Query result caching

### 7.2 Database Optimization

- Proper indexing
- Query optimization
- Connection pooling
- Batch operations

## 8. Logging & Monitoring

### 8.1 Logging Strategy

- Structured logging
- Log levels
- Error tracking
- Performance monitoring

### 8.2 Monitoring

- Health checks
- Performance metrics
- Error tracking
- Usage analytics

## 9. Documentation

### 9.1 API Documentation & Type Generation

#### OpenAPI/Swagger Integration

```typescript
// Example route with OpenAPI documentation
/**
 * @openapi
 * /api/v1/chores:
 *   post:
 *     tags:
 *       - Chores
 *     summary: Create a new chore
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly]
 *     responses:
 *       200:
 *         description: Chore created successfully
 */
export const createChore = async (req: Request) => {
	// ... implementation
};
```

#### Type Generation

- Use `openapi-typescript` to generate TypeScript types from OpenAPI spec
- Types are generated into the frontend project at `frontend/src/types/api.ts`
- Types are automatically generated during backend build
- Ensures type safety across the stack

```bash
# Generate types from OpenAPI spec into frontend project
openapi-typescript swagger.json --output ../frontend/src/types/api.ts
```

#### Frontend Client Generation

- Use `openapi-fetch` for type-safe API client generation
  - Better TypeScript integration than Axios
  - Automatic type inference from OpenAPI spec
  - Smaller bundle size
  - Built-in type safety for request/response
  - No need for manual type definitions

```typescript
// Example generated client usage in frontend
import { createApi } from "openapi-fetch";
import type { paths } from "@/types/api";

const api = createApi<paths>({
	baseUrl: "/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

// Type-safe API calls with full type inference
const { data, error } = await api.POST("/chores", {
	body: {
		title: "Clean Room",
		amount: 5,
		frequency: "daily",
	},
});
```

### 9.2 Documentation Requirements

#### API Documentation

- All routes must have OpenAPI documentation
- Include request/response examples
- Document all possible error responses
- Keep documentation in sync with implementation

#### Type Safety

- All API responses must be fully typed
- Use generated types in both frontend and backend
- Maintain backward compatibility in types
- Document breaking changes

#### Client Generation

- Automatically generate API client during build
- Include proper error handling
- Support for authentication
- Type-safe request/response handling

### 9.3 Code Documentation

- JSDoc comments
- Architecture decisions
- Setup instructions
- Deployment procedures
