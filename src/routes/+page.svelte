<script lang="ts">
	import type { Task } from '../model';
	import TodoItems from '../components/items/TodoItems.svelte';
	import TodoItemCreate from '../components/items/TodoItemCreate.svelte';
	import EditTaskModal from '../components/modal/EditTaskModal.svelte';
	import { onMount } from 'svelte';
	import TaskFileIo from '../components/file/TaskFileIO.svelte';
	import { modals } from '../modals';

	export let items: Task[] = [];
	let lastFocus: HTMLElement | null = null;

	const TASKS_STORAGE_KEY = 'tasks';

	type HandleTaskEditProps = {
		detail: {
			event: any;
			item: Task;
		};
	};

	function handleTaskEdit({ detail }: HandleTaskEditProps) {
		const { item, event } = detail;
		modals.editTask.data = { ...item };
		modals.editTask.visible = true;

		lastFocus = event.detail.target;
	}

	function handleTaskEditSave({ detail }: { detail: Task }) {
		items = items.map((item) => (item.id === detail.id ? detail : item));

		saveToLocalStorage();
	}

	function handleTaskDelete({ detail: taskId }: { detail: string }) {
		items = items.filter((task) => task.id !== taskId);

		saveToLocalStorage();
	}

	function handleTaskCreate({ detail: newTask }: { detail: Task }) {
		items = [...items, newTask];

		saveToLocalStorage();
	}

	function saveToLocalStorage() {
		window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(items));
	}

	onMount(() => {
		const savedTasks = window.localStorage.getItem(TASKS_STORAGE_KEY);

		if (!savedTasks) return;

		try {
			items = JSON.parse(savedTasks);
		} catch (err) {
			console.error(err);
		}
	});
</script>

<div class="p-4">
	<section aria-label="Adding tasks section">
		<TodoItemCreate on:create={handleTaskCreate} />
		<TaskFileIo bind:items on:save={saveToLocalStorage} />
	</section>
	<TodoItems
		bind:items
		on:completedChange={saveToLocalStorage}
		on:edit={handleTaskEdit}
		on:delete={handleTaskDelete}
		on:titleChange={saveToLocalStorage}
	/>
</div>

{#if modals.editTask.data}
	<EditTaskModal
		bind:visible={modals.editTask.visible}
		bind:data={modals.editTask.data}
		on:save={handleTaskEditSave}
		{lastFocus}
	/>
{/if}
