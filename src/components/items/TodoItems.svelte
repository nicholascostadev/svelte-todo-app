<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Task } from '../../model';
	import TodoItem from './TodoItem.svelte';

	const dispatch = createEventDispatcher();

	function handleDelete(id: string) {
		dispatch('delete', id);
	}

	function handleEdit(item: Task) {
		dispatch('edit', item);
	}

	export let items: Task[];
</script>

<div class="flex flex-col gap-4">
	<div class="flex justify-center items-center gap-2">
		<div class="h-px bg-gray-400 flex-1" />
		<h2 class="text-2xl text-gray-200">Todos</h2>
		<div class="h-px bg-gray-400 flex-1" />
	</div>
	<div class="flex flex-col gap-4">
		{#each items as item (item.id)}
			<TodoItem
				bind:data={item}
				on:titleChange
				on:completedChange
				on:edit={() => handleEdit(item)}
				on:delete={() => handleDelete(item.id)}
			/>
		{/each}
	</div>
</div>
