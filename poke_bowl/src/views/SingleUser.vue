<script setup lang="ts">
import BoiteUtilisateur from "@/components/BoiteUtilisateur.vue";
import type { Utilisateur } from "@/types";
import { type Ref, ref } from "vue";
import { useRoute } from "vue-router";
import { jwtDecode } from "jwt-decode";

const route = useRoute();
const id = route.params.id;

const user = ref();
const userToken = localStorage.getItem("userToken");
let roles = new Proxy([],{});
if (userToken) {
  const decoded = jwtDecode(userToken);
  user.value = decoded;
  console.log(roles)
}


</script>

<template>
  <BoiteUtilisateur :utilisateur="user" :key="user.id" />
</template>
