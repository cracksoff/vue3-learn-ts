<template>
	<button class="btn">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
	name: 'MyButton'
})
</script>

<style scoped>
.btn {
	align-self: flex-end;
	padding: 10px 15px;
	background: none;
	color: teal;
	border: 1px solid teal;
}
</style>
