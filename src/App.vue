<script setup lang="ts">
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
	<Nav />
	<main>
		<router-view></router-view>
	</main>
	<Footer />
</template>

<style scoped></style>
