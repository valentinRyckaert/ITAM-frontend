<script lang="ts">
    import { getCurrentUser } from '../../api/auth'

    let currentUser: any

    async function getUser() {
        currentUser = await getCurrentUser()
    }

</script>

<h1>Account</h1>

{#await getUser()}
    <p>Loading user information...</p>
{:then}
    <div class="user-summary">
        <h2>Resumé : {currentUser.USER_username}</h2>
        <p>password : ****** <button>changer</button></p>
        <p>is Active: {currentUser.USER_isActive}</p>
    </div>
{/await}

<style lang="scss">
    .user-summary {
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    p {
        font-size: 1.1em;
        margin: 5px 0;
    }
</style>
