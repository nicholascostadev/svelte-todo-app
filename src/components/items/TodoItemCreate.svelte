<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	const dispatch = createEventDispatcher();

	let newTask = '';

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;

		e.preventDefault();

		if (newTask.trim() === '') return;

		dispatch('create', {
			id: uuidv4(),
			title: newTask,
			completed: false
		});

		newTask = '';
	}
</script>

<input on:keydown={handleKeyDown} bind:value={newTask} type="text" placeholder="Your new task!" />

<style>
	input {
		width: 100%;

		padding: 1rem;
		margin-bottom: 1rem;
	}
</style>
