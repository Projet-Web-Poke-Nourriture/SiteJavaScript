<script lang="ts">
export default {
  data() {
    return {
      login: '',
      password: ''
    };
  },

  methods: {
    async performLogin() {
      try {
        const response = await fetch(
          "https://webinfo.iutmontp.univ-montp2.fr/~kicient/poke_bowl_api_php/poke_bowl_api/public/api/auth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              login: this.login,
              password: this.password,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Utilisateur connecté avec succès", responseData);

      } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur :", error);
      }
    },
  },
};
</script>

<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="performLogin">
            <div class="form-group">
                <label for="login">Login</label>
                <input type="text" id="username" v-model="login" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
