<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Task } from '../../model';

	const dispatch = createEventDispatcher();

	export let items: Task[] = [];
	let fileName = '';
	let importFiles: FileList;

	function handleSaveFile() {
		const stringifiedItems = JSON.stringify(items);

		// creates a link element with the data and downloads it as a JSON
		const a = document.createElement('a');
		a.href = `data:application/json;charset=utf-8,${stringifiedItems}`;
		a.download = `${fileName}.json`;
		a.click();
	}

	function handleFilesChange(files: FileList) {
		if (!files || files.length === 0) return;
		if (files[0].type !== 'application/json') return;

		const reader = new FileReader();

		reader.onload = (e) => {
			try {
				if (!e.target) return;
				const result = e.target.result;

				if (typeof result !== 'string') return;

				items = JSON.parse(result);
				dispatch('save');
			} catch (err) {
				console.log(err);
			}
		};

		reader.readAsText(files[0]);
	}

	$: handleFilesChange(importFiles);
</script>

<div class="mt-4 flex flex-col gap-4">
	<div class="flex gap-4">
		<input
			class="p-2 flex flex-1 justify-start items-center w-full text-sm rounded-lg text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
			type="text"
			bind:value={fileName}
			placeholder="File Name"
		/>
		<button
			class="text-gray-300 bg-gray-600 hover:bg-gray-700 rounded-md px-2 py-1 transition-colors"
			on:click={handleSaveFile}>Save File</button
		>
	</div>
	<div class="flex justify-center items-center gap-4 pb-12">
		<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input"
			>You can also import an existing JSON file</label
		>
		<input
			class="p-2 flex flex-1 justify-start items-center w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
			aria-describedby="file_input_help"
			accept="application/json"
			id="file_input"
			type="file"
			bind:files={importFiles}
		/>
	</div>
</div>
