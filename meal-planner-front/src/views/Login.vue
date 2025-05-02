<template>
    <div class="auth-wrapper">
      <form class="auth-form" @submit.prevent="submitForm">
        <h2 class="auth-title">Se connecter</h2>
  
        <div class="form-group">
          <font-awesome-icon :icon="['fas', 'envelope']" class="icon" />
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
            class="input-field"
          />
        </div>
  
        <div class="form-group">
          <font-awesome-icon :icon="['fas', 'lock']" class="icon" />
          <input
            type="password"
            v-model="password"
            placeholder="Mot de passe"
            required
            class="input-field"
          />
        </div>
  
        <div class="form-check">
          <input type="checkbox" id="rememberMe" v-model="rememberMe" />
          <label for="rememberMe">Se souvenir de moi</label>
        </div>
        
        <p v-if="errorMessageLogin" class="error-message">{{ errorMessageLogin }}</p>
        <button type="submit" class="login-btn">Connexion</button>
  
        <div class="signup-link">
          <span>Pas encore membre ?</span>
          <router-link to="/auth">Crée ton compte !</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import axios from 'axios'
  import router from '../router'
  
  const email = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  const errorMessageLogin = ref('')
  
  const submitForm = async (e: Event) => {
  try {
    e.preventDefault()
    errorMessageLogin.value = ''

    const response = await axios.post('http://localhost:3000/auth/login', {
      email: email.value,
      password: password.value
    })

    const result = response.data
    if (result && result.access_token) {
      localStorage.setItem('access_token', result.access_token)
      if (rememberMe.value) {
        localStorage.setItem('user_email', email.value)
        localStorage.setItem('userLoggedIn', 'true')
      } else {
        localStorage.removeItem('user_email')
        localStorage.removeItem('userLoggedIn')
      }
      router.push({ name: 'home' })
    }
  } catch (error: any) {
    if (email.value === '' || password.value === '') {
      errorMessageLogin.value = 'Veuillez compléter le formulaire'
    } else if (error.response && (error.response.status === 401 || error.response.status === 404)) {
      errorMessageLogin.value = 'Email ou mot de passe incorrect.'
    } else {
      errorMessageLogin.value = "Une erreur s'est produite lors de la connexion."
    }
    console.error(error)
  }
}
  </script>
  
  <style src="../assets/auth.css"></style>
  