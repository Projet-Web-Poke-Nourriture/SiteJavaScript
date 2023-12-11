<script setup lang="ts">
import BoiteIngredient from '@/components/BoiteIngredient.vue';
import type { Ingredient } from '@/types';
import { ref, type Ref } from 'vue';

const ingredients:Ref<Ingredient[]> = ref([
    {
        id:0,
        nom: "Lardon de Grotichon",
        type: {
            id:0,
            nom: "Viande",
            couleur: "Marron"
        }
    },
    {
        id:1,
        nom: "Froussardine en boîte",
        type: {
            id:1,
            nom: "Poisson",
            couleur: "Bleu"
        }
    }
])

</script>

<template>
    <BoiteIngredient v-for="ingredient in ingredients" :key="ingredient.id"  :ingredient="ingredient"/>
  </template>