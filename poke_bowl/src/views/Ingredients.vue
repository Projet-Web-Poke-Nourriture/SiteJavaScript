<script setup lang="ts">
import BoiteIngredient from "@/components/BoiteIngredient.vue";
import type { Ingredient } from "@/types";
import { ref, type Ref, watch } from "vue";
import { loadScript } from "vue-plugin-load-script";
import { useRouter } from "vue-router";
const router = useRouter();

const ingredients: Ref<Ingredient[]> = ref([]);

fetch('https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/ingredients')
  .then(responsehttp => responsehttp.json())
  .then(responseJSON => {
    ingredients.value = responseJSON["hydra:member"];
  });

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
  router.push({ path: `/ingredient/${ingredient.id}` });
}

const goToFormIngredient = () => {
      router.push({ name: 'formIngredient' }); // Utilisez le nom de la route des recettes
    };
</script>

<template>
  <div>
    <input type="text" id="recherche" name="recherche" v-model="searchTerm" />
    <button @click="goToFormIngredient">Créer un ingrédient</button>
    <!-- Afficher les résultats seulement si searchTerm n'est pas vide -->
    <div v-if="searchTerm">
      <div class="resultats-recherche" v-if="filteredIngredients.length">
        <div
            class="resultat"
            v-for="ingredient in filteredIngredients"
            :key="ingredient.id"
            @click="selectIngredient(ingredient)"
        >
          {{ ingredient.nom }}
        </div>
      </div>
    </div>

    <!-- Ici commence la grille pour les ingrédients -->
    <div class="ingredient-grid">
      <BoiteIngredient
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          :ingredient="ingredient"
      />
    </div>
  </div>
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
