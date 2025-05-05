<script lang="ts">
    import ChoiceBox from '../components/ChoiceBox.svelte'
    import DataTable from '../components/data/DataTable.svelte'
    import { autoUpdate } from '../../api/packages'
  
    let activeView = $state("packages")
    let reloadKey = $state({})
    let isLoading = $state(false)

    async function updateData() {
      isLoading = true
      await autoUpdate()
    }

</script>
  
  <div class="container">
      <h1>Packages</h1>

    <button class="autoupdate" onclick={async() => await updateData().then(() => {reloadKey = {}; isLoading=false})}>{isLoading ? "loading..." : "auto Update"}</button>
  
      <ChoiceBox bind:activeButton={activeView} listLabels={['packages','package groups']} />
  
      {#if activeView === "packages"}
        <h2>Packages</h2>
        <DataTable bind:reloadKey
          dataName="packages"
          showOrDeleteConfig={{
            PACK_id: 'id',
            PACK_name: 'name',
            PACK_type: 'os',
            PACK_os_supported: 'group id',
            DEV_id: 'device id',
            DG_id: 'device group',
            PG_id: 'package group'
          }}
          createOrUpdateConfig={{
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
          foreignKeysToShow={{
            DEV_id: 'devices:DEV_name',
            DG_id: 'devicegroups:DG_libelle',
            PG_id: 'packagegroups:PG_libelle'
          }}
          canCreate={false}
          canDelete={false}
        />
      {:else}
        <h2>Groupes d'Actifs</h2>
        <DataTable
          dataName="packagegroups"
          showOrDeleteConfig={{
            PG_id: 'id',
            PG_libelle: 'libellé',
          }}
          createOrUpdateConfig={{
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

<style lang="scss">
  .autoupdate {
    background-color: rgb(104, 104, 104);
    color: white;
    border-radius: 10px;
    border-color: transparent;
    margin-bottom: 10px;
  }
</style>