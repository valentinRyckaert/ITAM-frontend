<script>
// @ts-nocheck

    import { postData } from "../../../../api/data"

	let { showModal = $bindable(), reloadKey = $bindable(), dataName, objectToSend } = $props()

	let dialog = $state()
	let dialogError = $state("")
	let data = $state({})

	$effect(() => {
		if (showModal) dialog.showModal()
	})

    function sendData() {
        postData(dataName, data)
			.then(() => { dialog.close(); reloadKey = {} })
			.catch((error) => {
				dialogError = 'Error: ' + JSON.parse(error.message).detail
			})
    }
</script>

<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => { if (e.target === dialog) dialog.close() }}
>
	<div class="modal-content">
		<p style="color: red;">{dialogError}</p>
		<div class="form-group">
            {#each Object.entries(objectToSend) as [key, value]}
                <label for="{value[0]}" class="form-label">{value[0]}:</label>
				{#if value[1] === "checkbox"}
					<input type="checkbox" id="{value[0]}" bind:checked={data[key]} class="form-checkbox"/>
				{:else}
					<input type="{value[1]}" id="{value[0]}" bind:value={data[key]} class="form-input"/>
				{/if}
                <br>
            {/each}
        </div>
		<hr />
		<div class="button-group">
			<!-- svelte-ignore a11y_autofocus -->
			<button class="cancel-button" autofocus onclick={() => dialog.close()}>Cancel</button>
			<button class="create-button" onclick={() => sendData()}>Create</button>
		</div>
	</div>
</dialog>

<style lang="scss">
	dialog {
		max-width: 32em;
		border-radius: 10px;
		border: none;
		padding: 0;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
		background-color: #fff;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}

	.modal-content {
		padding: 2em;
		text-align: left;
	}

	.form-group {
		margin-bottom: 1.5em;
	}

	.form-label {
		display: block;
		margin-bottom: 0.5em;
		font-weight: bold;
		color: #333;
	}

	.form-input, .form-checkbox {
		width: 100%;
		padding: 0.5em;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 1em;
	}

	.form-checkbox {
		width: auto;
	}

	.button-group {
		display: flex;
		justify-content: space-between;
	}

	.cancel-button, .create-button {
		padding: 0.5em 1.5em;
		font-size: 1em;
		color: #fff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.cancel-button {
		background-color: #dc3545; // Couleur rouge pour annuler
	}

	.create-button {
		background-color: #28a745; // Couleur verte pour créer
	}

	.cancel-button:hover {
		background-color: #c82333; // Couleur au survol pour annuler
	}

	.create-button:hover {
		background-color: #218838; // Couleur au survol pour créer
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
</style>
