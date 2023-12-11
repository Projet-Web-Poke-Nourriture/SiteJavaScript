<script setup lang="ts">
import BoiteRecette from "@/components/BoiteRecette.vue";
import type { Recette } from "@/types";
import { ref, type Ref } from "vue";

const recettes: Ref<Recette[]> = ref([
  {
    id: 0,
    nom: "Pates Carbo",
    categorie: {
      id: 1,
      nom: "Poisson",
      couleur: "Bleu",
    },
    recommander: false,
    tempsPrepa: 50,
    ingredients: [
      {
        ingredient: {
          id: 0,
          nom: "Lardon de Grotichon",
          type: {
            id: 0,
            nom: "Viande",
            couleur: "Marron",
          },
        },
        nombreNecessaire: 0,
        poidsNecessaire: 300,
      },
      {
        ingredient: {
          id: 2,
          nom: "Pates",
          type: {
            id: 0,
            nom: "Féculent",
            couleur: "Beige",
          },
        },
        nombreNecessaire: 0,
        poidsNecessaire: 600,
      },
    ],
  },
  {
    id: 1,
    nom: "Thon Fromage",
    categorie: {
      id: 1,
      nom: "Poisson",
      couleur: "Bleu",
    },
    recommander: true,
    tempsPrepa: 10,
    ingredients: [
      {
        ingredient: {
          id: 2,
          nom: "Nigirigon entier",
          type: {
            id: 0,
            nom: "Poisson",
            couleur: "Bleu",
          },
        },
        nombreNecessaire: 0,
        poidsNecessaire: 150,
      },
      {
        ingredient: {
          id: 3,
          nom: "Fromage",
          type: {
            id: 0,
            nom: "Lait",
            couleur: "Blanc",
          },
        },
        nombreNecessaire: 0,
        poidsNecessaire: 150,
      },
    ],
  },
]);
</script>

<template>
    <BoiteRecette v-for="recette in recettes" :key="recette.id" :recette="recette"/>
</template>
