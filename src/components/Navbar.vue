<template>
	<div class="navbar">
		<div @click="$router.push('/')">Vue 3</div>
		<div class="navbar__btns">
			<my-button @click="$router.push('/posts')" style="margin-left: 20px">Посты</my-button>
			<my-button @click="$router.push('/about')" style="margin-left: 20px">О Сайте</my-button>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.navbar {
	height: 50px;
	background-color: lightgray;
	box-shadow: 2px 2px 4px gray;
	display: flex;
	align-items: center;
	padding: 0 15px;
}
.navbar__btns {
	margin-left: auto;
}
</style>
