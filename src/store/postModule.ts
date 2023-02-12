import type { Options, Post, Posts } from '@/types/app.types'
import axios from 'axios'

export interface State {
	posts: Posts
	onLoading: boolean
	selectedSort: string
	searchQuery: string
	sortOptions: Options
	page: number
	limit: number
	totalPages: number
}

export interface Getters {
	sortedPosts: (state: State) => Posts
	sortedAndSearchedPosts: (state: State, getters: Getters) => Posts
	fetchRequest: (state: State) => Promise<any>
}

export const postModule = {
	state: () => ({
		posts: [],
		onLoading: false,
		selectedSort: '',
		searchQuery: '',
		sortOptions: [
			{
				value: 'id',
				title: 'По id'
			},
			{
				value: 'title',
				title: 'По названию'
			},
			{
				value: 'body',
				title: 'По описанию'
			}
		],
		page: 1,
		limit: 10,
		totalPages: 0
	}),
	getters: {
		sortedPosts(state: State) {
			if (state.selectedSort) {
				return [...state.posts].sort((a: Post, b: Post) => (a[state.selectedSort as keyof Post] > b[state.selectedSort as keyof Post] ? 1 : -1))
			}
			return state.posts
		},
		sortedAndSearchedPosts(state: State, getters: Getters) {
			const posts = getters.sortedPosts(state)

			return posts.filter((post: Post) => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
		},
		async fetchRequest({ state }: { commit: any; state: State }) {
			const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
				params: {
					_page: state.page,
					_limit: state.limit
				}
			})
			return response
		}
	},
	mutations: {
		setPosts(state: State, posts: Posts) {
			state.posts = posts
		},
		setLoading(state: State, onLoading: boolean) {
			state.onLoading = onLoading
		},
		setSelectedSort(state: State, selectedSort: string) {
			state.selectedSort = selectedSort
		},
		setSearchQuery(state: State, searchQuery: string) {
			state.searchQuery = searchQuery
		},
		setPage(state: State, page: number) {
			state.page = page
		},
		setTotalPages(state: State, totalPages: number) {
			state.totalPages = totalPages
		}
	},
	actions: {
		async fetchPosts({ commit, state }: { commit: any; state: State }, getters: Getters) {
			try {
				commit('setLoading', true)
				const response = await getters.fetchRequest(state)
				commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))

				commit('setPosts', response.data)
			} catch (err) {
				console.log(err)
			} finally {
				commit('setLoading', false)
			}
		},
		async loadMorePosts({ commit, state }: { commit: any; state: State }, getters: Getters) {
			commit('setPage', state.page + 1)
			const response = await getters.fetchRequest(state)
			commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))

			commit('setPosts', [...state.posts, ...response.data])
		}
	},
	namespaced: true
}
