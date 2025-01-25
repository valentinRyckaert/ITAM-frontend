<script lang="ts">
  import { onMount } from 'svelte'
  import Header from './lib/views/layout/Header.svelte'
  import LoginForm from './lib/components/LoginForm.svelte'
  import Home from './lib/views/Home.svelte';

  let isLogged: boolean
  let activePage: string = "Home"

  onMount(async () => {
    isLogged = localStorage.getItem('authToken') !== null
  })
 
</script>

<div>
  <Header bind:isLogged={isLogged}/>
  <main>
    {#if !isLogged}
      <h2>Log in</h2>
      <LoginForm bind:isLogged={isLogged}/>
    {:else}
      {#if activePage === "Home"}
        <Home/>
      {/if}
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