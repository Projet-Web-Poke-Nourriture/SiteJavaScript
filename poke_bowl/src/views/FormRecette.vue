<script lang="ts">
// TODO
//Finir la logique de la création de la recette

import { defineComponent, ref } from "vue";
import type { Recette, Ingredient, Utilisateur } from "@/types";
import { loadScript } from "vue-plugin-load-script";

loadScript("/js/search.js");

export default defineComponent({
  setup() {
    let recettePost = {
      nom: "",
      etapes: "test",
      tempsPreparation: 0,
    };

    const etapes = ref([{ numero: 1, descriptif: "" }]);
    let ingredientsRecette = [];

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

    function convertirTableauEnChaine(etapes) {
      return etapes.value
        .map((etape) => `Étape ${etape.numero}: ${etape.descriptif}`)
        .join("\\");
    }

    const submitRecette = async () => {
      try {
        const token = localStorage.getItem("userToken");
        console.log(etapes.value)
        recettePost.etapes = convertirTableauEnChaine(etapes);
        const response = await fetch(
          "https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/recettes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
            body: JSON.stringify(recettePost),
          }
        );
        

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const responseData = await response.json();

        console.log("Recette créée avec succès", responseData);
        const id = responseData.id;
        ingredientsRecette.forEach(ingredient => {
          try{
            const response = fetch(
              "https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/ingredient_recettes",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
                body: JSON.stringify({
                  recette: `/api/recettes/${id}`,
                  ingredient: `/api/ingredients/${ingredient.ingredient.id}`,
                  quantite: ingredient.nombreNecessaire,
                }),
              }
            );
          }catch (error){
            console.error("Erreur lors de la soumission de la recette:", error);
          }
        }
        );

      } catch (error) {
        console.error("Erreur lors de la création de la recette", error);
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
      etapes.value.push({
        numero: etapes.value.length + 1,
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
        <label for="tempsPreparation">Temps de préparation (en minutes):</label>
        <input
          type="number"
          id="tempsPrepaparation"
          v-model.number="recettePost.tempsPreparation"
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
        <div v-for="(etape, index) in etapes" :key="index" class="etape">
          <label>Étape {{ etape.numero }}:</label>
          <textarea v-model="etape.descriptif" rows="3"></textarea>
        </div>
        <button @click.prevent="addEtape">Ajouter une étape</button>
      </fieldset>

      <button type="submit">Créer la recette</button>
    </form>
  </div>
</template>

<style scoped>
.create-recette {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

fieldset {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

legend {
  font-weight: bold;
}

.ingredient {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  background-color: #ffcc00;
  color: #333333;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #f0ad4e;
}

.search-results {
  list-style-type: none;
  padding: 0;
}

.search-results li {
  cursor: pointer;
  padding: 5px;
  transition: background-color 0.3s ease;
}

.search-results li:hover {
  background-color: #f0ad4e;
}
</style>
