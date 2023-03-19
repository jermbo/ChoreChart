// define vue route with proper type safety
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "home",
		component: () => import(/* webpackChunkName: "home" */ "./pages/Home.vue"),
	},
	{
		path: "/manage",
		name: "manage",
		component: () => import(/* webpackChunkName: "manage" */ "./pages/Manage.vue"),
	},
	{
		path: "/dashboard",
		name: "dashboard",
		component: () => import(/* webpackChunkName: "dashboard" */ "./pages/Dashboard.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
