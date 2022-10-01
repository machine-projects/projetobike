<script lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { mapActions } from 'pinia';
import { useUserStore } from '../store/userStore';


export default defineComponent({
  components: {
    ChevronRightIcon
  },
  data() {
    return {
      cpf: '' as string,
      password: '' as string
    }
  },
  methods: {
    ...mapActions(useUserStore, ['changeLogInState']),
    // TODO IMPLEMENTAR VALIDACAO DOS CAMPOS ANTES DE FAZER O LOGIN
    doLogin() {
      this.changeLogInState({
        cpf: this.cpf,
        password: this.password
      })
      // this.$router.push({ name: '/' })
    }
  }
})
</script>

<template>
  <div class="login">
    <form @submit.prevent="doLogin" class="bg-white dark:bg-gray-900">
      <div class="flex justify-center min-h-screen">

        <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div class="w-full">
            <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Entrar.
            </h1>

            <p class="mt-4 text-gray-500 dark:text-gray-400">
              Informe seu CPF e senha para entrar em nosso site.
            </p>

            <span class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">CPF</label>
                <input autocomplete="username" v-model="cpf" type="text" placeholder="John"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Senha</label>
                <input autocomplete="current-password" v-model="password" type="password"
                  placeholder="Enter your password"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>


              <button
                class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>Entrar </span>

                <ChevronRightIcon class="h-6 w-6" />
              </button>
            </span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
