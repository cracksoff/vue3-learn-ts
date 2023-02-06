<template>
	<div>
		<h1>Страница с постами</h1>
		<my-input :placeholder="'Поиск'" :value="searchQuery" @input="updateSearchQuery" />
		<div class="app__btns">
			<my-button @click="show = true">Создать пост</my-button>
			<my-select :options="sortOptions" @change="selectedSort = $event" />
		</div>
		<my-dialog :show="show" @hide="show = false">
			<post-form @create="createPost" />
		</my-dialog>
		<h2 v-if="onLoading">Загрузка...</h2>
		<post-list v-else :posts="sortedAndSearchedPosts" @remove="removePost" />
		<!-- <page-wrapper :totalPages="totalPages" :page="page" @change="changePage"></page-wrapper> -->
		<div v-intersection="loadMorePosts" class="observer"></div>
	</div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { onMounted, ref, computed, watch } from 'vue'
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import { type Post, type Posts, type Options } from '@/types/app.types.js'

const posts = ref<Posts>([])
const onLoading = ref(false)
const show = ref(false)
const selectedSort = ref('')
const searchQuery = ref('')
const sortOptions = ref<Options>([
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
])
const page = ref(1)
const limit = ref(10)
const totalPages = ref(0)

const createPost = (post: Post) => {
	sortedPosts.value.push(post)

	show.value = false
}

const removePost = (post: Post) => {
	posts.value = posts.value.filter((p) => p.id !== post.id)
}

const updateSearchQuery = (e: Event) => {
	searchQuery.value = (e.target as HTMLInputElement).value
}

// const changePage = (pageNumber: number) => {
// 	page.value = pageNumber
// }

const sortedPosts = computed<Posts>(() => {
	if (selectedSort.value) {
		console.log(selectedSort.value)

		return [...posts.value].sort((a: Post, b: Post) => (a[selectedSort.value as keyof Post] > b[selectedSort.value as keyof Post] ? 1 : -1))
	}

	return posts.value
})

const sortedAndSearchedPosts = computed<Posts>(() => {
	return sortedPosts.value.filter((post) => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const fetchRequest = async () => {
	const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
		params: {
			_page: page.value,
			_limit: limit.value
		}
	})
	return response
}

const fetchPosts = onMounted(async () => {
	onLoading.value = true
	const response = await fetchRequest()
	totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value)

	posts.value = response.data
	onLoading.value = false
})

const loadMorePosts = async () => {
	page.value++
	const response = await fetchRequest()
	totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value)

	posts.value = [...posts.value, ...response.data]
}

// watch([page], () => {
// 	if (fetchPosts) fetchPosts()
// })
</script>

<style>
.app__btns {
	margin: 15px 0;
	display: flex;
	justify-content: space-between;
}
.observer {
	height: 30px;
	background-color: green;
}
</style>
