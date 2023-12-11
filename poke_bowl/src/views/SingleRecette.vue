<script setup lang="ts">
import BoiteRecette from '@/components/BoiteRecette.vue';
import type { Recette } from '@/types';
import { ref, type Ref } from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const id = route.params.id;

const recette:Ref<Recette> = ref({
  id:Number(id),
  nom:'Pates Carbo',
  categorie:{
    id:1,
    nom: "Poisson",
    couleur: "Bleu"
  },
  recommander:false,
  tempsPrepa:50,
  ingredients:[
    {
      ingredient:{id:0,
        nom: "Lardon de Grotichon",
        type: {
            id:0,
            nom: "Viande",
            couleur: "Marron"
        }},
    nombreNecessaire:0,
    poidsNecessaire: 300,
    },
    {
      ingredient:{id:2,
        nom: "Pates",
        type: {
            id:0,
            nom: "Féculent",
            couleur: "Beige"
        }},
    nombreNecessaire:0,
    poidsNecessaire: 600,
    }
  ]
});

</script>

<template>
    <BoiteRecette :key="recette.id" :recette="recette"></BoiteRecette>
  </template>