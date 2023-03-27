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

<div class="mt-4 flex flex-col gap-2">
	<div>
		<input type="text" placeholder="File name" bind:value={fileName} />
		<button on:click={handleSaveFile}>Save file</button>
	</div>
	<input type="file" accept="application/json" bind:files={importFiles} />
</div>
