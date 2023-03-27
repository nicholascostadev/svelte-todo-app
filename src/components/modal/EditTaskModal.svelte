<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Task } from '../../model';
	import Modal from '../util/modal/Modal.svelte';

	const dispatch = createEventDispatcher();

	export let data: Task;

	export let visible = false;

	function handleCloseModal() {
		visible = false;
	}

	function handleSave() {
		if (data?.title === '') return;

		dispatch('save', data);
		handleCloseModal();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (data?.title === '') return;

		if (e.key == 'Enter') {
			handleSave();
		}
	}
</script>

<Modal bind:visible>
	<div class="flex flex-col gap-4 justify-start items-start">
		<h1 class="text-gray-300 text-2xl">Edit task</h1>
		<div class="flex w-full gap-4">
			<input
				class="flex-1 bg-gray-600 px-2 py-1 text-gray-200 rounded-md"
				type="text"
				bind:value={data.title}
				on:keydown={handleKeyDown}
				placeholder="New task title"
			/>
			<button
				class="bg-gray-500 hover:bg-gray-600 px-2 py-1 rounded-md text-gray-200 transition-colors"
				on:click={handleSave}>Save</button
			>
		</div>
	</div>
</Modal>
