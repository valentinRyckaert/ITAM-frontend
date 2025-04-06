<script lang='ts'>
    import DataTable from "../components/data/DataTable.svelte";
</script>

<h1>Users</h1>
<DataTable
    dataName="users"
    showOrDeleteConfig={{
        USER_id: ['id','number'],
        USER_username: ['username','text'],
        USER_type: ['type', 'number'],
        USER_isActive: ['is active', 'checkbox']
    }}
    createOrUpdateConfig={{
        USER_id: ['id','number'],
        USER_username: ['username','text'],
        USER_passHash: ['new password', 'text', ''],
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