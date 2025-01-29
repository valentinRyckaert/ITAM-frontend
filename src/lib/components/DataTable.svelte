<script lang="ts">
  import { getAllFromDB } from "../../api/data"
  import GetModal from '../components/modals/GetModal.svelte'
  
  let showModal = $state(false)
  let data: any[] = $state([])
  let props = $props()

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

  function activateModal(id: number) {
    showModal = true
    return id
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
        </tr>
        </thead>
        <tbody> 
            {#each data as element}
                <tr>
                    {#each Object.values(element) as value}
                        <td>{value}</td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
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