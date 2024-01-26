<script setup lang="ts">
import BoiteIngredient from "@/components/BoiteIngredient.vue";
import type { Ingredient } from "@/types";
import { type Ref, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const id = route.params.id;

const ingredient: Ref<Ingredient> = ref({
  id: Number(id),
  nom: "Lardon de Grotichon",
  type: {
    id: 0,
    nom: "Viande",
    couleur: "Marron",
  },
});
</script>

<template>
  <BoiteIngredient :ingredient="ingredient" :key="ingredient.id" />
</template>
