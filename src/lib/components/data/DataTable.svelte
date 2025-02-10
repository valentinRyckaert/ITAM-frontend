<script lang="ts">
  import { getAllFromDB } from "../../../api/data"
  import GetModal from './modals/GetModal.svelte'
  import DeleteModal from "./modals/DeleteModal.svelte"
  import PutModal from "./modals/PutModal.svelte"
  import PostModal from './modals/PostModal.svelte'
  import { getCurrentUser } from '../../../api/auth'
  
  let showModal = $state(false)
  let modalType = $state('')
  let dataForModal = $state({})

  let data: any[] = $state([])
  let props = $props()
  let currentUser: any = $state()


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
      data[i] = sortObjectByAnother(data[i], props.tableHeaders)
    }
    currentUser = await getCurrentUser()
  }

  function activateModal(element: Object, type: string) {
    dataForModal = element
    modalType = type
    showModal = true
  }

  function activatePostModal(element: object) {
    dataForModal = element
    modalType = 'post'
    showModal = true
  }
</script>

{#await getData()}
    <h1>loading...</h1>
{:then} 
    <button onclick={() => activatePostModal(props.objectConfig)}>create</button>
    <table>
        <thead>
        <tr>
            {#each Object.values(props.tableHeaders) as header}
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
                      <button onclick={() => activateModal(element, 'read')}>show</button>
                      {#if currentUser.USER_type < 2}
                        <button onclick={() => activateModal(element, 'update')}>update</button>
                        <button onclick={() => activateModal(element, 'delete')}>delete</button>
                      {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    {#if showModal && currentUser.USER_type < 2}
        {#if modalType === 'read'}
            <GetModal bind:showModal={showModal} objectToDisplay={dataForModal}/>
        {:else if modalType === 'update'}
            <PutModal bind:showModal={showModal} dataName={props.dataName} objectToModify={dataForModal}/>
        {:else if modalType === 'delete'}
            <DeleteModal bind:showModal={showModal} dataName={props.dataName} objectToDelete={dataForModal}/>
        {:else if modalType === 'post'}
            <PostModal bind:showModal={showModal} dataName={props.dataName} objectToSend={dataForModal}/>
        {/if}
    {/if}
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
