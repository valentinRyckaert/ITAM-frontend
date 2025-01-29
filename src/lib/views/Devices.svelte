<script lang="ts">
    import DataTable from '../components/DataTable.svelte'
    import PostModal from '../components/modals/PostModal.svelte'

    let showDeviceModal = $state(false)
    let showGroupModal = $state(false)
    let dataForModal = $state({})

    function activatePostModal(element: object, ressource: string) {
    	dataForModal = element
    	if(ressource == 'devices') showDeviceModal = true
		else showGroupModal = true
    }
</script>

<div class="container">
    <h1>Gestion des Actifs</h1>
    
    <h2>Actifs</h2>
    
	<button onclick={() => activatePostModal({
		DEV_id: ['id','number'],
		DEV_name: ['name','string'],
		DEV_os: ['os', 'string'],
		DG_id: ['group id', 'number']
    }, 'devices')}>create</button>
	
	<DataTable dataName="devices" config={{
		DEV_id: '#',
		DEV_name: 'name',
		DEV_os: 'os',
		DG_id: 'group id'
    }}/>
	<PostModal bind:showModal={showDeviceModal} dataName="devices" objectToSend={dataForModal}/>

  
    <h2>Groupes d'Actifs</h2>

    <button onclick={() => activatePostModal({
		DG_id: ['id','number'],
		DG_libelle: ['libellé','string']
    }, 'groups')}>create</button>

    <DataTable dataName="devicegroups" config={{
		DG_id: '#',
		DG_libelle: 'libellé',
    }}/>
    <PostModal bind:showModal={showGroupModal} dataName="devicegroups" objectToSend={dataForModal}/>
</div>

<style lang="scss">
    .container {
      padding: 20px;
    }
  
    h1 {
      color: #2c3e50;
    }

    button {
      background-color: #333;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 15px;
      cursor: pointer;
      
      &:hover {
        background-color: #2980b9;
      }
    }
</style>