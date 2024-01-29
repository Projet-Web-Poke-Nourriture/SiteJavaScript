<script lang="ts">

// TODO
// Virer la partie premium

import { defineComponent, ref } from 'vue';
import type { Categorie, Utilisateur } from '@/types';
import {flashMessage} from '@smartweb/vue-flash-message';

export default defineComponent({
  setup() {
    const utilisateur = ref({
      login: '',
      adresseEmail: '',
      plainPassword: '',
      premium: false,
    });

    const submitUtilisateur = async () => {
      try{
        const response = await fetch(
          "https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/utilisateurs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(utilisateur.value),
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        flashMessage.show({type: 'success', title: 'Inscription réussi'})

        //redirection à rajouter
      }catch (error){
        flashMessage.show({type: 'error', title: 'Login, email ou mot de passe incorrect'})
      }

    };

    return {
      utilisateur,
      submitUtilisateur,
    };
  },
});
</script>

<template>
    <div class="create-utilisateur">
      <h1>Créer un nouvel utilisateur</h1>
      <form @submit.prevent="submitUtilisateur">
        <div>
          <label for="login">Login de l'utilisateur:</label>
          <input type="text" id="login" v-model="utilisateur.login" placeholder="4 caractères minimum" required>
        </div>
        <div>
          <label for="email">Email de l'utilisateur:</label>
          <input type="email" id="email" v-model="utilisateur.adresseEmail" required>
        </div>
        <div>
          <label for="password">Mot de passe de l'utilisateur:</label>
          <input type="password" id="password" v-model="utilisateur.plainPassword" placeholder="Maj + Min + Chiffre entre 8 et 30 caractères" required>
        </div>
        <button type="submit">Créer l'utilisateur</button>
      </form>
    </div>
</template>

<style>
.create-utilisateur {
  margin: 0 auto;
  width: 50%;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
  background-color: #f4f4f4;
}

.create-utilisateur h1 {
  text-align: center;
}

.create-utilisateur form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.create-utilisateur form div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.create-utilisateur form div label {
  font-weight: bold;
}

.create-utilisateur form div input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid black;
}

.create-utilisateur form button {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: #ccc;
  cursor: pointer;
}

.create-utilisateur form button:hover {
  background-color: #bbb;
}

.create-utilisateur form button:active {
  background-color: #aaa;
}

.create-utilisateur form button:focus {
  outline: none;
}

.create-utilisateur form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.create-utilisateur form button:disabled:hover {
  background-color: #ccc;
}

.create-utilisateur form button:disabled:active {
  background-color: #ccc;
}

.create-utilisateur form button:disabled:focus {
  outline: none;
}
</style>