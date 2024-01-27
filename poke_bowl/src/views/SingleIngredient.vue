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
});

fetch('https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/ingredients/' + encodeURI(String(id)))
.then(responsehttp => responsehttp.json())
  .then(responseJSON => {
    ingredient.value.id = responseJSON["id"];
    ingredient.value.nom = responseJSON["nom"];
  });


</script>

<template>
  <BoiteIngredient :ingredient="ingredient" :key="ingredient.id" />
</template>
