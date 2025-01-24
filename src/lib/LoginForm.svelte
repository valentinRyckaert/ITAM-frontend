<script lang="ts">

    import { login } from "../api/auth"

    let username = $state("")
    let password = $state("")
    let { isLogged = $bindable() } = $props()

    function loginToAPI() {
        login(username, password).then(() => { isLogged = true })
    }

</script>

<div>
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username}/>

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password}/>

    <button onclick="{loginToAPI}">Log in</button>
</div>