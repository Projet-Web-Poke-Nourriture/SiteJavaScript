<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="pokebowl">
    <div class="pokebowl-content">
      <h1 class="pokebowl-title">Bienvenue sur PokeBowl</h1>
      <h3 class="pokebowl-subtitle">Le site faisant des recettes avec des Pokémon</h3>
      <div @click="router.push({ name: 'allRecettes' })" class="pokebowl-button">Découvrir nos recettes</div>
    </div>
  </div>
</template>

<style scoped>

.pokebowl {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokebowl-content {
  text-align: center;
  color: #fff;
}

.pokebowl-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #333333;
}

.pokebowl-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #333333;
}

.pokebowl-button {
  background-color: #FFCC00;
  color: #333333;
  font-size: 1.2rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  display: inline-block;
  margin: 0 auto;
}

.pokebowl-button:hover {
  background-color: #f0ad4e;
  cursor: pointer;
}
</style>
