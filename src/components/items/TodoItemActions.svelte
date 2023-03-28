<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let completed = false;

	function handleEdit(event: any) {
		dispatch('edit', event);
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
	<input
		type="checkbox"
		bind:checked={completed}
		class="w-5 h-5"
		aria-label="Task completion state"
	/>
	<button
		class="text-gray-300 bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded-md transition-colors"
		on:click={handleEdit}
		aria-label="Edit task"
	>
		Edit
	</button>
	<button
		class="text-gray-300 bg-red-600 hover:bg-red-700 px-2 py-1 rounded-md transition-colors"
		on:click={handleDelete}
		aria-label="Delete task"
	>
		Delete
	</button>
</div>
