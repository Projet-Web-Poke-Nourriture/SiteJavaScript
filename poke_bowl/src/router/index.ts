import { createRouter, createWebHistory } from "vue-router";
import PokeBowl from "@/views/PokeBowl.vue";
import SingleIngredient from "@/views/SingleIngredient.vue";
import Ingredients from "@/views/Ingredients.vue";
import SingleUser from "@/views/SingleUser.vue";
import Utilisateur from "@/views/Utilisateurs.vue";
import SingleRecette from "@/views/SingleRecette.vue";
import Recette from "@/views/Recettes.vue";
import FormRecette from "@/views/FormRecette.vue";
import FormIngredient from "@/views/FormIngredient.vue";
import Connexion from "@/views/Connexion.vue";
import FormUtilisateur from "@/views/FormUtilisateur.vue";

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/",
      component: PokeBowl,
    },
    {
      path: "/PokeBowl",
      name: "pokeBowl",
      component: PokeBowl,
    },
    {
      path: "/ingredient/:id",
      name: "singleIngredient",
      component: SingleIngredient,
    },
    {
      path: "/ingredients",
      name: "AllIngredients",
      component: Ingredients,
    },
    {
      path: "/user/:id",
      name: "singleUser",
      component: SingleUser,
    },
    {
      path: "/users",
      name: "allUsers",
      component: Utilisateur,
    },
    {
      path: "/recette/:id",
      name: "singleRecette",
      component: SingleRecette,
    },
    {
      path: "/recettes",
      name: "allRecettes",
      component: Recette,
    },
    {
      path: "/form-recette",
      name: "formRecette",
      component: FormRecette,
    },
    {
      path: "/form-ingredient",
      name: "formIngredient",
      component: FormIngredient,
    },
    {
      path: "/connexion",
      name: "connexion",
      component: Connexion,
    },
    {
      path: "/inscription",
      name: "inscription",
      component: FormUtilisateur,
    },
  ],
});

export default router;
