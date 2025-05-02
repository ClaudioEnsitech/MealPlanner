import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../interfaces/User'
import api from '@/lib/axios'

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)
    const token = ref<string>(localStorage.getItem('access_token') || '')

    const isAuthenticated = computed(() => !!token.value)
    const getUserName = computed(() => user.value?.name ?? '')

    async function fetchUser() {
        try {
            const response = await api.get('/users/me')
            user.value = response.data
        } catch (error) {
            console.error('Erreur lors de la récupération de l’utilisateur :', error)
        }
    }

    function setToken(newToken: string) {
        token.value = newToken
    }

    function logout() {
        user.value = null
        token.value = ''
    }

    return {
        user,
        token,
        isAuthenticated,
        getUserName,
        fetchUser,
        setToken,
        logout,
    }
}, { persist: true })