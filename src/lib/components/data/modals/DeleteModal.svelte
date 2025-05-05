<script>
 	import { onMount } from "svelte"
	import { deleteData } from "../../../../api/data"
  
	let { showModal = $bindable(), reloadKey = $bindable(), dataName, objectToDelete, objectConfig } = $props()

	let dialog = $state()
	let data = $state({})

	$effect(() => {
		if (showModal) dialog.showModal()
	})

	function deleteObject() {
		deleteData(dataName, Object.values(data)[0]).then(() => { dialog.close(); window.location.reload() })
	}

	onMount(() => {
		Object.keys(objectConfig).forEach((key) => {
			data[objectConfig[key]] = objectToDelete[key]
		})
	})
</script>
  
  <dialog
	  bind:this={dialog}
	  onclose={() => (showModal = false)}
	  onclick={(e) => { if (e.target === dialog) dialog.close() }}
  >
	  <div class="modal-content">
		  <h5 class="modal-title">Do you want to delete this object?</h5>
		  {#each Object.entries(data) as [key, value]}
			  <p class="modal-item">{key} : <span class="modal-value">{value}</span></p>
		  {/each}
		  <hr />
		  <div class="button-group">
			  <!-- svelte-ignore a11y_autofocus -->
			  <button class="cancel-button" autofocus onclick={() => dialog.close()}>Cancel</button>
			  <button class="delete-button" onclick={() => deleteObject()}>Delete</button>
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
  
	  .modal-title {
		  margin-bottom: 1em;
		  font-size: 1.5em;
		  color: #333;
	  }
  
	  .modal-item {
		  margin: 0.5em 0;
		  font-size: 1.1em;
		  color: #555;
	  }
  
	  .modal-value {
		  font-weight: bold;
		  color: #2c3e50; // Couleur pour les valeurs
	  }
  
	  .button-group {
		  display: flex;
		  justify-content: space-between;
		  margin-top: 1em;
	  }
  
	  .cancel-button, .delete-button {
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
  
	  .delete-button {
		  background-color: #28a745; // Couleur verte pour supprimer
	  }
  
	  .cancel-button:hover {
		  background-color: #c82333; // Couleur au survol pour annuler
	  }
  
	  .delete-button:hover {
		  background-color: #218838; // Couleur au survol pour supprimer
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
  