<script lang="ts">
    let { listLabels, activeButton = $bindable() }: any = $props()
</script>
  
  <div class="container">
      {#each listLabels as label}
          <label class="radio-label">
              <input type="radio" name="e" class="radio-input" onclick={() => { activeButton = label }} value={label} bind:group={activeButton}/>
              <span class="radio-custom"></span>
              {label}
          </label>
      {/each}
  </div>
  
  <style lang="scss">
  .container {
      display: flex;
      flex-direction: column;
      gap: 0.5em; // Espace entre les boutons radio
  }
  
  .radio-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 1em;
      color: #333;
  
      // Ajout d'un effet au survol
      &:hover {
          color: #2c3e50; // Couleur au survol
      }
  }
  
  .radio-input {
      display: none; // Masquer l'input radio par défaut
  }
  
  .radio-custom {
      width: 1.2em;
      height: 1.2em;
      border: 2px solid #2c3e50; // Couleur de la bordure
      border-radius: 50%; // Forme ronde
      position: relative;
      margin-right: 0.5em; // Espace entre le bouton et le label
      transition: background-color 0.3s ease;
  
      // État actif
      &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0.6em;
          height: 0.6em;
          background-color: #2c3e50; // Couleur de l'élément actif
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0); // Masqué par défaut
          transition: transform 0.3s ease;
      }
  }
  
  // Afficher l'élément actif
  .radio-input:checked + .radio-custom::after {
      transform: translate(-50%, -50%) scale(1); // Afficher l'élément actif
  }
  </style>
  