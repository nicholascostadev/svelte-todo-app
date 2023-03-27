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

<div class="flex justify-between border border-red-300 p-4">
	<span
		spellcheck="false"
		contenteditable="true"
		bind:textContent={data.title}
		on:blur={handleTitleBlur}>{data.title}</span
	>
	<TodoItemActions on:completedChange on:delete on:edit bind:completed={data.completed} />
</div>
