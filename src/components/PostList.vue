<template>
	<div class="posts" v-if="posts.length > 0">
		<h3>Список постов</h3>
		<transition-group name="post-list">
			<post-item v-for="post in posts" :key="post.id" :post="post" @remove="removePost" />
		</transition-group>
	</div>
	<h2 v-else style="color: red">Список постов пуст</h2>
</template>

<script setup lang="ts">
import PostItem from '@/components/PostItem.vue'
import { type Posts, type Post } from '@/types/app.types.js'

defineProps<{
	posts: Posts
}>()

const emit = defineEmits<{
	(e: 'remove', post: Post): void
}>()

const removePost = (post: Post) => {
	emit('remove', post)
}
</script>

<style scoped>
.post-list-item {
	display: inline-block;
	margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
	transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
	opacity: 0;
	transform: translateX(130px);
}
.post-list-move {
	transition: transform 0.4s ease;
}
</style>
