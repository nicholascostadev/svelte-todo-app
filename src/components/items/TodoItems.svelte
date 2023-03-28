<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Task } from '../../model';
	import TodoItem from './TodoItem.svelte';

	const dispatch = createEventDispatcher();

	function handleDelete(id: string) {
		dispatch('delete', id);
	}

	type HandleEditProps = {
		item: Task;
		event: CustomEvent<Task>;
	};

	function handleEdit({ item, event }: HandleEditProps) {
		dispatch('edit', {
			item,
			event
		});
	}

	export let items: Task[];

	function createList(items: Task[]) {
		return [
			{
				title: 'Tasks',
				data: items.filter((item) => !item.completed),
				emptyMessage: "You're out of tasks! 🎉"
			},
			{
				title: 'Completed Tasks',
				data: items.filter((item) => item.completed),
				emptyMessage: null
			}
		];
	}

	$: lists = createList(items);
</script>

<div class="flex flex-col gap-12">
	{#each lists as list (list.title)}
		<section class="flex flex-col gap-4" aria-label={`${list.title} section`}>
			<div class="flex justify-center items-center gap-2">
				<div class="h-px bg-gray-400 flex-1" />
				<h2 class="text-2xl text-gray-200">{list.title}</h2>
				<div class="h-px bg-gray-400 flex-1" />
			</div>
			<div class="flex flex-col gap-4">
				{#each list.data as item (item.id)}
					<TodoItem
						bind:data={item}
						on:titleChange
						on:completedChange
						on:edit={(e) =>
							handleEdit({
								item,
								event: e
							})}
						on:delete={() => handleDelete(item.id)}
					/>
				{/each}
				{#if list.data.length <= 0 && list.emptyMessage}
					<p class="text-gray-300">{list.emptyMessage}</p>
				{/if}
			</div>
		</section>
	{/each}
</div>
