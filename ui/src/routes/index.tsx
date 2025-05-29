import {
  createRootRoute,
  createRoute,
  Outlet,
  createRouter,
} from '@tanstack/react-router'
import Login from '../components/Login'
import Parent from '../components/Parent'
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
  component: Login,
})

const parentDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/parentDashboard',
  component: Parent,
})

const routeTree = rootRoute.addChildren([loginRoute, parentDashboardRoute])

export const router = createRouter({
  routeTree,
})
