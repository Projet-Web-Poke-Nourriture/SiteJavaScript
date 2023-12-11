<script setup lang="ts">
import BoiteIngredient from '@/components/BoiteIngredient.vue';
import type { Ingredient } from '@/types';
import { ref, type Ref } from 'vue';
import { loadScript } from "vue-plugin-load-script";

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
    },{
        id:2,
        nom: "Qwilfish",
        type: {
            id:0,
            nom: "Poisson",
            couleur: "Bleu"
        }
    },{
        id:3,
        nom: "Cuisse de Grenousse",
        type: {
            id:0,
            nom: "Viande",
            couleur: "Marron"
        }
    }
])

loadScript('/js/search.js');

</script>

<template>
    <BoiteIngredient v-for="ingredient in ingredients" :key="ingredient.id"  :ingredient="ingredient"/>
  </template>