import { createRouter, createWebHistory } from 'vue-router'
import PokeBowl from '@/views/PokeBowl.vue';
import SingleIngredient from '@/views/SingleIngredient.vue';
import Ingredients from '@/views/Ingredients.vue';
import SingleUser from '@/views/SingleUser.vue';
import Utilisateur from '@/views/Utilisateurs.vue';
import SingleRecette from '@/views/SingleRecette.vue';

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
    },
    {
      path: '/user/:id',
      name: 'singleUser',
      component: SingleUser
    },
    {
      path: '/users',
      name: 'allUsers',
      component: Utilisateur
    },
    {
      path: '/recette/:id',
      name: 'singleRecette',
      component: SingleRecette
    }
  ]
})

export default router
