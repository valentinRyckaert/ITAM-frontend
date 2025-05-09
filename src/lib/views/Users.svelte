<script lang='ts'>
    import { onMount } from "svelte"
    import DataTable from "../components/data/DataTable.svelte"

    let { currentUser = $bindable() }: any = $props()
    let hasRight: boolean = $state(false)

    onMount(() => {
        hasRight = currentUser.USER_type === 0
    })
</script>

{#if hasRight}
    <h1>Users</h1>
    <DataTable
        dataName="users"
        showOrDeleteConfig={{
            USER_id: 'id',
            USER_username: 'username',
            USER_type: 'type',
            USER_isActive: 'is active'
        }}
        createOrUpdateConfig={{
            USER_id: ['id','number'],
            USER_username: ['username','text'],
            USER_passHash: ['new password', 'password', ''],
            USER_type: ['type', 'number'],
            USER_isActive: ['is active', 'checkbox']
        }}
        tableHeaders={{
            USER_id: '#',
            USER_username: 'username',
            USER_type: 'type',
            USER_isActive: 'is active'
        }}
    />
{:else}
    <h1>Hmmmmmm...</h1>
    <p>There is a problem with your access rights. Please contact your administrator.</p>
{/if}