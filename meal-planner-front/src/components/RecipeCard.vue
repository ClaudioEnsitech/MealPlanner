<template>
    <div class="recipe-card">
      <h3>{{ recipe.title }}</h3>
      <p>{{ recipe.description }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    recipe: {
      title: string
      description: string
    }
  }>()
  </script>
  
  <style scoped>
.recipe-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-bottom: 5px solid #ffa200;
  transition: transform 0.2s ease;
  height: 250px;
  width: 200px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
}
  
  .recipe-card:hover {
    transform: translateY(-3px);
  }
  
  .recipe-card h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  .recipe-card p {
    color: #555;
    font-size: 0.9rem;
  }
  </style>