<script lang="ts">
    import LogoutButton from '../lib/LogoutButton.svelte'

    let { isLogged = $bindable() } = $props()

</script>

<nav id="navbar">
    <h1>ITAM</h1>
    <ul>
      <li>Devices</li>
      <li>Packages</li>
      <li>Deployement</li>
      <li>Users</li>
      {#if isLogged}
        <li class="end">Account</li>
        <li class="end"><LogoutButton bind:isLogged={isLogged}/></li>
      {/if}
    </ul>
</nav>

<style lang="scss">

    #navbar {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #4d8f4f;
        border-style: hidden;
        border-radius: 10px;
        
        h1 {
            float: left;
            display: block;
            color: white;
            text-align: center;
            margin: 10px;
            cursor: pointer;
        }

        li {
            float: left;
            display: block;
            color: white;
            text-align: center;
            margin-inline: 10px;
            cursor: pointer;
        }

        .end {
            float: right;
        }
    }
</style>