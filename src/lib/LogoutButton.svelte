<script>
    import { logout } from '../api/auth'

    let { setLogout } = $props()

    function logoutFromAPI() {
        logout()
        setLogout()
    }
    
</script>

<div>
    <button onclick="{logoutFromAPI}">logout</button>
</div>