<template>
	<div class="dialog" v-if="show" @click="hideDialog">
		<div @click.stop class="dialog__content">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
	name: 'MyDialog'
})

defineProps<{
	show: boolean
}>()

const emit = defineEmits<{
	(e: 'hide'): void
}>()

const hideDialog = () => {
	emit('hide')
}
</script>

<style scoped>
.dialog {
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	display: flex;
}

.dialog__content {
	margin: auto;
	background: white;
	border-radius: 12px;
	min-height: 50px;
	min-width: 400px;
	padding: 15px;
}
</style>
