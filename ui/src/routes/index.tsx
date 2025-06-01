import {
  createRootRoute,
  createRoute,
  Outlet,
  createRouter,
} from '@tanstack/react-router'
import Login from '../components/Authorization/Login'
import Parent from '../components/ParentDashboard/Parent'
import RegisterParent from '../components/Authorization/RegisterParent'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from '../context/userContext'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ChildManagement } from '../components/ChildManagement/ChildManagement'

const queryClient = new QueryClient()

const rootRoute = createRootRoute({
  component: () => (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </UserProvider>
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

const childRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/childManagement',
  component: ChildManagement,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  parentDashboardRoute,
  childRoute,
])

export const router = createRouter({
  routeTree,
})
