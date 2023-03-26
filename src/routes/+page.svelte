<script lang="ts">
	import '../app.css';
	import type { Task } from '../model';
	import TodoItems from '../components/items/TodoItems.svelte';
	import TodoItemCreate from '../components//items/TodoItemCreate.svelte';
	import EditTaskModal from '../components/modal/EditTaskModal.svelte';
	import { onMount } from 'svelte';
	import TaskFileIo from '../components/file/TaskFileIO.svelte';
	import { modals } from '../modals';

	export let items: Task[] = [];

	const TASKS_STORAGE_KEY = 'tasks';

	function handleTaskEdit({ detail }: { detail: Task }) {
		modals.editTask.data = { ...detail };
		modals.editTask.visible = true;
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

<div>
	<EditTaskModal
		bind:visible={modals.editTask.visible}
		bind:data={modals.editTask.data}
		on:save={handleTaskEditSave}
	/>

	<TodoItemCreate on:create={handleTaskCreate} />
	<TodoItems
		bind:items
		on:edit={handleTaskEdit}
		on:delete={handleTaskDelete}
		on:titleChange={saveToLocalStorage}
	/>

	<TaskFileIo bind:items on:save={saveToLocalStorage} />
</div>

<style>
	div {
		padding: 1rem;
	}
</style>
