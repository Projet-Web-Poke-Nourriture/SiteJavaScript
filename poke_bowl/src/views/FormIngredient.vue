<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Categorie, Ingredient } from '@/types';

export default defineComponent({
  setup() {
    const router = useRouter();

    const ingredient = {
      nom: '',
    };

    const submitIngredient = async () => {
      try{
        const response = await fetch(
          "https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/ingredients",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ingredient),
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Ingrédient soumis avec succès", responseData);

        //redirection à rajouter
      }catch (error){
        console.error("Erreur lors de la soumission de la recette:", error);
      }

    };

    return {
      ingredient,
      submitIngredient,
    };
  },
});
</script>

<template>
    <div class="create-ingredient">
      <h1>Créer un nouvel ingrédient</h1>
      <form @submit.prevent="submitIngredient">
        <div>
          <label for="nom">Nom de l'ingrédient:</label>
          <input type="text" id="nom" v-model="ingredient.nom" required>
        </div>
        <button type="submit">Créer l'ingrédient</button>
      </form>
    </div>
  </template>
  