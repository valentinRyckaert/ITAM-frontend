<script lang='ts'>
    import DataTable from "../components/data/DataTable.svelte";
</script>

<h1>Users</h1>
<DataTable
    dataName="users"
    objectConfig={{
        USER_id: ['id','number'],
        USER_username: ['username','text'],
        USER_passHash: ['password hash', 'text'],
        USER_type: ['type', 'number'],
        USER_isActive: ['is active', 'text']
    }}
    tableHeaders={{
        USER_id: '#',
        USER_username: 'username',
        USER_passHash: 'password hash',
        USER_type: 'type',
        USER_isActive: 'is active'
    }}
/>