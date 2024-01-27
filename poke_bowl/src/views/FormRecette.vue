<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Categorie, Recette, Ingredient, Utilisateur } from "@/types";
import { loadScript } from "vue-plugin-load-script";

loadScript("/js/search.js");

export default defineComponent({
  setup() {
    // Ici, vous devez remplacer cette partie par votre propre logique pour récupérer l'utilisateur connecté
    const utilisateurConnecte = ref<Utilisateur>({
      id: 1, // Exemple d'ID utilisateur
      login: "UserExample",
      email: "user@example.com",
      password: "securepassword", // Le mot de passe ne devrait généralement pas être manipulé côté client
      premium: true,
      roles: ["ROLE_USER"],
    });

    const recette = ref<Recette>({
      id: Date.now(), // Utiliser une méthode plus appropriée pour générer l'ID dans une application réelle
      nom: "",
      recommander: false,
      date: new Date(), // La date actuelle sera utilisée pour la création de la recette
      auteur: utilisateurConnecte.value, // Utiliser l'utilisateur connecté
      tempsPrepa: 0,
      ingredients: [],
      etapes: [],
    });

    const categories = ref<Categorie[]>([
      // Exemple de catégories
    ]);

    const searchTerm = ref("");
    const searchResults = ref<Ingredient[]>([]);
    const allIngredients = ref<Ingredient[]>([]);

    const submitRecette = async () => {
      try {
        const response = await fetch(
          "https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/recettes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(recette.value),
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
      recette.value.ingredients.push({
        ingredient,
        nombreNecessaire: 1, // Valeur par défaut ou laisser l'utilisateur choisir
        poidsNecessaire: 100, // Valeur par défaut ou laisser l'utilisateur choisir
      });
      searchTerm.value = ""; // Réinitialiser le terme de recherche
      searchResults.value = []; // Vider les résultats de recherche
    };

    const removeIngredient = (index: number) => {
      recette.value.ingredients.splice(index, 1);
    };

    const addEtape = () => {
      recette.value.etapes.push({
        numero: recette.value.etapes.length + 1,
        descriptif: "",
      });
    };

    // Ajoutez ici les méthodes pour ajouter/supprimer des ingrédients et étapes

    return {
      categories,
      recette,
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
        <input type="text" id="nom" v-model="recette.nom" required />
      </div>

      <!-- Temps de préparation -->
      <div>
        <label for="tempsPrepa">Temps de préparation (en minutes):</label>
        <input
          type="number"
          id="tempsPrepa"
          v-model.number="recette.tempsPrepa"
          required
        />
      </div>

      <!-- Ingrédients -->
      <fieldset>
        <legend>Ingrédients</legend>
        <div
          v-for="(ingredient, index) in recette.ingredients"
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
          <input
            type="number"
            v-model="ingredient.poidsNecessaire"
            placeholder="Poids (en grammes)"
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
          v-for="(etape, index) in recette.etapes"
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
