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
  <div class="contentBox">
    <div class="top">
      {{ recette.nom }}
    </div>
    <div class="group">
      <label>Temps de préparation : {{ recette.tempsPrepa }}min</label>
    </div>
    <div class="group">
      <BoiteIngredient
        v-for="ingredient in ingr"
        :key="ingredient.id"
        :ingredient="ingredient"
      />
    </div>
  </div>
</template>
