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

<input
	class="w-full p-4 mb-4 bg-gray-700 rounded-lg flex justify-start items-center text-gray-300"
	on:keydown={handleKeyDown}
	bind:value={newTask}
	type="text"
	placeholder="Your new task!"
	aria-label="Name your new task"
/>
