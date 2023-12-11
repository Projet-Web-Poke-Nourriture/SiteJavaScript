import { createRouter, createWebHistory } from 'vue-router'
import PokeBowl from '@/views/PokeBowl.vue';
import SingleIngredient from '@/views/SingleIngredient.vue';
import Ingredients from '@/views/Ingredients.vue';

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      component: PokeBowl
    },
    {
      path: '/PokeBowl',
      name: 'PokeBowl',
      component: PokeBowl
    },
    {
      path: '/ingredient/:id',
      name: 'singleIngredient',
      component: SingleIngredient
    },
    {
      path: '/ingredients',
      name: 'AllIngredients',
      component: Ingredients
    }
  ]
})

export default router
