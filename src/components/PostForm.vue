<template>
	<form @submit.prevent>
		<h2>Создание поста</h2>
		<my-input :value="inputData.title" @input="updateTitle" :placeholder="'Название'" />
		<my-input :value="inputData.body" @input="updateDescription" :placeholder="'Описание'" />
		<my-button style="margin-top: 15px" @click="createPost">Создать пост</my-button>
	</form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputData = ref({
	id: 0,
	title: '',
	body: ''
})

const updateTitle = (e: Event) => {
	inputData.value.title = (e.target as HTMLInputElement).value
}

const updateDescription = (e: Event) => {
	inputData.value.body = (e.target as HTMLInputElement).value
}

const emit = defineEmits(['create'])

const createPost = () => {
	inputData.value.id = Date.now()
	const post = { ...inputData.value }

	inputData.value.title = ''
	inputData.value.body = ''

	emit('create', post)
}
</script>

<style scoped>
form {
	display: flex;
	flex-direction: column;
}
</style>
