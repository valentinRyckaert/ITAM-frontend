<script lang="ts">
  import { getAllFromDB } from "../../api/data"
  import GetModal from '../components/modals/GetModal.svelte'
  import DeleteModal from "./modals/DeleteModal.svelte";
  import PutModal from "./modals/PutModal.svelte";
  
  let showModal = $state(false)
  let updateModal = $state(false)
  let deleteModal = $state(false)
  let dataForModal = $state({})

  let data: any[] = $state([])
  let props = $props()

  $effect(() => {
		if (!showModal) getData()
	})

  function sortObjectByAnother(objToSort, referenceObj) {
    return Object.keys(referenceObj).reduce((acc, key) => {
        if (key in objToSort) {
            acc[key] = objToSort[key]
        }
        return acc
    }, {})
  }

  async function getData() {
    data = await getAllFromDB(props.dataName)
    for(let i=0;i<data.length;i++) {
      data[i] = sortObjectByAnother(data[i], props.config)
    }
  }

  function activateShowModal(element: Object) {
    dataForModal = element
    showModal = true
  }

  function activateUpdateModal(element: Object) {
    dataForModal = element
    updateModal = true
  }

  function activateDeleteModal(element: Object) {
    dataForModal = element
    deleteModal = true
  }
</script>

{#await getData()}
        <h1>loading...</h1>
{:then} 
    <table>
        <thead>
        <tr>
            {#each Object.values(props.config) as header}
                    <th>{header}</th>
            {/each}
            <th></th>
        </tr>
        </thead>
        <tbody> 
            {#each data as element}
                <tr>
                    {#each Object.values(element) as value}
                        <td>{value}</td>
                    {/each}
                    <td>
                      <button onclick={() => activateShowModal(element)}>show</button>
                      <button onclick={() => activateUpdateModal(element)}>update</button>
                      <button onclick={() => activateDeleteModal(element)}>delete</button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    <GetModal bind:showModal={showModal} objectToDisplay={dataForModal}/>
    <PutModal bind:showModal={updateModal} dataName={props.dataName} objectToModify={dataForModal}/>
    <DeleteModal bind:showModal={deleteModal} dataName={props.dataName} objectToDelete={dataForModal}/>
{/await}


<style lang="scss">
    table {
      width: 100%;
      border-collapse: collapse;
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
      tr:hover {
        background-color: #f1f1f1;
      }
    }
</style>