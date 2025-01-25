<script lang="ts">
  import { onMount } from 'svelte'
  import Header from './lib/views/layout/Header.svelte'
  import LoginForm from './lib/components/LoginForm.svelte'
  import Home from './lib/views/Home.svelte';
  import Footer from './lib/views/layout/Footer.svelte';
  import Devices from './lib/views/Devices.svelte'
  import Packages from './lib/views/Packages.svelte'
  import Deployement from './lib/views/Deployement.svelte'
  import Users from './lib/views/Users.svelte'
  import Account from './lib/views/Account.svelte'
  import About from './lib/views/About.svelte'

  let isLogged: boolean
  let activePage: string = "home"

  onMount(async () => {
    isLogged = localStorage.getItem('authToken') !== null
  })
 
</script>

<div>
  <Header bind:isLogged={isLogged} bind:activePage={activePage}/>
  <main>
    {#if !isLogged}
      <h2>Log in</h2>
      <LoginForm bind:isLogged={isLogged}/>
    {:else}
      {#if activePage === "home"}
        <Home/>
      {:else if activePage === "devices"}
        <Devices/>
      {:else if activePage === "packages"}
        <Packages/>
      {:else if activePage === "deployement"}
        <Deployement/>
      {:else if activePage === "users"}
        <Users/>
      {:else if activePage === "account"}
        <Account/>
      {:else if activePage === "about"}
        <About/>
      {/if}
    {/if}
  </main>
  <Footer bind:activePage={activePage}/>
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