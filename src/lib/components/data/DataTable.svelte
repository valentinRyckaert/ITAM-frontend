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
    <button class="btn btn-create" onclick={() => activateModal(createOrUpdateConfig, {}, 'post')}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg icon" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
      </svg>
    </button>
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
                      <button class="btn btn-read" onclick={() => activateModal(showOrDeleteConfig, data[i], 'read')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye icon" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                        </svg>
                      </button>
                      {#if currentUser.USER_type < 2}
                        <button class="btn btn-update" onclick={() => activateModal(createOrUpdateConfig, data[i], 'update')}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square icon" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                          </svg>
                        </button>
                        <button class="btn btn-delete" onclick={() => activateModal(showOrDeleteConfig, data[i], 'delete')}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash icon" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                          </svg>
                        </button>
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
        {:else if modalType === 'post'}
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
      border-radius: 7px;
      border-color: transparent;
      color: white;
      margin-block: 7px;
      padding-block: 2px;
      padding-inline: 10px;
      &-create {
        margin-bottom: 10px;
        background-color: rgb(39, 151, 39);
      }
      &-read {
        background-color: rgb(42, 108, 194);
      }
      &-update {
        background-color: rgb(202, 111, 6);
      }
      &-delete {
        background-color: rgb(204, 34, 34);
      }
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
</style>
