<script lang="ts">
  import { onMount } from 'svelte'
  import Header from './lib/Header.svelte'
  import LoginForm from './lib/LoginForm.svelte'
  import DataTable from './lib/DataTable.svelte'

  let isLogged: boolean


  onMount(async () => {
    isLogged = localStorage.getItem('authToken') !== null
  })
 
</script>

<div>
  <Header bind:isLogged={isLogged}/>
  <main>
    <h2>Bienvenue sur notre page d'accueil !</h2>
    {#if !isLogged}
      <LoginForm bind:isLogged={isLogged}/>
    {:else}
      <DataTable dataName="devices" dataHeaders={['#','name', 'os supported','group']}/>
    {/if}
  </main>
</div>

<style lang="scss">
  main {
    padding: 20px;
    h2 {
      color: #333;
    }
  }
</style>