<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Task } from '../../model';
	import TodoItemActions from './TodoItemActions.svelte';

	const dispatch = createEventDispatcher();

	function handleTitleBlur() {
		dispatch('titleChange');
	}

	export let data: Task;
</script>

<div class="flex justify-between items-center border border-gray-300/40 rounded-lg p-4">
	<span
		class="text-gray-300"
		spellcheck="false"
		contenteditable="true"
		bind:textContent={data.title}
		on:blur={handleTitleBlur}>{data.title}</span
	>
	<TodoItemActions on:completedChange on:delete on:edit bind:completed={data.completed} />
</div>
