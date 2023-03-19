<template>
	<div>
		<p>Add new user {{ username }}</p>
		<!-- bind a form with username for input and prevent default submit -->
		<form @submit.prevent="triggerAddUser">
			<!-- bind input to username state -->
			<input type="text" v-model="username" />
			<!-- bind button to triggerAddUser function -->
			<button type="submit">Add</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

// create user state
const username = ref("");

// define emit with event onAddUser with types
const emit = defineEmits(["addUser"]);

// create function that emits username if value is not empty
const triggerAddUser = () => {
	// show alert that user name is needed if field is empty
	if (username.value === "") {
		alert("Please enter a user name");
		return;
	}

	emit("addUser", username.value);
	username.value = "";
};
</script>

<style scoped></style>
