<template>
	<div class="post">
		<div>
			<div><strong>Номер: </strong>{{ post.id }}</div>
			<div><strong>Название: </strong>{{ post.title }}</div>
			<div><strong>Описание: </strong>{{ post.body }}</div>
		</div>
		<div class="post__btns">
			<my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
			<my-button @click="onRemove">Удалить</my-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { type Post } from '@/types/app.types.js'
import { ref } from 'vue'

const props = defineProps<{
	post: Post
}>()

const post = ref(props.post)

const emit = defineEmits<{
	(e: 'remove', post: Post): void
}>()

const onRemove = () => {
	emit('remove', post.value)
}
</script>

<style scoped>
.post {
	width: 100%;
	padding: 15px;
	border: 2px solid teal;
	margin-top: 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.post__btns {
	display: flex;
}
</style>
