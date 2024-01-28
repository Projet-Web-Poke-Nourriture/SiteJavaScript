<script setup lang="ts">

// TODO
// ne pas montrer la suppression des ingrédients à non admin

import BoiteIngredient from "@/components/BoiteIngredient.vue";
import type { Ingredient } from "@/types";
import { ref, type Ref, watch } from "vue";
import { loadScript } from "vue-plugin-load-script";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
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

const ingredientIdToDelete = ref(0); // Référence pour stocker l'ID entré par l'utilisateur

const deleteIngredient = async (id) => {
  if (!id) return; // Vérifier si l'ID est fourni
  try {
    const response = await fetch(`https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/ingredients/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      // Supprimer l'ingrédient du tableau local après la suppression réussie
      ingredients.value = ingredients.value.filter(ingredient => ingredient.id !== id);
    } else {
      console.error("Erreur lors de la suppression de l'ingrédient");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'ingrédient", error);
  }
};

//Récupération de l'utilisateur
const userToken = localStorage.getItem("userToken");
const user = ref();
const roles = new Proxy([],{});
if (userToken) {
  const decoded = jwtDecode(userToken);
  user.value = decoded;
  const roles = user.value.roles;
}

// Vérification si l'utilisateur est premium
const isAdmin = ref(roles.includes("ADMIN"))

</script>

<template>
  <div class="ingredient-search-create">
    <input type="text" id="recherche" name="recherche" v-model="searchTerm" placeholder="Rechercher un ingrédient ..." />
    <button @click="goToFormIngredient">Créer un ingrédient</button>
  </div>
  <div v-if="isAdmin">
    <input type="number" v-model="ingredientIdToDelete" placeholder="Entrez l'ID à supprimer" />
    <button @click="deleteIngredient(ingredientIdToDelete)">Supprimer l'ingrédient</button>
  </div>
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
</template>


<style>
.ingredient-search-create {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
}
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
