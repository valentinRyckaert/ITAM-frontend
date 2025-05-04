<script lang="ts">
  import { onMount } from 'svelte'
  import Header from './lib/views/layout/Header.svelte'
  import LoginForm from './lib/components/auth/LoginForm.svelte'
  import Home from './lib/views/Home.svelte';
  import Footer from './lib/views/layout/Footer.svelte';
  import Devices from './lib/views/Devices.svelte'
  import Packages from './lib/views/Packages.svelte'
  import Users from './lib/views/Users.svelte'
  import Account from './lib/views/Account.svelte'
  import About from './lib/views/About.svelte'

  let isLogged: boolean = $state(false)
  let activePage: string = $state('home')
  let errorLogged: boolean = $state(false)

  onMount(() => {
    isLogged = !(localStorage.getItem('authToken') === null || localStorage.getItem('authToken') === '')
    if(localStorage.getItem('activePage')) activePage = localStorage.getItem('activePage')
  })

  $effect(() => {
    localStorage.setItem('activePage', activePage) 
  })
 
</script>

<div>
  <Header bind:isLogged bind:activePage/>
  <main>
    {#if !isLogged}
      {#if errorLogged}
        <p style="color: red;">Your token has expired. You have been so disconntected. Please login another time.</p>
      {/if}
      <h2>Log in</h2>
      <LoginForm bind:isLogged={isLogged}/>
    {:else}
      {#if activePage === "home"}
        <Home/>
      {:else if activePage === "devices"}
        <Devices/>
      {:else if activePage === "packages"}
        <Packages/>
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