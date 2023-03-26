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

<div>
	<span
		spellcheck="false"
		contenteditable="true"
		bind:textContent={data.title}
		on:blur={handleTitleBlur}>{data.title}</span
	>
	<TodoItemActions on:delete on:edit />
</div>

<style>
	div {
		display: flex;
		justify-content: space-between;
		border: 1px solid tomato;
		padding: 1rem;
	}
</style>
