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
  let sortedData: any[] = $state([])

  let {
    canCreate = true,
    tableHeaders,
    dataName,
    showOrDeleteConfig,
    createOrUpdateConfig
  }: any = $props()
  let currentUser: any = $state()
  
  async function getData() {
    data = await getAllFromDB(dataName)
    for(let i=0;i<data.length;i++) {
      sortedData[i] = Object.keys(tableHeaders).reduce((acc, key) => {
        if (key in data[i]) {
            acc[key] = data[i][key]
        }
        return acc
      }, {})
    }
    currentUser = await getCurrentUser()
  }

  $effect(() => {
    if(!showModal) {
      getData()
    }
  })

  function activateModal(element: object, type: string) {
    dataForModal = element
    modalType = type
    showModal = true
  }

  function activateUpdateModal(element: object, data: object, type: string) {
    dataForModal = [element, data]
    modalType = type
    showModal = true
  }
</script>

{#await getData()}
    <h1>loading...</h1>
{:then} 
  {#if canCreate}
    <button onclick={() => activateModal(createOrUpdateConfig, 'post')}>create</button>
  {/if}
    <table>
        <thead>
          <tr>
              {#each Object.values(tableHeaders) as header}
                      <th>{header}</th>
              {/each}
              <th></th>
          </tr>
        </thead>
        <tbody> 
            {#each sortedData as element, i}
                <tr>
                    {#each Object.values(element) as value}
                        <td>{value}</td>
                    {/each}
                    <td>
                      <button onclick={() => activateModal(element, 'read')}>show</button>
                      {#if currentUser.USER_type < 2}
                        <button onclick={() => activateUpdateModal(createOrUpdateConfig, data[i], 'update')}>update</button>
                        <button onclick={() => activateModal(element, 'delete')}>delete</button>
                      {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    {#if showModal && currentUser.USER_type < 2}
        {#if modalType === 'read'}
            <GetModal bind:showModal objectToDisplay={dataForModal}/>
        {:else if modalType === 'update'}
            <PutModal bind:showModal dataName={dataName} objectToModify={dataForModal[1]} objectConfig={dataForModal[0]}/>
        {:else if modalType === 'delete'}
            <DeleteModal bind:showModal dataName={dataName} objectToDelete={dataForModal}/>
        {:else if modalType === 'post' && canCreate}
            <PostModal bind:showModal dataName={dataName} objectToSend={dataForModal}/>
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
