<script lang="ts">
	import { afterUpdate, onDestroy, onMount } from 'svelte';

	export let visible = false;
	export let lastFocus: HTMLElement | null = null;

	function handleCloseModal() {
		visible = false;
	}

	let modal: HTMLDivElement | null;

	function handleEscapeKey(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			handleCloseModal();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleEscapeKey, {
			capture: true
		});
	});

	afterUpdate(() => {
		if (modal && visible) {
			modal?.focus();
		}
	});

	onDestroy(() => {
		document.removeEventListener('keydown', handleEscapeKey, {
			capture: true
		});

		if (lastFocus) lastFocus.focus();
	});
</script>

{#if visible}
	<div
		id="popup-modal"
		tabindex="-1"
		class="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full h-screen bg-black/40"
		on:click={handleCloseModal}
		on:keydown={handleEscapeKey}
		bind:this={modal}
		aria-label="Modal"
	>
		<div
			class="absolute w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			on:click|stopPropagation
			on:keydown|stopPropagation
		>
			<div class="relative rounded-lg shadow bg-gray-700">
				<button
					type="button"
					class="absolute top-3 right-2.5 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
					aria-label="Close modal"
					on:click={handleCloseModal}
				>
					<svg
						aria-hidden="true"
						class="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
					<span class="sr-only">Close modal</span>
				</button>
				<div class="p-6">
					<div on:click|stopPropagation>
						<slot />
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
