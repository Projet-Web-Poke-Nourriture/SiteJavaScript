<script setup lang="ts">
import type { Utilisateur } from "@/types";
import { loadScript } from "vue-plugin-load-script";

let a = loadScript("/js/md5.js");

const props = defineProps<{ utilisateur: Utilisateur}>();
const md5hash = hex_md5(props.utilisateur.email);
const lienPhoto = "https://webinfo.iutmontp.univ-montp2.fr/~ramirezc/test/MyAvatar/public/avatar/" + md5hash

</script>

<template>
  <div class="contentBox">
    <div class="top">Profil de {{ utilisateur.login }}</div>
    <div class="content">
      <div class="group">
        <label>Login : </label>
        <router-link
          :to="{ name: 'singleUser', params: { id: utilisateur.id } }"
          class="clickable"
          >{{ utilisateur.login }}</router-link
        >
      </div>
      <div class="group">
        <label>Adresse e-mail</label>
        <input :value="utilisateur.email" />
      </div>
    </div>
    <img class="PP" :src="lienPhoto" alt="img profil"/>
  </div>
</template>