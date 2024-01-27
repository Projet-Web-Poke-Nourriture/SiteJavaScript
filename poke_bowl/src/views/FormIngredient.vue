<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Categorie, Ingredient } from '@/types';

export default defineComponent({
  setup() {
    const router = useRouter();
    const categories = ref<Categorie[]>([
      { id: 1, nom: 'Viande', couleur: '#ff0000' },
      { id: 2, nom: 'Légume', couleur: '#00ff00' },
      { id: 3, nom: 'Fruit', couleur: '#0000ff' },
    ]);

    const ingredient = ref<Ingredient>({
      id: Date.now(),
      nom: '',
      type: categories.value[0],
    });

    const submitIngredient = () => {
      console.log('Ingrédient soumis:', ingredient.value);
      // Ici, ajoutez la logique pour envoyer l'ingrédient à votre backend ou le stocker localement
      router.push({ name: 'AllIngredients' }); // Redirigez vers la liste des ingrédients après la soumission, ajustez le nom de la route selon votre application
    };

    return {
      categories,
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
        <div>
          <label for="categorie">Catégorie:</label>
          <select id="categorie" v-model="ingredient.type">
            <option v-for="categorie in categories" :key="categorie.id" :value="categorie">
              {{ categorie.nom }}
            </option>
          </select>
        </div>
        <button type="submit">Créer l'ingrédient</button>
      </form>
    </div>
  </template>
  