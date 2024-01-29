<script setup lang="ts">
import BoiteRecette from "@/components/BoiteRecette.vue";
import type { Recette } from "@/types";
import { ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;

const recette: Ref<Recette> = ref({});
  fetch('https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/recettes/' + encodeURI(String(id)))
.then(responsehttp => responsehttp.json())
  .then(responseJSON => {
    console.log(responseJSON);
    recette.value = responseJSON;
  });
</script>

<template>
  <BoiteRecette :key="recette.id" :recette="recette"></BoiteRecette>
</template>
