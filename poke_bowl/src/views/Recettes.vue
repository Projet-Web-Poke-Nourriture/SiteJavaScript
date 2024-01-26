<script setup lang="ts">
import BoiteRecette from "@/components/BoiteRecette.vue";
import type { Recette } from "@/types";
import { ref, type Ref, watch } from "vue";
import { loadScript } from "vue-plugin-load-script";
import { useRouter } from "vue-router";
const router = useRouter();

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
    etapes: [
      { numero: 1, descriptif: "passe" },
      { numero: 2, descriptif: "passe2" },
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
    etapes: [
      { numero: 1, descriptif: "passe" },
      { numero: 2, descriptif: "passe2" },
    ],
  },
]);

loadScript("/js/search.js");

const searchTerm = ref(""); // Terme de recherche lié à la saisie de l'utilisateur
const filteredRecettes = ref<Recette[]>([]); // Résultats filtrés à afficher

watch(searchTerm, (newValue) => {
  if (newValue) {
    // Mettre à jour filteredIngredients seulement si searchTerm n'est pas vide
    filteredRecettes.value = search(newValue, recettes.value);
  } else {
    // Si searchTerm est vide, réinitialiser filteredIngredients à vide
    filteredRecettes.value = [];
  }
});

function selectIngredient(recette: Recette) {
  // Action à effectuer, par exemple, naviguer vers une page de détail ou ajouter à une liste
  router.push({ path: `/recette/${recette.id}` });
}

const goToRecettes = () => {
      router.push({ name: 'formRecette' }); // Utilisez le nom de la route des recettes
    };
</script>

<template>
  <input type="text" id="recherche" name="recherche" v-model="searchTerm" />

  <!-- Bouton pour créer des recettes -->
  <button @click="goToRecettes">Créer une recette</button>

  <!-- Afficher les résultats seulement si searchTerm n'est pas vide -->
  <div class="resultats-recherche" v-if="searchTerm && filteredRecettes.length">
    <div
      class="resultat"
      v-for="recette in filteredRecettes"
      :key="recette.id"
      @click="selectIngredient(recette)"
    >
      {{ recette.nom }}
    </div>
  </div>

  <BoiteRecette
    v-for="recette in recettes"
    :key="recette.id"
    :recette="recette"
  />
</template>
