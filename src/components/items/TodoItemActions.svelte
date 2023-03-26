<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleEdit() {
		dispatch('edit');
	}

	function handleDelete() {
		dispatch('delete');
	}
</script>

<div>
	<button on:click={handleEdit}>Edit</button>
	<button on:click={handleDelete}>Delete</button>
</div>

<style>
	div {
		display: flex;
		gap: 0.5rem;
	}
</style>
