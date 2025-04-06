<script>
  import { deleteData } from "../../../../api/data";

	let { showModal = $bindable(), dataName, objectToDelete, objectConfig } = $props()

	let dialog = $state()
	let data = $state({})

	$effect(() => {
		if (showModal)
			Object.keys(objectConfig).forEach((key) => {
				data[objectConfig[key]] = objectToDelete[key]
			})
			dialog.showModal()
	})

    function deleteObject() {
        deleteData(dataName, Object.values(objectToDelete)[0]).then(() => dialog.close())
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => { if (e.target === dialog) dialog.close() }}
>
	<div>
        <h5>Do you want to delete this object ?</h5>
		{#each Object.entries(data) as [key, value]}
			<p>{key} : {value}</p>
		{/each}
		<hr />
		<!-- svelte-ignore a11y_autofocus -->
		<button autofocus onclick={() => dialog.close()}>close modal</button>
        <button onclick={() => deleteObject()}>delete</button>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 5px;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>