# Frontend Stack Documentation

## 1. Project Structure

```
src/
├── app/                    # TanStack Router route definitions and layouts
│   ├── (auth)/            # Authentication routes (grouped)
│   ├── (dashboard)/       # Dashboard routes (grouped)
│   └── _layout.tsx        # Root layout with providers
├── components/            # Reusable components
│   ├── ui/               # Basic UI components (buttons, inputs, etc.)
│   ├── features/         # Feature-specific components (chores, allowance, etc.)
│   └── layouts/          # Layout components (header, sidebar, etc.)
├── hooks/                # Custom React hooks for shared logic
├── lib/                  # Core utilities and configurations
│   ├── api/             # API client and endpoint definitions
│   ├── utils/           # Helper functions and utilities
│   └── constants/       # Application-wide constants
├── styles/              # Global styles and theme configuration
└── types/               # TypeScript type definitions and schemas
```

### 1.1 Folder Intent

#### `app/`

- Houses all route definitions following TanStack Router conventions
- Groups related routes using folder structure (e.g., `(auth)`, `(dashboard)`)
- Contains route-specific layouts and loaders
- Manages route-level data fetching and mutations

#### `components/`

- `ui/`: Reusable, presentational components with no business logic
- `features/`: Business logic components specific to features
- `layouts/`: Structural components that define page layouts

#### `hooks/`

- Custom hooks that encapsulate reusable logic
- Shared state management and side effects
- Data fetching and caching logic

#### `lib/`

- Core utilities and configurations
- API client setup and endpoint definitions
- Helper functions and constants
- Environment-specific configurations

#### `styles/`

- Global styles and Tailwind configuration
- Theme definitions and custom properties
- Animation and transition utilities

#### `types/`

- TypeScript type definitions
- API response types
- Shared interfaces and type utilities

## 2. Component Guidelines

### 2.1 Component Structure

```typescript
// Example component structure
interface Props {
	title: string;
	isActive?: boolean;
}

const ComponentName = ({ title, isActive = false }: Props): JSX.Element => {
	// Hooks
	const [state, setState] = useState<StateType>(initialState);

	// Derived state
	const derivedValue = useMemo(() => {
		return computeValue(state);
	}, [state]);

	// Event handlers
	const handleClick = useCallback(
		() => {
			// Handler logic
		},
		[
			/* dependencies */
		]
	);

	// Render
	return <div className="component-class">{/* Component content */}</div>;
};

export default ComponentName;
```

### 2.2 Naming Conventions

- **Files**: PascalCase for components, kebab-case for utilities
  - `Button.tsx`, `use-auth.ts`
- **Components**: PascalCase
  - `ChoreCard`, `AllowanceTracker`
- **Hooks**: camelCase with 'use' prefix
  - `useAuth`, `useChoreStatus`
- **Types/Interfaces**: PascalCase
  - `ChoreStatus`, `UserProfile`

## 3. State Management

### 3.1 Local State

- Use `useState` for component-level state
- Keep state as flat as possible
- Split complex state into multiple `useState` calls
- Implement proper cleanup in `useEffect`

### 3.2 Global State

- Use React Context for theme, auth, and user preferences
- Implement proper context splitting for performance
- Use custom hooks to abstract context usage
- Consider TanStack Query for server state management

## 4. Styling Guidelines

### 4.1 Tailwind CSS Usage

```typescript
// Good
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
  <h2 className="text-lg font-semibold text-gray-900">Title</h2>
</div>

// Bad - Avoid inline styles
<div style={{ display: 'flex', padding: '1rem' }}>
  <h2 style={{ fontSize: '1.125rem' }}>Title</h2>
</div>
```

### 4.2 CSS Custom Properties

```css
:root {
	/* Base values */
	--color-primary: #3b82f6;
	--color-secondary: #64748b;

	/* Semantic usage */
	--text-color-primary: var(--color-primary);
	--text-color-secondary: var(--color-secondary);
}
```

## 5. Performance Optimization

### 5.1 Code Splitting

- Use dynamic imports for route-based splitting
- Implement proper loading states
- Lazy load non-critical components

### 5.2 Memoization

- Use `useMemo` for expensive computations
- Use `useCallback` for event handlers
- Implement `React.memo` for pure components

## 6. TypeScript Best Practices

### 6.1 Type Definitions

```typescript
// Use interfaces for object types
interface User {
	id: string;
	name: string;
	role: UserRole;
}

// Use type for unions and intersections
type UserRole = "parent" | "child";

// Use const assertions for literal types
const CHORE_STATUS = {
	PENDING: "pending",
	COMPLETED: "completed",
	VERIFIED: "verified",
} as const;
```

### 6.2 Strict Type Checking

- Enable strict mode in `tsconfig.json`
- Use proper type guards
- Avoid type assertions unless necessary

## 7. Testing Strategy

### 7.1 Component Testing

- Use Vitest with React Testing Library
- Test user interactions and component behavior
- Mock external dependencies using `vi.mock()`
- Use `@testing-library/user-event` for user interactions
- Implement proper test isolation

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChoreCard } from "./ChoreCard";

describe("ChoreCard", () => {
	it("should handle chore completion", async () => {
		const user = userEvent.setup();
		render(<ChoreCard id="1" title="Clean Room" />);

		await user.click(screen.getByRole("button", { name: /complete/i }));
		expect(screen.getByText(/completed/i)).toBeInTheDocument();
	});
});
```

### 7.2 Integration Testing

- Test component integration and data flow
- Use Vitest's built-in mocking capabilities
- Test error scenarios and edge cases
- Implement proper test cleanup

### 7.3 Test Organization

- Group tests by feature or component
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Keep tests focused and isolated

## 8. Error Handling

### 8.1 Error Boundaries

- Implement error boundaries for component-level errors
- Provide fallback UI
- Log errors appropriately

### 8.2 Form Validation

- Use form libraries (React Hook Form)
- Implement proper error messages
- Handle async validation

## 9. Accessibility

### 9.1 ARIA Implementation

- Use semantic HTML
- Implement proper ARIA attributes
- Test with screen readers

### 9.2 Keyboard Navigation

- Ensure proper focus management
- Implement keyboard shortcuts
- Test tab order

## 10. Documentation

### 10.1 Component Documentation

- Use JSDoc comments
- Document props and types
- Include usage examples

### 10.2 Code Comments

- Comment complex logic
- Document business rules
- Explain non-obvious decisions
