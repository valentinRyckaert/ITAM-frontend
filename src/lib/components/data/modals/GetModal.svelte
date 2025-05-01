<script>
	let { showModal = $bindable(), objectToDisplay, objectConfig } = $props()

	let dialog = $state()
	let data = $state({})

	$effect(() => {
		if (showModal) {
			Object.keys(objectConfig).forEach((key) => {
				data[objectConfig[key]] = objectToDisplay[key]
			})
			dialog.showModal()
		}
	})
</script>

<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => { if (e.target === dialog) dialog.close() }}
>
	<div class="modal-content">
		{#each Object.entries(data) as [key, value]}
			<p class="modal-item">{key} : <span class="modal-value">{value}</span></p>
		{/each}
		<hr />
		<button class="close-button" autofocus onclick={() => dialog.close()}>Close</button>
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
		text-align: center;
	}

	.modal-item {
		margin: 0.5em 0;
		font-size: 1.1em;
		color: #333;
	}

	.modal-value {
		font-weight: bold;
		color: #2c3e50; // Couleur pour les valeurs
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

	.close-button {
		display: inline-block;
		margin-top: 1em;
		padding: 0.5em 1.5em;
		font-size: 1em;
		color: #fff;
		background-color: #2c3e50;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: #1f2b36; // Couleur au survol
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 0 3px #1f2b36;
		}
	}
</style>