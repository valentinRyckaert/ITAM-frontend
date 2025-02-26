<script lang="ts">
    import ChoiceBox from '../components/ChoiceBox.svelte'
    import DataTable from '../components/data/DataTable.svelte'
    import { autoUpdate } from '../../api/packages'
  
    let activeView = $state("packages")
</script>
  
  <div class="container">
      <h1>Packages</h1>

    <button onclick={autoUpdate}>auto Update</button>
  
      <ChoiceBox bind:activeButton={activeView} listLabels={['packages','package groups']} />
  
      {#if activeView === "packages"}
        <h2>Actifs</h2>
        <DataTable
          dataName="packages"
          objectConfig={{
            PACK_id: ['id','number'],
            PACK_name: ['name','text'],
            PACK_type: ['os', 'text'],
            PACK_os_supported: ['group id', 'number'],
            DEV_id: ['device id', 'number'],
            DG_id: ['device group id', 'number'],
            PG_id: ['package group id', 'number']
          }}
          tableHeaders={{
            PACK_id: '#',
            PACK_name: 'file name',
            PACK_type: 'type',
            PACK_os_supported: 'os supported',
            DEV_id: 'for which device',
            DG_id: 'for which device group',
            PG_id: 'package group'
          }}
        />
      {:else}
        <h2>Groupes d'Actifs</h2>
        <DataTable
          dataName="packagegroups"
          objectConfig={{
            PG_id: ['id','number'],
            PG_libelle: ['libellé','text'],
          }}
          tableHeaders={{
            PG_id: '#',
            PG_libelle: 'libellé',
          }}
        />
      {/if}
  </div>