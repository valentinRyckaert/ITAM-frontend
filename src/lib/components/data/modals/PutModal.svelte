<script>
  	import { onMount } from "svelte"
    import { putData } from "../../../../api/data"

	let { showModal = $bindable(), reloadKey = $bindable(), dataName, objectToModify, objectConfig } = $props()

	let dialog = $state()
	let data = $state({})

	$effect(() => {
		if (showModal) dialog.showModal()
	})

    function sendData() {
		let objectToSend = {}
		Object.keys(objectConfig).forEach((key) => {
			if (data[objectConfig[key][0]] !== undefined) {
				objectToSend[key] = JSON.parse(JSON.stringify(data[objectConfig[key][0]][0]))
			} else {
				objectToSend[key] = JSON.parse(JSON.stringify(objectToModify[key]))
			}
		})
		console.log(objectToSend)
        putData(dataName, Object.values(objectToSend)[0], objectToSend).then(() => { dialog.close(); reloadKey = {} })
    }

	onMount(() => {
		Object.keys(objectConfig).forEach((key) => {
			if (objectConfig[key][2] !== null) {
				data[objectConfig[key][0]] = [objectConfig[key][2] !== undefined ? objectConfig[key][2] : objectToModify[key], objectConfig[key][1]]
			}
		})
	})
</script>

<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => { if (e.target === dialog) dialog.close() }}
>
	<div class="modal-content">
		<div class="form-group">
            {#each Object.keys(data) as key}
                <label for="{key}" class="form-label">{key}:</label>
				{#if data[key][1] === "checkbox"}
					<input type="checkbox" id="{key}" bind:checked={data[key][0]} class="form-checkbox"/>
				{:else}
					<input type="{data[key][1]}" id="{key}" bind:value={data[key][0]} class="form-input"/>
				{/if}
				<br>
		    {/each}
        </div>
		<hr />
		<div class="button-group">
			<!-- svelte-ignore a11y_autofocus -->
			<button class="cancel-button" autofocus onclick={() => dialog.close()}>Cancel</button>
			<button class="update-button" onclick={() => sendData()}>Update</button>
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

	.cancel-button, .update-button {
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

	.update-button {
		background-color: #007BFF; // Couleur bleue pour mettre à jour
	}

	.cancel-button:hover {
		background-color: #c82333; // Couleur au survol pour annuler
	}

	.update-button:hover {
		background-color: #0056b3; // Couleur au survol pour mettre à jour
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
