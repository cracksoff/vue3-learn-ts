<template>
	<navbar />
	<div class="app">
		<router-view />
	</div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.app {
	padding: 20px;
}
</style>
