<script setup lang="ts">
import type { Ingredient } from "@/types";
const props = defineProps<{ ingredient: Ingredient }>();
</script>

<template>
  <div class="ingredient">
    <div class="top">
      {{ ingredient.id }}
    </div>
    <div class="content">
      <div class="group">
        <label>Nom : </label>
        {{ ingredient.nom }}
      </div>
      <div>
        <label>Catégorie :</label>
        {{ ingredient.type.nom }}
      </div>
    </div>
  </div>
</template>
