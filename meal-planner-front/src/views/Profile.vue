<template>
    <Navbar/>
    <div class="profile-wrapper">
    <section class="profile-card">
      <div class="profile-picture-wrapper">
        <img src="../assets/photos/Zola.jpg" alt="Photo de profil" class="profile-picture" />
      </div>
      <div class="profile-info">
        <h2 class="username">{{user?.name}}</h2>
        <p class="email">{{user?.email}}</p>
        <p>Inscrit le : {{ formatDate(user?.createdAt) }}</p>
        <button class="edit-btn">Modifier le profil</button>
      </div>
    </section>
  </div>
    <Footer/>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useUserStore } from '../stores/userStore'
import { onBeforeMount, onMounted } from 'vue'

const userStore = useUserStore()
const user = userStore.user

onBeforeMount(() => {
  const storedToken = localStorage.getItem('access_token')
  if (storedToken) {
    userStore.setToken(storedToken)
    userStore.fetchUser()
  }
})

onMounted(() => {
  if (!userStore.user) {
    userStore.fetchUser()
  }
})

function formatDate(dateStr?: string | Date) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('fr-FR')
}

</script>

<style scoped>
.profile-wrapper {
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
  background-color: #fff5e6;
  min-height: 100vh;
}

.profile-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 5;
  transition: transform 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
}

.profile-picture-wrapper {
  width: 130px;
  height: 130px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  border: 4px solid #ffa200;
  overflow: hidden;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  margin-top: 1rem;
}

.username {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.email {
  color: #666;
  margin: 0.5rem 0 1rem;
}

.edit-btn {
  background-color: #ffa200;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.edit-btn:hover {
  background-color: #e69700;
}

@media (max-width: 500px) {
  .profile-card {
    padding: 1.5rem 1rem;
  }

  .username {
    font-size: 1.25rem;
  }
}
</style>