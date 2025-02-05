<script>
  import ChoiceBox from "../components/ChoiceBox.svelte";
  import DataTable from "../components/data/DataTable.svelte";

  let activeView = $state("devices")

</script>

<div class="container">
    <h1>Gestion des Actifs</h1>

    <ChoiceBox bind:activeButton={activeView} listLabels={['devices','devices groups']} />

    {#if activeView === "devices"}
      <h2>Actifs</h2>
      <DataTable
        dataName="devices"
        objectConfig={{
          DEV_id: ['id','number'],
          DEV_name: ['name','string'],
          DEV_os: ['os', 'string'],
          DG_id: ['group id', 'number']
        }}
        tableHeaders={{
          DEV_id: '#',
          DEV_name: 'name',
          DEV_os: 'os',
          DG_id: 'group id'
        }}
      />
    {:else}
      <h2>Groupes d'Actifs</h2>
      <DataTable
        dataName="devicegroups"
        objectConfig={{
          DG_id: ['id','number'],
          DG_libelle: ['libellé','string'],
        }}
        tableHeaders={{
          DG_id: '#',
          DG_libelle: 'libellé',
        }}
      />
    {/if}
</div>