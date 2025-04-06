<script>

    import { putData } from "../../../../api/data"

	let { showModal = $bindable(), objectToModify, objectConfig, dataName } = $props()
	let dialog = $state()
	let data = $state({})

	$effect(() => {
		if (showModal)
			Object.keys(objectConfig).forEach((key) => {
				data[objectConfig[key][0]] = [objectConfig[key][2] !== undefined ? objectConfig[key][2] : objectToModify[key], objectConfig[key][1]]
			})
			dialog.showModal()
	})

    function sendData() {
		let objectToSend = {}
		Object.keys(objectConfig).forEach((key) => {
			objectToSend[key] = JSON.parse(JSON.stringify(data[objectConfig[key][0]][0]))
		})
        putData(dataName, Object.values(objectToSend)[0], objectToSend).then(() => {showModal = false})
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => { if (e.target === dialog) dialog.close() }}
>
	<div>
		<div>
            {#each Object.keys(data) as key}
                <label for="{key}">{key}:</label>
				{#if data[key][1] === "checkbox"}
					<input type="checkbox" id="{key}" bind:checked={data[key][0]}/>
				{:else}
					<input type="{data[key][1]}" id="{key}" bind:value={data[key][0]}/>
				{/if}
				<br>
		    {/each}
        </div>
		<hr />
		<!-- svelte-ignore a11y_autofocus -->
		<button autofocus onclick={() => dialog.close()}>cancel</button>
        <button onclick={() => sendData()}>update</button>
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