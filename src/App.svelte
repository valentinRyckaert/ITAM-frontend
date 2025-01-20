<script lang="ts">
  import { login, getCurrentUser } from './api/auth'
  import { getAllFromDB } from './api/data'

  let response
  let text = $state("")

  async function do_login() {
    response = await login("admin","admin")
    console.log(response)
  }

  async function getCurrent() {
    response = await getCurrentUser()
    console.log(response)
  }

  async function getAll() {
    response = await getAllFromDB(text)
    console.log(response)
  }

</script>

<div>
  <button onclick={do_login}>login</button>
  <button onclick={getCurrent}>me</button>
  <button onclick={getAll}>getAll</button>
  <input type="text" bind:value={text}>
</div>