<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Categorie, Utilisateur } from '@/types';

export default defineComponent({
  setup() {
    const utilisateur = ref({
      id: '',
      login: '',
      email: '',
      password: '',
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
            body: JSON.stringify(utilisateur),
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Utilisateur soumis avec succès", responseData);

        //redirection à rajouter
      }catch (error){
        console.error("Erreur lors de la soumission de l'utilisateur :", error);
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
          <input type="text" id="login" v-model="utilisateur.login" required>
        </div>
        <div>
          <label for="email">Email de l'utilisateur:</label>
          <input type="text" id="email" v-model="utilisateur.email" required>
        </div>
        <div>
          <label for="password">Mot de passe de l'utilisateur:</label>
          <input type="text" id="password" v-model="utilisateur.password" required>
        </div>
        <div>
          <label for="premium">Utilisateur Premium ? :</label>
          <input type="text" id="premium" v-model="utilisateur.premium" required>
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
  border: 1px solid #ccc;
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
  border: 1px solid #ccc;
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