<template>
	<nav>
		<ul>
			<li>
				<router-link :to="{ name: 'home' }">Home</router-link>
			</li>
			<li>
				<router-link :to="{ name: 'manage' }">Manage</router-link>
			</li>
			<li>
				<router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>
