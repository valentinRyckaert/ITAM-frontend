<script lang="ts">
    import DataTable from '../components/DataTable.svelte'
    import { getCurrentUser } from '../../api/auth'

    let currentUsername: string

    function getUser() {
        const user = getCurrentUser()
        currentUsername = user["username"]
    }

</script>

<h2>Welcome {currentUsername}</h2>
<DataTable dataName="devices" config={{
    DEV_id: '#',
    DEV_name: 'name',
    DEV_os: 'os',
    DG_id: 'group id'
}}/>

<style lang="scss">
    h2 {
        text-align: center;
        color: #333;
        margin-bottom: 30px;
    }
</style>