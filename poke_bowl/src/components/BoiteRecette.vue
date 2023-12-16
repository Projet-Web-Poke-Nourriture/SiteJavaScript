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
  <div class="recette">
    <div class="top">
      <h2 class="titre">{{ recette.nom }}</h2>
    </div>
    <div class="resumeRecette">
      <div class="infoComp">
        <label>Temps de préparation : {{ recette.tempsPrepa }}min</label>
      </div>
      <div class="ingredients">
        <BoiteIngredient
          v-for="ingredient in ingr"
          :key="ingredient.id"
          :ingredient="ingredient"
        />
      </div>
    </div>
    <div class="etapes">
      <h3 class="titre">Etapes</h3>
      <ul>
        <li v-for="etape in recette.etapes">
          <span>{{ etape.descriptif }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
  .recette{
    background-color: white;
  }

  .resumeRecette{
    background-color: yellow;
  }

  .titre{
    text-align: center;
  }

  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li{
    text-align: center;
  }
</style>