<template>
    <div class="auth-wrapper">
      <form class="auth-form" @submit.prevent="createUserForm">
        <h2 class="auth-title">Créer un compte</h2>
  
        <div class="form-group">
          <font-awesome-icon :icon="['fas', 'user']" class="icon" />
          <input
            type="text"
            v-model="name"
            placeholder="Nom complet"
            required
            class="input-field"
            @input="() => validateName(name)"
          />
          <p v-if="nameError" class="error-message">{{ nameError }}</p>
        </div>

        <div class="form-group">
          <font-awesome-icon :icon="['fas', 'envelope']" class="icon" />
          <input
            type="text"
            v-model="email"
            placeholder="E-mail"
            required
            class="input-field"
            @input="() => validateEmail(email)"
          />
          <p v-if="emailError" class="error-message">{{ emailError }}</p>
        </div>
  
        <div class="form-group">
          <font-awesome-icon :icon="['fas', 'lock']" class="icon" />
          <input
            type="password"
            v-model="password"
            placeholder="Mot de passe"
            required
            class="input-field"
            @input="checkPasswords"
          />
        </div>
  
        <div class="form-group">
          <font-awesome-icon :icon="['fas', 'lock']" class="icon" />
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirmer le mot de passe"
            required
            class="input-field"
            @input="checkPasswords"
          />
          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        </div>
  
        <button type="submit" class="login-btn">S'inscrire</button>
  
        <div class="signup-link">
          <span>Déjà un compte ?</span>
          <router-link to="/login">Connecte-toi !</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  
  const nameError = ref('')
  const emailError = ref('')
  const passwordError = ref('')
  const errorMessageAuth = ref('')
  
  const validateName = (value: string) => {
    if (!value.trim()) {
      nameError.value = "Ce champ est requis."
      return false
    }
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/
    if (!nameRegex.test(value.trim())) {
      nameError.value = "Le nom saisi n'est pas valide."
      return false
    }
    nameError.value = ''
    return true
  }
  
  const validateEmail = (value: string) => {
    if (!value.trim()) {
      emailError.value = "Ce champ est requis."
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value.trim())) {
      emailError.value = "L'adresse e-mail n'est pas valide."
      return false
    }
    emailError.value = ''
    return true
  }
  
  const checkPasswords = () => {
    if (!password.value || !confirmPassword.value) {
      passwordError.value = 'Veuillez remplir les deux champs mot de passe.'
      return false
    } else if (password.value !== confirmPassword.value) {
      passwordError.value = 'Les mots de passe ne correspondent pas.'
      return false
    } else if (!password.value.trim() || !confirmPassword.value.trim()) {
      passwordError.value = 'Les mots de passe sont requis.'
      return false
    } else {
      passwordError.value = ''
      return true
    }
  }
  
  const createUserForm = async () => {
    const isNameValid = validateName(name.value)
    const isEmailValid = validateEmail(email.value)
    const isPasswordValid = checkPasswords()
  
    if (isNameValid && isEmailValid && isPasswordValid) {
      try {
        const response = await axios.post('http://localhost:3000/auth/signup', {
          email: email.value,
          password: password.value

        })
        router.push('/home')
      } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error)
        errorMessageAuth.value = 'Une erreur est survenue lors de la création du compte.'
      }
    }
  }
  </script>
  
  <style src="../assets/auth.css"></style>