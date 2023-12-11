<script setup lang="ts">
import BoiteUtilisateur from "@/components/BoiteUtilisateur.vue";
import type { Utilisateur } from "@/types";
import { ref, type Ref } from "vue";

const users: Ref<Utilisateur[]> = ref([
  {
    id: 0,
    login: "Toto",
    email: "toto@titi.fr",
    password: "password",
    premium: false,
  },
  {
    id: 1,
    login: "Toto",
    email: "toto@titi.fr",
    password: "password",
    premium: false,
  },
  {
    id: 2,
    login: "Toto",
    email: "toto@titi.fr",
    password: "password",
    premium: false,
  },
]);
</script>

<template>
  <BoiteUtilisateur v-for="user in users" :key="user.id" :utilisateur="user" />
</template>
