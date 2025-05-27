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
  let activePage: string = $state('')
  let errorLogged: boolean = $state(false)
  let currentUser: any = $state()

  onMount(() => {
    isLogged = !(localStorage.getItem('authToken') === null || localStorage.getItem('authToken') === '')
    if(localStorage.getItem('activePage')) activePage = localStorage.getItem('activePage') ?? ''
  })

  $effect(() => {
    localStorage.setItem('activePage', activePage)
  })
 
</script>

<div>
  <Header bind:isLogged bind:activePage bind:currentUser/>
  <main>
    {#if !isLogged}
      {#if errorLogged}
        <p style="color: red;">Your token has expired. You have been so disconntected. Please login another time.</p>
      {/if}
      <h2>Log in</h2>
      <LoginForm bind:isLogged={isLogged}/>
    {:else}
      {#if activePage === "devices"}
        <Devices/>
      {:else if activePage === "packages"}
        <Packages/>
      {:else if activePage === "users"}
        <Users bind:currentUser/>
      {:else if activePage === "account"}
        <Account/>
      {:else if activePage === "about"}
        <About/>
      {:else}
        <Home/>
      {/if}
    {/if}
  </main>
  <Footer bind:activePage={activePage}/>
</div>

<style lang="scss">
  main {
    padding-top: 20px;
    padding-inline: 20px;
    padding-bottom: 15%;
    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }
  }
</style>