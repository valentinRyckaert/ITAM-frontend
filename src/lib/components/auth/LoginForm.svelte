<script lang="ts">

    import { login } from "../../../api/auth"

    let username = $state("")
    let password = $state("")
    let { isLogged = $bindable() } = $props()

    function loginToAPI() {
        login(username, password).then(() => { isLogged = true })
    }

</script>

<div class="form">
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username}/>

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password}/>

    <button onclick="{loginToAPI}">Log in</button>
</div>

<style lang="scss">

$form-background: #f7f9fc;
$form-border-radius: 8px;
$label-color: #333;
$input-border: #ccc;
$button-background: #4d8f4f;
$button-color: #fff;

.form {
  background-color: $form-background;
  border-radius: $form-border-radius;
  padding: 20px;
  max-width: 400px;
  margin: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  label {
    display: block;
    margin-bottom: 8px;
    color: $label-color;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid $input-border;
    border-radius: 4px;
    font-size: 16px;

    &:focus {
      border-color: $button-background;
      outline: none;
      box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
    }
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: $button-background;
    color: $button-color;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: darken($button-background, 20%)
    }
  }
}

</style>