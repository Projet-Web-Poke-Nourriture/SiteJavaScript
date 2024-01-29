<script setup lang="ts">
// TODO
// pb sur les étapes !

import BoiteRecette from "@/components/BoiteRecette.vue";
import type { Recette } from "@/types";
import { ref, type Ref, watch } from "vue";
import { loadScript } from "vue-plugin-load-script";
import { useRouter } from "vue-router";
import {jwtDecode} from "jwt-decode";
const router = useRouter();

const recettes: Ref<Recette[]> = ref([]);

function convertirEnEtapes(
  chaine: String
): { numero: number; descriptif: string }[] {
  // Diviser la chaîne en utilisant '\\' comme séparateur
  const etapesBrutes = chaine.split("\\\\");

  // Transformer chaque élément en un objet { numero, descriptif }
  const etapes = etapesBrutes.map((descriptif, index) => ({
    numero: index + 1, // Commencer la numérotation à 1
    descriptif,
  }));

  return etapes;
}

fetch(
  "https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/recettes"
)
  .then((responsehttp) => responsehttp.json())
  .then((responseJSON) => {
    recettes.value = responseJSON["hydra:member"];
  });

const searchTerm = ref(""); // Terme de recherche lié à la saisie de l'utilisateur
const filteredRecettes = ref<Recette[]>([]); // Résultats filtrés à afficher

watch(searchTerm, (newValue) => {
  if (newValue) {
    // Mettre à jour filteredIngredients seulement si searchTerm n'est pas vide
    filteredRecettes.value = search(newValue, recettes.value);
  } else {
    // Si searchTerm est vide, réinitialiser filteredIngredients à vide
    filteredRecettes.value = [];
  }
});

function selectIngredient(recette: Recette) {
  router.push({ path: `/recette/${recette.id}` });
}

const goToFormRecette = () => {
  router.push({ name: "formRecette" });
};

const deleteRecette = async (id) => {
  if (!id) return; // Vérifier si l'ID est fourni
  try {
    const response = await fetch(
      `https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/recettes/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      // Supprimer l'ingrédient du tableau local après la suppression réussie
      recettes.value = recettes.value.filter(
        (recette) => recette.id !== id
      );
    } else {
      console.error("Erreur lors de la suppression de la recette");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la recette");
  }
};

//Récupération de l'utilisateur
const userToken = localStorage.getItem("userToken");
const user = ref();
const roles = new Proxy([], {});
if (userToken) {
  const decoded = jwtDecode(userToken);
  user.value = decoded;
  const roles = user.value.roles;
}

const isAdmin = ref(roles.includes("ADMIN"));

</script>

<template>
  <div class="recette-search-create">
    <input
      type="text"
      id="recherche"
      name="recherche"
      v-model="searchTerm"
      placeholder="Rechercher une recette..."
    />
    <button @click="goToFormRecette">Créer une recette</button>
  </div>
  <div v-if="isAdmin">
    <input
      type="number"
      v-model="recetteIdToDelete"
      placeholder="Entrez l'ID à supprimer"
    />
    <button @click="deleteRecette(recetteIdToDelete)">
      Supprimer la recette
    </button>
  </div>

  <!-- Afficher les résultats seulement si searchTerm n'est pas vide -->
  <div class="resultats-recherche" v-if="searchTerm && filteredRecettes.length">
    <div
      class="resultat"
      v-for="recette in filteredRecettes"
      :key="recette.id"
      @click="selectIngredient(recette)"
    >
      {{ recette.nom }}
    </div>
  </div>

  <BoiteRecette
    v-for="recette in recettes"
    :key="recette.id"
    :recette="recette"
  />
</template>

<style>
/* ---- Styles pour la recherche et le bouton ---- */
.recette-search-create {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
}

input[type="text"] {
  padding: 8px;
  margin-right: 10px;
  width: 100%;
}

button {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #ffcc00;
  border: none;
  border-radius: 5px;
}
</style>
