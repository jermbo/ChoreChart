# Development Environment Setup

## Required Tools

### Core Requirements

- Node.js (v22.x LTS)
- npm (v10.x)
- Git (v2.x)
- Docker (v24.x)
- Docker Compose (v2.x)

### IDE Requirements

- VS Code (recommended)
  - Extensions:
    - ESLint
    - Prettier
    - Tailwind CSS IntelliSense
    - TypeScript Vue Plugin (Volar)
    - GitLens
    - Error Lens

## Environment Configuration

### 1. Clone Repository

```bash
git clone https://github.com/your-org/chore-chart.git
cd chore-chart
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create the following files in the project root:

- `.env.development`
- `.env.test`
- `.env.production`

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/chorechart"

# Authentication
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# API
API_PORT=3000
API_HOST=localhost

# Frontend
VITE_API_URL="http://localhost:3000"
```

## Local Development Workflow

### 1. Start Development Server

```bash
# Start all services
npm run dev

# Start specific services
npm run dev:frontend
npm run dev:backend
npm run dev:db
```

### 2. Database Setup

```bash
# Run migrations
npm run db:migrate

# Seed database
npm run db:seed
```

### 3. Testing

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:e2e
npm run test:integration
```

## Code Formatting and Linting

### ESLint Configuration

```json
{
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended"
	],
	"rules": {
		// Project-specific rules
	}
}
```

### Prettier Configuration

```json
{
	"semi": true,
	"singleQuote": true,
	"tabWidth": 2,
	"trailingComma": "es5",
	"printWidth": 100
}
```

## Common Development Tasks

### 1. Creating a New Feature

```bash
# Create feature branch
git checkout -b feat/feature-name

# Install new dependencies
npm install package-name

# Run tests
npm test

# Commit changes
git commit -m "feat: add new feature"
```

### 2. Database Changes

```bash
# Create new migration
npm run db:migrate:create

# Apply migrations
npm run db:migrate

# Rollback migration
npm run db:migrate:rollback
```

### 3. API Development

```bash
# Start API server
npm run dev:backend

# Test API endpoints
npm run test:api
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**

   - Check if PostgreSQL is running
   - Verify DATABASE_URL in .env
   - Ensure database exists

2. **Dependency Issues**

   - Clear npm cache: `npm cache clean --force`
   - Remove node_modules: `rm -rf node_modules`
   - Reinstall: `npm install`

3. **Port Conflicts**
   - Check if ports 3000, 5432 are available
   - Update ports in .env if needed

## Performance Optimization

### Development Mode

- Use `npm run dev` for development
- Hot module replacement enabled
- Source maps for debugging

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Additional Resources

- [Project README](../README.md)
- [API Documentation](./API.md)
- [Database Schema](./DatabaseSchema.md)
- [Testing Strategy](./TestingStrategy.md)
