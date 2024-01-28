<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";

const router = useRouter();
const isLoggedIn = ref(false);

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem("userToken");
};

onMounted(checkLoginStatus);

const logout = () => {
  localStorage.removeItem("userToken");
  checkLoginStatus();
  router.push("/connexion");
};

const userToken = localStorage.getItem("userToken");
const user = ref(null);
if (userToken) {
  const decoded = jwtDecode(userToken);
  user.value = decoded;
}

// TODO
//Faire une verif si le user est admin si oui : afficher "les utilisateurs" + "mon profil"
// sinon juste afficher "mon profil"
</script>

<template>
  <div id="wrapper">
    <header>
      <h1 @click="router.push('/PokeBowl')">PokeBowl</h1>
      <nav>
        <div @click="router.push({ name: 'AllIngredients' })">
          Les ingrédients
        </div>
        <div @click="router.push({ name: 'allUsers' })">Les utilisateurs</div>
        <div
          v-if="isLoggedIn"
          @click="router.push({ name: 'singleUser', params: { id: user.id } })"
        >
          Mon Profil
        </div>
        <div @click="router.push({ name: 'allRecettes' })">Les recettes</div>
        <div @click="router.push({ name: 'inscription' })">S'inscrire</div>
        <div v-if="!isLoggedIn" @click="router.push({ name: 'connexion' })">
          Se connecter
        </div>
        <div v-if="isLoggedIn" @click="logout">Se déconnecter</div>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-image: url("./images/bgPoke.png");
  background-size: cover;
  background-repeat: no-repeat;
}

header {
  width: 100%;
  position: sticky;
  top: 0px;
  background-color: #ffcc00; /* Fond jaune pour l'en-tête */
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Optionnel: ajouter une ombre pour l'en-tête */
}

header h1 {
  text-align: center;
  font-family: "Arial", sans-serif; /* Utiliser la même police que le reste du site */
  font-weight: 700;
  color: #333333; /* Texte en noir pour le titre */
}

nav {
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  margin: 0 auto;
}

nav > div {
  padding: 10px;
  background-color: #ffcc00; /* Fond jaune pour les boutons de la barre de navigation */
  flex-grow: 1;
  text-align: center;
  border: none; /* Supprimer les bordures si vous ne les voulez pas */
  color: #333333; /* Texte en noir pour les liens de la navigation */
}

nav > div:hover {
  background-color: #f0ad4e; /* Couleur de fond au survol pour les boutons de la navigation */
  cursor: pointer;
}

main {
  max-width: 1280px;
  width: 780px;
  padding: 10px;
  background-color: #ffefd5; /* Fond jaune chaleureux et léger */
  flex-grow: 1;
}

@media (max-width: 800px) {
  main {
    width: 80%;
  }
}
</style>
