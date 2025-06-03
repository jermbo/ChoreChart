import {
  createRootRoute,
  createRoute,
  Outlet,
  createRouter,
} from '@tanstack/react-router'
import Login from '../components/Authorization/Login'
import ParentDashboard from '../components/Dashboard/ParentDashboard'
import RegisterParent from '../components/Authorization/RegisterParent'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from '../context/userContext'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ChildManagement } from '../components/ChildManagement/ChildManagement'
import { ChoreManagement } from '../components/ChoreManagement/ChoreManagement'
import ChildDashboard from '../components/Dashboard/ChildDashboard'

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
  component: ParentDashboard,
})

const childDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/childDashboard',
  component: ChildDashboard,
})

const childRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/childManagement',
  validateSearch: (search: Record<string, unknown>) => ({
    message: (search.message as string) || undefined,
  }),
  component: ChildManagement,
})

const choreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/choreManagement',
  validateSearch: (search: Record<string, unknown>) => ({
    message: (search.message as string) || undefined,
  }),
  component: ChoreManagement,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  parentDashboardRoute,
  childDashboardRoute,
  childRoute,
  choreRoute,
])

export const router = createRouter({
  routeTree,
})
