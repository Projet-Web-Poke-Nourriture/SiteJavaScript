<script setup lang="ts">
import {useRouter} from 'vue-router';
const router = useRouter();
</script>


<template>
  <div id="wrapper">
    <header>
      <h1 @click="router.push('/PokeBowl')">PokeBowl</h1>
      <nav>
        <div @click="router.push({name:'AllIngredients'})">Les ingrédients</div>
        <div @click="router.push({name:'allUsers'})">Les utilisateurs</div>
        <div @click="router.push({name:'allRecettes'})">Les recettes</div>
        <div >S'inscrire</div>
        <div >Se connecter</div>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>


<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #FFFFFF; /* Fond blanc pour la page entière */
}

header {
  width: 100%;
  position: sticky;
  top: 0px;
  background-color: #FFCC00; /* Fond jaune pour l'en-tête */
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Optionnel: ajouter une ombre pour l'en-tête */
}

header h1 {
  text-align: center;
  font-family: 'Arial', sans-serif; /* Utiliser la même police que le reste du site */
  font-weight: 700;
  color: #333333; /* Texte en noir pour le titre */
}

nav {
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  margin: 0 auto;
}

nav > div {
  padding: 10px;
  background-color: #FFCC00; /* Fond jaune pour les boutons de la barre de navigation */
  flex-grow: 1;
  text-align: center;
  border: none; /* Supprimer les bordures si vous ne les voulez pas */
  color: #333333; /* Texte en noir pour les liens de la navigation */
}

nav > div:hover {
  background-color: #f0ad4e; /* Couleur de fond au survol pour les boutons de la navigation */
  cursor: pointer;
}

main {
  max-width: 1280px;
  width: 780px;
  padding: 10px;
  background-color: #FFFFFF; /* Fond blanc pour le contenu principal */
  flex-grow: 1;
}

@media (max-width: 800px) {
  main {
    width: 80%;
  }
}
</style>
