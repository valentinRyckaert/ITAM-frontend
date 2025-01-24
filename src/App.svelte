<script lang="ts">
  import { onMount } from 'svelte';
  import Navbar from './lib/Navbar.svelte'
  import LoginForm from './lib/LoginForm.svelte'
  import DataTable from './lib/DataTable.svelte'
  import LogoutButton from './lib/LogoutButton.svelte'

  let logged: boolean
  

  onMount(async () => {
    logged = localStorage.getItem('authToken') !== null
  });

</script>

<div>
  <Navbar/>
  <main>
    <h2>Bienvenue sur notre page d'accueil !</h2>
    {#if !logged}
      <LoginForm bind:isLogged={logged}/>
    {:else}
      <DataTable dataName="devices" dataHeaders={['#','name', 'os supported','group']}/>
      <LogoutButton setLogout="{() => {logged = false}}"/>
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