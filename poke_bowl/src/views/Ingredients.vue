<script setup lang="ts">
import BoiteIngredient from "@/components/BoiteIngredient.vue";
import type { Ingredient } from "@/types";
import { ref, type Ref, watch } from "vue";
import { loadScript } from "vue-plugin-load-script";
import { useRouter } from "vue-router";
const router = useRouter();

const ingredients: Ref<Ingredient[]> = ref([
  {
    id: 0,
    nom: "Lardon de Grotichon",
    type: {
      id: 0,
      nom: "Viande",
      couleur: "Marron",
    },
  },
  {
    id: 1,
    nom: "Froussardine en boîte",
    type: {
      id: 1,
      nom: "Poisson",
      couleur: "Bleu",
    },
  },
  {
    id: 2,
    nom: "Qwilfish",
    type: {
      id: 0,
      nom: "Poisson",
      couleur: "Bleu",
    },
  },
  {
    id: 3,
    nom: "Cuisse de Grenousse",
    type: {
      id: 0,
      nom: "Viande",
      couleur: "Marron",
    },
  },
]);

loadScript("/js/search.js");

const searchTerm = ref(""); // Terme de recherche lié à la saisie de l'utilisateur
const filteredIngredients = ref<Ingredient[]>([]); // Résultats filtrés à afficher

watch(searchTerm, (newValue) => {
  if (newValue) {
    // Mettre à jour filteredIngredients seulement si searchTerm n'est pas vide
    filteredIngredients.value = search(newValue, ingredients.value);
  } else {
    // Si searchTerm est vide, réinitialiser filteredIngredients à vide
    filteredIngredients.value = [];
  }
});

function selectIngredient(ingredient: Ingredient) {
  // Action à effectuer, par exemple, naviguer vers une page de détail ou ajouter à une liste
  router.push({ path: `/ingredient/${ingredient.id}` });
}
</script>

<template>
  <div>
    <input type="text" id="recherche" name="recherche" v-model="searchTerm" />
    <!-- Afficher les résultats seulement si searchTerm n'est pas vide -->
    <div
      class="resultats-recherche"
      v-if="searchTerm && filteredIngredients.length"
    >
      <div
        class="resultat"
        v-for="ingredient in filteredIngredients"
        @click="selectIngredient(ingredient)"
      >
        {{ ingredient.nom }}
      </div>
    </div>
  </div>

  <BoiteIngredient
    v-for="ingredient in ingredients"
    :key="ingredient.id"
    :ingredient="ingredient"
  />
</template>

<style>
/* Exemple de styles pour les résultats de recherche */
.resultats-recherche {
  border: 1px solid #ccc;
  border-top: none;
}

.resultat {
  padding: 10px;
  cursor: pointer;
  border-top: 1px solid #eee;
}

.resultat:hover {
  background-color: #f9f9f9;
}
</style>
