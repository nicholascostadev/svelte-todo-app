<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let completed = false;

	function handleEdit() {
		dispatch('edit');
	}

	function handleDelete() {
		dispatch('delete');
	}

	function handleCompletedChange(_: boolean) {
		dispatch('completedChange');
	}

	$: handleCompletedChange(completed);
</script>

<div class="flex items-center gap-2">
	<input type="checkbox" bind:checked={completed} class="w-5 h-5" />
	<button
		class="text-gray-300 bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded-md transition-colors"
		on:click={handleEdit}>Edit</button
	>
	<button
		class="text-gray-300 bg-red-600 hover:bg-red-700 px-2 py-1 rounded-md transition-colors"
		on:click={handleDelete}>Delete</button
	>
</div>
