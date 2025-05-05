<script lang="ts">

  let { activePage = $bindable() } = $props()

</script>

<footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <a href="#about" onclick={() => { activePage = "about" }}>À propos</a>
        <a href="https://github.com/itam-project" target="_blank">GitHub</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {new Date().getFullYear()} ITAM. Tous droits réservés.</p>
    </div>
</footer>
  
<style lang="scss">
    .footer {
      bottom: 0;
      left: 0;
      right: 0;
      position: fixed;
      width: 100%;
      background-color: #2c3e50;
      color: white;
      text-align: center;
      margin-top: 35px;
      border: hidden;
      padding: 10px;
  
      .footer-content {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
  
        .footer-links,
        .social-media {
          margin: 10px;
  
          a {
            color: white;
            text-decoration: none;
            margin: 0 10px;
  
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
  
      .footer-bottom {
        margin-top: 10px;
        font-size: 0.9em;
      }
    }
</style>