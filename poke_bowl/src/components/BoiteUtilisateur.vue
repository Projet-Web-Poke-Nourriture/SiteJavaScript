<script setup lang="ts">
import type {Utilisateur} from '@/types';
const props = defineProps<{utilisateur: Utilisateur}>();
</script>

<template>
  <div class="contentBox">
    <div class="top">
      Profil de {{ utilisateur.login }}
    </div>
    <div class="content">
      <div class="group">
        <label>Login : </label>
        <router-link :to="{name:'singleUser', params:{id:utilisateur.id}}" class="clickable">{{utilisateur.login}}</router-link>
      </div>
      <div class="group">
        <label>Adresse e-mail</label>
        <input :value="utilisateur.email" >
      </div>
    </div>
  </div>
</template>