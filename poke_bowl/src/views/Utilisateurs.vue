<script setup lang="ts">
import BoiteUtilisateur from "@/components/BoiteUtilisateur.vue";
import type { Utilisateur } from "@/types";
import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goToFormUtilisateur = () => {
  router.push({ name: 'inscription' });
};

const users: Ref<Utilisateur[]> = ref([]);
const userToken = localStorage.getItem("userToken");
fetch(
  "https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/utilisateurs",
  {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + userToken,
            }
          }
)
  .then((responsehttp) => responsehttp.json())
  .then((responseJSON) => {
    users.value = responseJSON["hydra:member"];
  });


</script>

<template>
  <button @click="goToFormUtilisateur">Créer un utilisateur</button>
  <div class="utilisateur-grid">
    <div v-for="user in users" :key="user.id" class="utilisateur-card">
      <BoiteUtilisateur :utilisateur="user" />
    </div>
  </div>
</template>
