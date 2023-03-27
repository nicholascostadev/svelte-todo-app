<script lang="ts">
	export let visible = false;

	function handleCloseModal() {
		visible = false;
	}
</script>

{#if visible}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!--Ignore this just for now-->
	<div
		class="fixed top-0 left-0 z-10 w-full h-full overflow-auto bg-black/40"
		on:click={handleCloseModal}
	>
		<div
			class="bg-gray-100 my-[15%] mx-auto p-5 border border-red-300 w-4/5"
			on:click|stopPropagation
		>
			<slot />
		</div>
	</div>
{/if}
