import { createRouter, createWebHistory } from 'vue-router'
import PokeBowl from '@/views/PokeBowl.vue';

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      component: PokeBowl
    }
  ]
})

export default router
