<script lang="ts">
    import LogoutButton from '../../components/auth/LogoutButton.svelte'
    import { getCurrentUser } from '../../../api/auth'
    import { onMount } from 'svelte'

    let currentUser: any
    let { isLogged = $bindable(), activePage = $bindable() } = $props()

    async function getUser() {
        currentUser = await getCurrentUser()
    }

    onMount(async() => {
        await getUser().catch((error) => {
            isLogged = false
        })
    })

    $effect(() => {

    })
</script>

<nav id="navbar">
    <h1><a href="#" onclick={() => { activePage = "home" }}>
        ITAM
    </a></h1>
    <ul>
        <li><a href="#devices" onclick={() => { activePage = "devices" }}>
            Devices
        </a></li>
        <li><a href="#packages" onclick={() => { activePage = "packages" }}>
            Packages
        </a></li>
        {#if isLogged}
            {#await getUser()}
            {:then}
                {#if currentUser.USER_type === 0}
                    <li><a href="#users" onclick={() => { activePage = "users" }}>
                        Users
                    </a></li>
                {/if}
            {/await}
            <li class="end"><a href="#account" onclick={() => { activePage = "account" }}>
                Account
            </a></li>
            <li class="end"><a href="#" onclick={() => { activePage = "home" }}>
                <LogoutButton bind:isLogged={isLogged}/>
            </a></li>
        {/if}
        </ul>
</nav>

<style lang="scss">

    #navbar {
        list-style-type: none;
        margin: 0 0 20px 0;
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

        ul > li {
            &:hover {
                text-decoration: underline;
            }
        }

        li {
            float: left;
            display: block;
            color: white;
            text-align: center;
            margin-inline: 10px;
            cursor: pointer;
        }

        a {
            color: white;
            text-decoration: none;
        }

        .end {
            float: right;
        }
    }
</style>