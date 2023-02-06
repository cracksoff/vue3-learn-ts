<template>
	<div class="page__wrapper">
		<div @click="changePage" class="page" :class="{ 'current-page': page === pageNumber }" v-for="pageNumber in totalPages" :key="pageNumber">{{ pageNumber }}</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
	name: 'PageWrapper'
})

defineProps<{
	page: number
	totalPages: number
}>()

const emit = defineEmits<{
	(e: 'change', pageNumber: number): void
}>()

const changePage = (e: MouseEvent) => {
	const pageNumber = Number((e.target as HTMLDivElement).textContent)
	console.log(pageNumber)

	emit('change', pageNumber)
}
</script>

<style scoped>
.page__wrapper {
	display: flex;
	margin-top: 15px;
}
.page {
	border: 1px solid black;
	padding: 10px;
}
.current-page {
	border: 2px solid teal;
	padding: 10px;
}
</style>
