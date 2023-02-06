<template>
	<select class="select" @change="changeOption">
		<option disabled value="" selected>Сортировка</option>
		<option v-for="option in options" :key="option.value" :value="option.value">{{ option.title }}</option>
	</select>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { type Options } from '@/types/app.types.js'

defineComponent({
	name: 'MySelect'
})

defineProps<{
	options: Options
}>()

const emit = defineEmits<{
	(e: 'change', newValue: string): void
}>()

const changeOption = (event: Event) => {
	const newValue = (event.target as HTMLSelectElement).value

	emit('change', newValue)
}
</script>

<style scoped>
.select {
	align-self: flex-end;
	padding: 10px 15px;
	background: none;
	color: teal;
	border: 1px solid teal;
}
</style>
