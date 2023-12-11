<script setup lang="ts">
import BoiteUtilisateur from '@/components/BoiteUtilisateur.vue';
import type { Utilisateur } from '@/types';
import { type Ref,ref } from 'vue';
import {useRoute} from 'vue-router';
const route = useRoute();
const id = route.params.id;

const user:Ref<Utilisateur> = ref(
    {
        id:Number(id),
        login: "Toto",
        email: "toto@titi.fr",
        password: "password",
        premium: false,
    })

</script>

<template>
    <BoiteUtilisateur :utilisateur="user" :key="user.id"/>
</template>