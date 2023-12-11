import { createRouter, createWebHistory } from 'vue-router'
import PokeBowl from '@/views/PokeBowl.vue';
import SingleIngredient from '@/views/SingleIngredient.vue';
import Ingredients from '@/views/Ingredients.vue';
import SingleUser from '@/views/SingleUser.vue';
import Utilisateur from '@/views/Utilisateurs.vue';

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
      name: 'users',
      component: Utilisateur
    }
  ]
})

export default router
