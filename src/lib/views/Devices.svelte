<script lang="ts">
    import DataTable from '../components/DataTable.svelte'
  import PostModal from '../components/modals/PostModal.svelte';

    let showModal = $state(false)
    let dataForModal = $state({})

    function activatePostModal(element: object) {
      dataForModal = element
      showModal = true
    }
</script>

<div class="container">
    <h1>Gestion des Actifs</h1>
    
    
    <h2>Actifs</h2>
    <DataTable dataName="devices" config={{
      DEV_id: '#',
      DEV_name: 'name',
      DEV_os: 'os',
      DG_id: 'group id'
    }}/>

  
    <h2>Groupes d'Actifs</h2>

    <button onclick={() => activatePostModal({
      DG_id: ['id','number'],
      DG_libelle: ['libellé','string']
    })}>create</button>

    <DataTable dataName="devicegroups" config={{
      DG_id: '#',
      DG_libelle: 'libellé',
    }}/>
    <PostModal bind:showModal={showModal} dataName="devicegroups" objectToSend={dataForModal}/>
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