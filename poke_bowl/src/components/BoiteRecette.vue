<script setup lang="ts">
import type { Ingredient, Recette } from "@/types";
import BoiteIngredient from "@/components/BoiteIngredient.vue";
import { ref, type Ref } from "vue";


const props = defineProps<{ recette: Recette }>();
let ingr: Ref<Ingredient[]> = ref([]);
for (let a in props.recette.ingredients) {
  ingr.value.push(props.recette.ingredients[a].ingredient);
}
</script>

<template>
  <div class="recette-card">
    <h2 class="recette-titre"><router-link
          :to="{ name: 'singleRecette', params: { id: recette.id } }"
          class="clickable"
          >{{ recette.nom }}</router-link></h2>
    <p class="recette-temps">Temps de préparation : {{ recette.tempsPrepa }} min</p>
    <div class="recette-ingredients">
      <h3>Ingrédients</h3>
      <ul>
        <li v-for="ingredient in recette.ingredients" :key="ingredient.ingredient.id">
          <boite-ingredient :ingredient="ingredient.ingredient"></boite-ingredient>
        </li>
      </ul>
    </div>
    <div class="recette-etapes">
      <h3>Étapes</h3>
      <ol>
        <li v-for="etape in recette.etapes" :key="etape.numero">
          {{ etape.descriptif }}
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.recette-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.recette-titre {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

.recette-categorie {
  font-style: italic;
  color: #666;
}

.recette-temps {
  font-weight: bold;
}

.recette-ingredients h3, .recette-etapes h3 {
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.recette-ingredients ul, .recette-etapes ol {
  margin-left: 20px;
  list-style-type: disc;
}
</style>
