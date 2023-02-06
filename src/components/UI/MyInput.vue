<template>
	<input type="text" :placeholder="placeholder" class="input" />
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
	name: 'MyInput'
})

defineProps<{
	placeholder: string
}>()
</script>

<style scoped>
.input {
	width: 100%;
	border: 1px solid teal;
	padding: 10px 15px;
	margin-top: 15px;
}
</style>
