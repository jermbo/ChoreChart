<template>
	<div>
		<h1>Manage</h1>
		<AddNewUser @addUser="addUser" />
		<!-- display users in system -->
		<ul>
			<li v-for="user in users" :key="user.id">
				{{ user.name }} <button @click.prevent="deleteUser(user.id)">x</button>
			</li>

			<!-- show message if no users are in system -->
			<li v-if="users.length === 0">No users in system</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import AddNewUser from "../components/AddNewUser.vue";
import { User } from "../interfaces";

// load users from local storage in type safe array
const users = ref<User[]>(JSON.parse(localStorage.getItem("users") || "[]"));

// create watch that updates local storage every time a user is added or deleted
watch(users, () => {
	localStorage.setItem("users", JSON.stringify(users.value));
});

// create addUser function that creates new User with a unique guid and random hex color
const addUser = (name: string) => {
	const newUser: User = {
		id: Math.random().toString(36).substr(2, 9),
		name: name,
		color: "#" + Math.floor(Math.random() * 16777215).toString(16),
	};

	// add new user to users array
	users.value.push(newUser);

	// save users array to local storage
	localStorage.setItem("users", JSON.stringify(users.value));
};

// create deleteUser function that removes users from list
const deleteUser = (id: string) => {
	// filter users array to remove user with id
	users.value = users.value.filter((user) => user.id !== id);

	// save users array to local storage
	localStorage.setItem("users", JSON.stringify(users.value));
};
</script>

<style scoped></style>
