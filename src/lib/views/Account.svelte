<script lang="ts">
    import { getCurrentUser } from '../../api/auth'
    import PutModal from '../components/data/modals/PutModal.svelte'

    let showModal: boolean = $state(false)

</script>

<h1>Account</h1>

{#await getCurrentUser()}
    <p>Loading user information...</p>
{:then currentUser}
    <div class="user-summary">
        <h2>{currentUser.USER_username}</h2>
        <p>password : ****** <button onclick={() => showModal = true}>changer</button></p>
        <p>is Active: <input type="checkbox" checked={currentUser.USER_isActive} disabled></p>
    </div>
    {#if showModal}
        <PutModal bind:showModal dataName="users" objectToModify={currentUser} objectConfig={{
            USER_id: ['id','number', null],
            USER_username: ['username','text', null],
            USER_passHash: ['new password', 'password', ''],
            USER_type: ['type', 'number', null],
            USER_isActive: ['is active', 'checkbox', null]
        }}/>
    {/if}
{/await}

<style lang="scss">
    .user-summary {
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    button {
        &:hover {
            background-color: rgb(121, 120, 120);
        }
        border: transparent;
        border-radius: 7px;
        color: white;
        padding-block: 7px;
        padding-inline: 9px;
        margin-left: 10px;
        background-color: rgb(100, 100, 100);
    }

    p {
        font-size: 1.1em;
        margin: 5px 0;
    }
</style>
