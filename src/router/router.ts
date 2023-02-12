import Main from '@/pages/Main.vue'
import PostPageWithStore from '@/pages/PostPageWithStore.vue'
import About from '@/pages/About.vue'
import PostIdPage from '@/pages/PostIdPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		component: Main
	},
	// {
	// 	path: '/posts',
	// 	component: UserPage
	// },
	{
		path: '/about',
		component: About
	},
	{
		path: '/posts/:id',
		component: PostIdPage
	},
	{
		path: '/store',
		component: PostPageWithStore
	}
]

const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL)
})

export default router
