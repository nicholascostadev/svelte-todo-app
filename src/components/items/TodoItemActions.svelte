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
	<button on:click={handleEdit}>Edit</button>
	<button on:click={handleDelete}>Delete</button>
</div>
