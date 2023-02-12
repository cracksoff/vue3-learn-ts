<template>
	<div>
		<h1>Страница с постами</h1>
		<!-- <my-input v-focus :placeholder="'Поиск'" :value="searchQuery" @input="updateSearchQuery" /> -->
		<div class="app__btns">
			<my-button @click="show = true">Создать пост</my-button>
			<!-- <my-select :options="sortOptions" @change="selectedSort = $event" /> -->
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
import { useStore } from 'vuex'

const show = ref(false)

const store = useStore()

const posts = computed(() => store.state.posts)
const onLoading = computed(() => store.state.onLoading)

const sortedAndSearchedPosts = computed(() => {
	return store.getters.sortedAndSearchedPosts()
})

const loadMorePosts = () => {
	store.dispatch('loadMorePosts')
}

const createPost = (post: Post) => {
	store.commit('setPosts', [...store.getters.sortedPosts, post])

	show.value = false
}

const removePost = (post: Post) => {
	return store.commit(
		'setPosts',
		posts.value.filter((p: { id: number }) => p.id !== post.id)
	)
}

const updateQuery = (e: Event) => {
	store.commit('setSearchQuery', (e.target as HTMLInputElement).value)
}
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
