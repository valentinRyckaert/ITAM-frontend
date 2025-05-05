<script>
// @ts-nocheck
    import { logout } from '../../../api/auth'

    let { isLogged = $bindable() } = $props()

    function logoutFromAPI() {
        logout()
        isLogged = false
    }
    
</script>

<div>
    <div href="#" onclick="{logoutFromAPI}">Logout</div>
</div>