<script>
  import ChoiceBox from "../components/ChoiceBox.svelte";
  import DataTable from "../components/data/DataTable.svelte";

  let activeView = $state("devices")

</script>

<div class="container">
    <h1>Devices</h1>

    <ChoiceBox bind:activeButton={activeView} listLabels={['devices','devices groups']} />

    {#if activeView === "devices"}
      <h2>Actifs</h2>
      <DataTable
        dataName="devices"
        showOrDeleteConfig={{
          DEV_id: 'id',
          DEV_name: 'name',
          DEV_os: 'os',
          DG_id: 'device group'
        }}
        createOrUpdateConfig={{
          DEV_id: ['id','number'],
          DEV_name: ['name','text'],
          DEV_os: ['os', 'text'],
          DG_id: ['device group id', 'number']
        }}
        tableHeaders={{
          DEV_id: '#',
          DEV_name: 'name',
          DEV_os: 'os',
          DG_id: 'device group'
        }}
        foreignKeysToShow={{
          DG_id: 'devicegroups:DG_libelle'
        }}
      />
    {:else}
      <h2>Groupes d'Actifs</h2>
      <DataTable
        dataName="devicegroups"
        showOrDeleteConfig={{
          DG_id: 'id',
          DG_libelle: 'libellé',
        }}
        createOrUpdateConfig={{
          DG_id: ['id','number'],
          DG_libelle: ['libellé','text'],
        }}
        tableHeaders={{
          DG_id: '#',
          DG_libelle: 'libellé',
        }}
      />
    {/if}
</div>