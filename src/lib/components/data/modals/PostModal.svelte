<script>

    import { postData } from "../../../../api/data"

	let { showModal = $bindable(), objectToSend, dataName } = $props()
	let dialog = $state()

	$effect(() => {
		if (showModal) dialog.showModal()
	})

    let data = $state({})

    function sendData() {
		console.log(dataName, data)
        postData(dataName, data)
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
            {#each Object.entries(objectToSend) as [key, value]}
                <label for="{value[0]}">{value[0]}:</label>
                <input type="{value[1]}" id="{value[0]}" bind:value={data[key]}/>
                <br>
            {/each}
        </div>
		<hr />
		<!-- svelte-ignore a11y_autofocus -->
		<button autofocus onclick={() => dialog.close()}>cancel</button>
        <button onclick={() => {sendData(); dialog.close()}}>create</button>
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