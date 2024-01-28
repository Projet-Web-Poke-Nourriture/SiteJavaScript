<script lang="ts">

// TODO
//Finir la logique de la création de la recette

import { defineComponent, ref } from "vue";
import type { Recette, Ingredient, Utilisateur } from "@/types";
import { loadScript } from "vue-plugin-load-script";

loadScript("/js/search.js");

export default defineComponent({
  setup() {
    // Ici, vous devez remplacer cette partie par votre propre logique pour récupérer l'utilisateur connecté
    const utilisateurConnecte = ref<Utilisateur>({
      id: 1, // Exemple d'ID utilisateur
      login: "UserExample",
      email: "user@example.com",
      password: "securepassword",
      premium: true,
      roles: ["ROLE_USER"],
    });

    let recettePost = {
      nom: "",
      etapes: "",
      tempsPrepa: 0,
      auteur:
        "/api/utilisateurs/1",
    };

    let etapes = [];
    let ingredientsRecette= []

    const searchTerm = ref("");
    const searchResults = ref<Ingredient[]>([]);
    const allIngredients = ref<Ingredient[]>([]);

    fetch(
      "https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/ingredients"
    )
      .then((responsehttp) => responsehttp.json())
      .then((responseJSON) => {
        allIngredients.value = responseJSON["hydra:member"];
      });

    const submitRecette = async () => {
      etapes.forEach(etape => {
        recettePost.etapes = recettePost.etapes + "\\" + etape.descriptif;
      });
      try {
        const response = await fetch(
          "https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/recettes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recettePost),
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Recette soumise avec succès", responseData);
        // Redirection ou traitement après la soumission
      } catch (error) {
        console.error("Erreur lors de la soumission de la recette:", error);
      }
      
    };

    const searchIngredients = () => {
      if (!searchTerm.value) {
        searchResults.value = [];
        return;
      }
      searchResults.value = search(searchTerm.value, allIngredients.value);
    };

    const addIngredientFromSearch = (ingredient: Ingredient) => {
      ingredientsRecette.push({
        ingredient,
        nombreNecessaire: 0, // Valeur par défaut ou laisser l'utilisateur choisir
      });
      searchTerm.value = ""; // Réinitialiser le terme de recherche
      searchResults.value = []; // Vider les résultats de recherche
    };

    const removeIngredient = (index: number) => {
      ingredientsRecette.splice(index, 1);
      console.log(ingredientsRecette);
    };

    const addEtape = () => {
      etapes.push({
        numero: etapes.length + 1,
        descriptif: "",
      });
    };

    return {
      recettePost,
      etapes,
      ingredientsRecette,
      searchTerm,
      searchResults,
      // Ajoutez ici les méthodes retournées
      submitRecette,
      searchIngredients,
      addIngredientFromSearch,
      removeIngredient,
      addEtape,
    };
  },
});
</script>

<template>
  <div class="create-recette">
    <h1>Créer une nouvelle recette</h1>

    <form @submit.prevent="submitRecette">
      <!-- Nom de la recette -->
      <div>
        <label for="nom">Nom de la recette:</label>
        <input type="text" id="nom" v-model="recettePost.nom" required />
      </div>

      <!-- Temps de préparation -->
      <div>
        <label for="tempsPrepa">Temps de préparation (en minutes):</label>
        <input
          type="number"
          id="tempsPrepa"
          v-model.number="recettePost.tempsPrepa"
          required
        />
      </div>

      <!-- Ingrédients -->
      <fieldset>
        <legend>Ingrédients</legend>
        <div
          v-for="(ingredient, index) in ingredientsRecette"
          :key="index"
          class="ingredient"
        >
          <input
            type="text"
            v-model="ingredient.ingredient.nom"
            placeholder="Nom de l'ingrédient"
            disabled
          />
          <input
            type="number"
            v-model="ingredient.nombreNecessaire"
            placeholder="Quantité"
          />
          <button @click.prevent="removeIngredient(index)">Supprimer</button>
        </div>

        <!-- Champ de recherche d'ingrédients -->
        <input
          type="text"
          placeholder="Rechercher un ingrédient"
          v-model="searchTerm"
          @input="searchIngredients"
        />
        <ul class="search-results" v-if="searchResults.length">
          <li
            v-for="result in searchResults"
            :key="result.id"
            @click="addIngredientFromSearch(result)"
          >
            {{ result.nom }}
          </li>
        </ul>
      </fieldset>

      <!-- Étapes -->
      <fieldset>
        <legend>Étapes</legend>
        <div
          v-for="(etape, index) in etapes"
          :key="index"
          class="etape"
        >
          <label>Étape {{ etape.numero }}:</label>
          <textarea v-model="etape.descriptif" rows="3"></textarea>
        </div>
        <button @click.prevent="addEtape">Ajouter une étape</button>
      </fieldset>

      <button type="submit">Créer la recette</button>
    </form>
  </div>
</template>
