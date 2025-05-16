# Chore Chart App

## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [Parent Features](#parent-features)
  - [Child Features](#child-features)
  - [Reward System](#reward-system)
- [Technical Requirements](#technical-requirements)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Authentication](#authentication)
  - [Future Features](#future-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Development Environment Setup](#development-environment-setup)
- [Git Workflow](#git-workflow)
  - [Branch Naming Convention](#branch-naming-convention)
  - [Commit Strategy](#commit-strategy)
  - [Commit Message Convention](#commit-message-convention)
- [Project Documentation](#project-documentation)
- [Acknowledgments](#acknowledgments)

### Overview [↑](#table-of-contents)

The Chore Chart app is an innovative solution designed to help parents manage their children's allowance money by assigning daily/weekly chores, tracking completion status, and rewarding good behavior. This application aims to create a fun and engaging way for kids to earn their allowance while promoting responsibility and learning valuable life skills.

## Features

### Parent Features [↑](#table-of-contents)

- Create an account with unique login credentials
- Add children's profiles with customizable names and avatars
- Assign daily/weekly chores with corresponding dollar amounts
  - Choose from a pre-defined list of tasks or create custom ones
  - Set the frequency (daily, weekly) and duration for each chore
- Track progress: view completed tasks, earned allowance money, and child performance

### Child Features [↑](#table-of-contents)

- Log in to their account using their unique username and password
- View assigned chores with corresponding dollar amounts
  - Sort by task type (e.g., household, academic)
  - Filter by frequency (daily, weekly) or duration
- Mark completed tasks: earn allowance money for each finished chore
  - Track progress towards the base allowance amount

### Reward System [↑](#table-of-contents)

- Earn extra money for completing tasks above and beyond the minimum requirements
- Visual representation of earned allowance money (e.g., a virtual piggy bank)

## Technical Requirements

### Frontend [↑](#table-of-contents)

- Built using React 19 with TanStack Query for data fetching and manipulation
  - Utilize TanStack Router for client-side routing
  - Integrate ShadCN/Origin/Tailwind CSS for a consistent design aesthetic across the application
- Dockerized containerization ensures portability and seamless deployment

### Backend [↑](#table-of-contents)

- Built using Node.js (newish) with Express/Hono (newish)
  - RESTful API architecture for efficient data exchange between client-side and server-side components
  - Drizzle ORM with PostgreSQL for robust data persistence and scalability

## Authentication [↑](#table-of-contents)

- Optional integration of JWT auth to secure user accounts and prevent unauthorized access

### Future Features [↑](#table-of-contents)

---

- Push notifications: parents receive updates when children complete or miss assignments
  - Out-of-scope for MVP, but planned for future development
- Multi-level chore hierarchy: ability to create sub-chores and categorize tasks
  - Planned for future development to enhance the application's functionality

## Getting Started [↑](#table-of-contents)

### Prerequisites [↑](#table-of-contents)

Before you begin, ensure you have the following installed:

- Node.js (v20.x or newer)
- Docker Desktop (latest stable version)
- PostgreSQL (v15 or newer)
- npm (v10.x or newer) - Our preferred package manager
- Git (v2.x or newer)
- VSCode (recommended) with the following extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense

### Development Environment Setup [↑](#table-of-contents)

1. Clone the repository:

   ```bash
   git clone https://github.com/jermbo/ChoreChart.git
   cd ChoreChart
   ```

2. Install dependencies:

   ```bash
    cd server && npm install
    cd ui && npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your local configuration.

4. Start the development environment:

   ```bash
   # Start PostgreSQL and other services
   docker compose up --build -d
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - API: http://localhost:4000

### Git Workflow [↑](#table-of-contents)

We follow a trunk-based development workflow with the following guidelines:

1. Branch Naming Convention:

   - Feature branches: `feature/description-of-feature`
   - Bug fixes: `bug/description-of-bug`
   - Documentation: `docs/description-of-changes`

2. Commit Strategy:

   - Use conventional commit messages (see below)
   - Squash commits when merging feature/bug branches
   - Keep main branch clean and deployable at all times

3. Pull Request Process:
   - Create a PR from your feature branch to main
   - Ensure all tests pass
   - Get at least one code review approval
   - Squash and merge when ready

### Commit Message Convention [↑](#table-of-contents)

Format: `<type>: <description>`

Types:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style/formatting changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding/updating tests
- `chore:` - Maintenance tasks

Examples:

```
feat: add user authentication flow
fix: resolve infinite loading issue in dashboard
docs: update API documentation
```

### Project Documentation [↑](#table-of-contents)

For detailed information about the project, please refer to our comprehensive documentation:

#### Getting Started [↑](#table-of-contents)

- [Development Setup](./docs/DevelopmentSetup.md) - Complete setup guide for new developers
- [Code Style Guide](./docs/CodeStyleGuide.md) - Coding standards and best practices

#### Architecture & Design [↑](#table-of-contents)

- [App Architecture](./docs/AppArchitecture.md) - System design and technical decisions
- [Database Schema](./docs/DatabaseSchema.md) - Database structure and relationships
- [Authentication](./docs/Authentication.md) - Authentication flow and implementation
- [RBAC](./docs/RBAC.md) - Role-Based Access Control system

#### Technical Stack [↑](#table-of-contents)

- [Frontend Stack](./docs/FrontendStack.md) - Frontend technologies and implementation details
- [Backend Stack](./docs/BackendStack.md) - Backend technologies and implementation details
- [API Documentation](./docs/API.md) - Complete API endpoints and usage

#### Product [↑](#table-of-contents)

- [Product Requirements](./docs/PRD.md) - Product requirements and specifications
- [User Flow](./docs/UserFlow.md) - User journey and interaction flows

For a complete overview of all documentation, see our [Documentation Index](./docs/INDEX.md).

## Acknowledgments [↑](#table-of-contents)

We appreciate any contributions, feedback, or suggestions that can help improve this application!
