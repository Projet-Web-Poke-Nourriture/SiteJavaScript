<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import type { Categorie, Recette, Ingredient } from '@/types'; // Assurez-vous que le chemin d'importation est correct
  
  export default defineComponent({
    setup() {
      const categories = ref<Categorie[]>([
        // Exemple de catégories
        { id: 1, nom: 'Dessert', couleur: '#f00' },
        { id: 2, nom: 'Plat principal', couleur: '#0f0' },
      ]);
  
      const recette = ref<Recette>({
        id: Date.now(), // Génération simplifiée d'un ID, peut-être à adapter
        nom: '',
        categorie: categories.value[0], // Sélectionnez une catégorie par défaut si nécessaire
        recommander: false,
        tempsPrepa: 0,
        ingredients: [],
        etapes: [],
      });
  
      const addIngredient = () => {
        const newIngredient: Ingredient = { id: Date.now(), nom: 'Ratio', type: categories.value[0] }; // Type par défaut
        recette.value.ingredients.push({ ingredient: newIngredient, nombreNecessaire: 0, poidsNecessaire: 0 });
      };
  
      const removeIngredient = (index: number) => {
        recette.value.ingredients.splice(index, 1);
      };
  
      const addEtape = () => {
        recette.value.etapes.push({ numero: recette.value.etapes.length + 1, descriptif: '' });
      };
  
      const submitRecette = () => {
        console.log('Recette soumise:', recette.value);
        // Logique pour soumettre la recette à votre backend ou store
      };
  
      return {
        categories,
        recette,
        addIngredient,
        removeIngredient,
        addEtape,
        submitRecette,
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
          <input type="text" id="nom" v-model="recette.nom" required>
        </div>
  
        <!-- Catégorie -->
        <div>
          <label for="categorie">Catégorie:</label>
          <select id="categorie" v-model="recette.categorie">
            <option v-for="categorie in categories" :key="categorie.id" :value="categorie">
              {{ categorie.nom }}
            </option>
          </select>
        </div>
  
        <!-- Temps de préparation -->
        <div>
          <label for="tempsPrepa">Temps de préparation (en minutes):</label>
          <input type="number" id="tempsPrepa" v-model.number="recette.tempsPrepa" required>
        </div>
  
        <!-- Ingrédients -->
        <fieldset>
          <legend>Ingrédients</legend>
          <div v-for="(ingredient, index) in recette.ingredients" :key="index" class="ingredient">
            <input type="text" v-model="ingredient.ingredient.nom" placeholder="Nom de l'ingrédient" disabled>
            <input type="number" v-model="ingredient.nombreNecessaire" placeholder="Quantité">
            <input type="number" v-model="ingredient.poidsNecessaire" placeholder="Poids (en grammes)">
            <button @click.prevent="removeIngredient(index)">Supprimer</button>
          </div>
          <button @click.prevent="addIngredient">Ajouter un ingrédient</button>
        </fieldset>
  
        <!-- Étapes -->
        <fieldset>
          <legend>Étapes</legend>
          <div v-for="(etape, index) in recette.etapes" :key="index" class="etape">
            <label>Étape {{ etape.numero }}:</label>
            <textarea v-model="etape.descriptif" rows="3"></textarea>
          </div>
          <button @click.prevent="addEtape">Ajouter une étape</button>
        </fieldset>
  
        <button type="submit">Créer la recette</button>
      </form>
    </div>
  </template>
  
  <style>
  /* Styles pour votre formulaire */
  .create-recette {
    /* Styles pour le formulaire */
  }
  .ingredient, .etape {
    margin-bottom: 1rem;
  }
  </style>
  