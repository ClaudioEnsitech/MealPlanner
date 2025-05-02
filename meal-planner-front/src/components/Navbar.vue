<template>
    <header class="navbar">
      <div class="navbar-content">
        <router-link to="/" class="logo-link">
          <img class="logo" src="../assets/photos/logoMeal.png" alt="Logo Meal Planner" />
        </router-link>
        <nav class="nav-links">
          <router-link to="/profile" class="nav-link">Mon profil</router-link>
          <button class="logout-btn" @click="logout">Se déconnecter</button>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  function logout() {
    localStorage.removeItem('access_token')
    router.push({ name: 'login' })
  }
  </script>
  
  <style scoped>
  .navbar {
    background: rgba(255, 162, 0, 0.9);
    backdrop-filter: blur(10px);
    padding: 0.8rem 2rem;
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .navbar-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo-link {
    display: flex;
    align-items: center;
  }
  
  .logo {
    height: 50px;
    transition: transform 0.3s ease;
  }
  
  .logo:hover {
    transform: scale(1.05);
  }
  
  .nav-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: color 0.3s ease;
  }
  
  .nav-link:hover {
    color: #ffd699;
    text-decoration: underline;
  }
  
  .logout-btn {
    background: white;
    color: #ffa200;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-family: 'Poppins';
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease;
  }
  
  .logout-btn:hover {
    background: #ffd699;
    color: #a85d00;
  }
  
  @media (max-width: 768px) {
    .navbar-content {
      flex-direction: column;
      gap: 0.8rem;
    }
  
    .nav-links {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  </style>
  