<template>
  <div class="home-page">
    <Navbar />
    <section class="hero">
      <div class="overlay">
        <h1>Planifie tes repas facilement 🍽️</h1>
        <p class="des-search">Recherche des recettes par tag, type ou mot-clé</p>

        <div class="search-area">
          <div class="search-box">
            <div class="select-wrapper">
              <select v-model="selectedType" class="search-select">
                <option disabled value="">Type</option>
                <option value="entrée">Entrée</option>
                <option value="plat">Plat</option>
                <option value="dessert">Dessert</option>
              </select>
              <font-awesome-icon :icon="['fas', 'chevron-down']" class="chevron-icon" />
            </div>

            <input type="text" placeholder="Rechercher une recette..." v-model="search" />
            <button @click="handleSearch()"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
          </div>
        </div>

        <div class="filters">
          <span v-for="tag in allTags" :key="tag" class="filter-tag"
            :class="{ 'selected-tag': selectedTags.includes(tag) }" @click="toggleTag(tag)">
            #{{ tag }}
          </span>
        </div>
      </div>
    </section>
    <div class="recipes-container">
      <h2>Recettes suggérées</h2>
      <div v-if="recipes.length" class="recipes-styles">
        <RecipeCard v-for="recipe in recipes" :key="recipe['id']" :recipe="recipe" />
      </div>
      <div v-if="!recipes.length && searchPerformed" class="no-results-card">
        <div class="card">
          <p>Aucun résultat trouvé 🥲</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import api from '../lib/axios'

const search = ref('')
const selectedType = ref('')
const recipes = ref<any[]>([])
const searchPerformed = ref(false)
const selectedTags = ref<string[]>([])
const allTags = ref<string[]>([])

function toggleTag(tag: string) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
    searchPerformed.value = false
  } else {
    selectedTags.value.push(tag)
  }
  fetchRecipes()
}

async function fetchRecipes() {
  try {
    let recipesList = []

    if (selectedTags.value.length) {
      const allRequests = selectedTags.value.map(async (tag) => {
        const res = await api.get(`/tags/${tag}/recipes`)
        return res.data
      })

      const results = await Promise.all(allRequests)
      recipesList = results.flat()
    }

    if (search.value || selectedType.value) {
      let endpoint = '/recipes'
      const params = []

      if (search.value) params.push(`q=${search.value}`)
      if (selectedType.value) params.push(`type=${selectedType.value}`)

      if (params.length) {
        endpoint = `/recipes/search?${params.join('&')}`
        const res = await api.get(endpoint)
        recipesList = [...recipesList, ...res.data]
      }
    }

    const uniqueRecipes = Array.from(new Map(recipesList.map(item => [item.id, item])).values())

    recipes.value = uniqueRecipes
    searchPerformed.value = true

  } catch (err) {
    console.error('Erreur lors de la récupération des recettes :', err)
    recipes.value = []
    searchPerformed.value = true
  }
}

watch(search, (newVal) => {
  if (newVal.length >= 1 || selectedType.value) {
    fetchRecipes()
  } else {
    if (selectedTags.value.length > 0) {
      fetchRecipes() 
    } else {
      recipes.value = []
      searchPerformed.value = false
    }
  }
})

watch(selectedType, () => {
  if (search.value || selectedType.value) {
    fetchRecipes()
  } else {
    recipes.value = []
    searchPerformed.value = false
  }
})

watch(selectedTags, () => {
  if (!search.value && !selectedType.value && selectedTags.value.length === 0){
    recipes.value = []
    searchPerformed.value = false
  } 
})

function handleSearch() {
  if (search.value || selectedType.value) {
    fetchRecipes()
  } else {
    recipes.value = []
    searchPerformed.value = false
  }
}


async function fetchAllTags() {
  try {
    const res = await api.get('/tags')
    allTags.value = res.data.map((tag: { name: any }) => tag.name)
  } catch (err) {
    console.error('Erreur lors de la récupération des tags :', err)
  }
}
onMounted(() => {
  fetchAllTags()
})
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  background-color: #fff5e6;
}

.logout-btn {
  background: white;
  color: #ffa200;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
}

.logout-btn:hover {
  background-color: #ffd699;
}

h1 {
  font-size: 34px;
}

.des-search {
  font-size: 18px;
}

.hero {
  position: relative;
  padding: 2rem 2rem;
  text-align: center;
  color: white;
  overflow: hidden;
  background-image: url('../assets/photos/saumon.jpg');
  background-size: cover;
  backdrop-filter: blur(8px);
  background-position: center;
  background-repeat: no-repeat;
  min-height: 500px;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 3rem 2rem;
  border-radius: 30px;
  max-width: 800px;
  margin: auto;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
}

.search-area {
  margin-top: 2rem;
}

.search-box {
  display: flex;
  max-width: 600px;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  margin: 0 auto;
}

.search-box input {
  flex: 1;
  padding: 1rem;
  border: none;
  font-size: 1rem;
  outline: none;
}

.search-box input:focus {
  border-color: #ffa200;
}

.search-box button {
  padding: 1rem;
  border: none;
  color: #ffa200;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}

.search-box button:hover {
  background-color: #ff9705;
  color: white;
}

.select-wrapper {
  position: relative;
  flex: 0 0 110px;
  min-width: 100px;
  border: none;
}

.search-select {
  width: 100%;
  padding: 1rem;
  border: none;
  border-right: 1px solid #eee;
  font-size: 1rem;
  appearance: none;
  background: white;
  cursor: pointer;
  font-weight: bold;
  z-index: 1;
}

.chevron-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #888;
  font-size: 0.85rem;
  border: none;
  z-index: 2;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 2rem;
}

.filter-tag {
  background-color: #f5f0e6;
  color: #ffa200;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
  transform: scale(1.05);
}

.filter-tag:hover {
  background-color: #ffd699;
}

.recipes-container {
  margin: 4rem auto 2rem;
  max-width: 1200px;
  padding: 0 1rem;
  color: black;
}

.recipes-styles {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap; 
}


h2 {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  max-width: 230px;
  padding: 10px;
  border-radius: 8px;
  margin: 0 auto;
}

.no-results-card {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.no-results-card .card {
  background-color: #fce9e9;
  color: #cc0000;
  padding: 2rem;
  border-radius: 16px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.selected-tag {
  background-color: #ffa200;
  color: white;
}

.currentColor{
  color: #cc0000;
}

@media (max-width: 900px) {
  .recipes-styles {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .recipes-styles {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {

  .chevron-icon {
    left: 80%;
  }

  .overlay {
    padding: 0.8rem;
  }

  .select-wrapper {
    flex: 0 0 100px;
  }

  .search-select {
    width: 100%;
    padding: 1rem;
  }

  .search-box input {
    width: 100%;
  }

  .search-box button {
    max-width: 20%;
  }
}
</style>
