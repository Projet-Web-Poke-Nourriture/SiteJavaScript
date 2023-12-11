import { createRouter, createWebHistory } from 'vue-router'
import PokeBowl from '@/views/PokeBowl.vue';
import SingleIngredient from '@/views/SingleIngredient.vue';

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      component: PokeBowl
    },
    {
      path: '/ingredient/:id',
      name: 'singleIngredient',
      component: SingleIngredient
    }
  ]
})

export default router
