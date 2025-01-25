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
    {#if !isLogged}
      <h2>Connectez-vous pour utiliser l'application</h2>
      <LoginForm bind:isLogged={isLogged}/>
    {:else}
      <h2>Bienvenue sur notre page d'accueil !</h2>
      <DataTable dataName="devices" dataHeaders={['#','name', 'os supported','group']}/>
    {/if}
  </main>
</div>

<style lang="scss">
  main {
    padding: 20px;
    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }
  }
</style>