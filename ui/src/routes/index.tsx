import {
  createRootRoute,
  createRoute,
  Outlet,
  createRouter,
} from '@tanstack/react-router'
import Login from '../components/Login'
import Parent from '../components/Parent'
import RegisterParent from '../components/RegisterParent'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from '../context/userContext'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const queryClient = new QueryClient()

const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Outlet />
        <TanStackRouterDevtools />
      </UserProvider>
    </QueryClientProvider>
  ),
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search: Record<string, unknown>) => ({
    message: (search.message as string) || undefined,
  }),
  component: Login,
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterParent,
})

const parentDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/parentDashboard',
  validateSearch: (search: Record<string, unknown>) => ({
    message: (search.message as string) || undefined,
  }),
  component: Parent,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  parentDashboardRoute,
])

export const router = createRouter({
  routeTree,
})
