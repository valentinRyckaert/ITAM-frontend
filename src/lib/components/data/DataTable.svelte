<script lang="ts">
  import { getAllFromDB, getOneFromDB } from "../../../api/data"
  import GetModal from './modals/GetModal.svelte'
  import DeleteModal from "./modals/DeleteModal.svelte"
  import PutModal from "./modals/PutModal.svelte"
  import PostModal from './modals/PostModal.svelte'
  import { getCurrentUser } from '../../../api/auth'
  
  let showModal = $state(false)
  let modalType = $state('')
  let dataForModal = $state({})

  let data: any[] = $state([])
  let dataWithFK: any[] = $state([])
  let sortedData: {[key: string]: string}[] = $state([])

  let {
    canCreate = true,
    tableHeaders,
    dataName,
    showOrDeleteConfig,
    createOrUpdateConfig,
    foreignKeysToShow = null
  }: any = $props()
  let currentUser: any = $state()
  
  async function getFK(fk: string) {
    if(fk.split('--')[1] !== 'null')
      return (await getOneFromDB(fk.split(':')[1], parseInt(fk.split('--')[1])))[fk.split(':')[2].split('--')[0]]
    return 'none'
  }

  async function getData() {
    data = await getAllFromDB(dataName)
    if(foreignKeysToShow) {
      for(let i=0;i<data.length;i++) {
        dataWithFK[i] = Object.keys(data[i]).reduce((acc, key) => {
          if(key in foreignKeysToShow) {
            acc[key] = 'TF:'+foreignKeysToShow[key]+'--'+data[i][key]
          } else {
            acc[key] = data[i][key]
          }
          return acc
        }, {})
      }
    } else {
      dataWithFK = data
    }

    for(let i=0;i<data.length;i++) {
      sortedData[i] = Object.keys(tableHeaders).reduce((acc, key) => {
        if (key in dataWithFK[i]) {
          acc[key] = dataWithFK[i][key]
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

  function activateModal(element: object, data: object, type: string) {
    dataForModal = [element, data]
    modalType = type
    showModal = true
  }
</script>

{#await getData()}
    <h1>loading...</h1>
{:then} 
  {#if canCreate}
    <button class="btn btn-create" onclick={() => activateModal(createOrUpdateConfig, {}, 'post')}>add</button>
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
                      {#if value?.toString().startsWith('TF:')}
                        {#await getFK(value)}
                          <td>loading data...</td>
                        {:then gottenValue} 
                          <td>{gottenValue}</td>
                        {/await}
                      {:else}
                        <td>{value}</td>
                      {/if}
                    {/each}
                    <td>
                      <button class="btn btn-read" onclick={() => activateModal(showOrDeleteConfig, data[i], 'read')}>show</button>
                      {#if currentUser.USER_type < 2}
                        <button class="btn btn-update" onclick={() => activateModal(createOrUpdateConfig, data[i], 'update')}>update</button>
                        <button class="btn btn-delete" onclick={() => activateModal(showOrDeleteConfig, data[i], 'delete')}>delete</button>
                      {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    {#if showModal && currentUser.USER_type < 2}
        {#if modalType === 'read'}
            <GetModal bind:showModal objectToDisplay={dataForModal[1]} objectConfig={dataForModal[0]}/>
        {:else if modalType === 'update'}
            <PutModal bind:showModal dataName={dataName} objectToModify={dataForModal[1]} objectConfig={dataForModal[0]}/>
        {:else if modalType === 'delete'}
            <DeleteModal bind:showModal dataName={dataName} objectToDelete={dataForModal[1]} objectConfig={dataForModal[0]}/>
        {:else if modalType === 'post' && canCreate}
            <PostModal bind:showModal dataName={dataName} objectToSend={dataForModal[0]}/>
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

    .btn {
      border-radius: 10px;
      border-color: transparent;
      color: white;
      &-create {
        margin-bottom: 10px;
        background-color: rgb(39, 151, 39);
      }
      &-read {
        background-color: rgb(78, 115, 163);
      }
      &-update {
        background-color: rgb(187, 107, 15);
      }
      &-delete {
        background-color: rgb(204, 34, 34);
      }
    }
</style>
