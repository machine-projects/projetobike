<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()

const showUserMenu = ref<boolean>(false)

const doLogOut = () => {
  localStorage.clear();
  userStore.$reset();
  router.push({ name: '/' })
}

</script>

<template>
  <!-- component -->
  <div class="flex justify-center z-100">
    <div class="relative inline-block">
      <!-- Dropdown toggle button -->
      <button @click="showUserMenu = !showUserMenu"
        class="showUserBtn relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none">
        <span class="mx-1">{{ userStore.user.firstName }} {{ userStore.user.lastName }}</span>
        <svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"></path>
        </svg>
      </button>

      <!-- Dropdown menu -->
      <div id="dropdown" v-if="showUserMenu"
        class="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
        <router-link id="dropdownDashboardRouter1" to="/dashboard"
          class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
          <img class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
            src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
            alt="jane avatar">
          <div class="mx-1">
            <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-200">{{ userStore.user.firstName }} {{
            userStore.user.lastName }}
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ userStore.user.email }}</p>
          </div>
        </router-link>

        <hr class="border-gray-200 dark:border-gray-700 ">

        <router-link id="dropdownProfileRouter" to="/dashboard/perfil"
          class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
          Ver perfil
        </router-link>

        <router-link id="dropdownConfigRouter" to="/dashboard/configuracoes"
          class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
          Configurações
        </router-link>

        <hr class="border-gray-200 dark:border-gray-700 ">

        <router-link id="dropdownDashboardRouter2" to="/dashboard"
          class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
          Dashboard
        </router-link>

        <hr class="border-gray-200 dark:border-gray-700 ">
        <!-- 
        <router-link to="/ajuda"
          class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
          Ajuda
        </router-link> -->
        <span id="dropdownLogoutBtn" @click="doLogOut"
          class="cursor-pointer block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
          Sair
        </span>
      </div>
    </div>
  </div>
</template>