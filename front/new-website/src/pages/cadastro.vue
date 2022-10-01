<script lang="ts">
import { defineComponent } from 'vue';
import { UserCircleIcon, BriefcaseIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

export default defineComponent({
  components: {
    UserCircleIcon,
    BriefcaseIcon,
    ChevronRightIcon
  },
  data() {
    return {
      userType: '' as string,
      firstName: '' as string,
      lastName: '' as string,
      phone: '' as string,
      email: '' as string,
      password: '' as string,
      repeatPassword: '' as string
    }
  }
})
</script>

<template>
  <div class="cadastro">
    <!-- component -->
    <form @submit.prevent class="bg-white dark:bg-gray-900">
      <div class="flex justify-center min-h-screen">

        <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div class="w-full">
            <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Cadastre-se gratuitamente.
            </h1>

            <p class="mt-4 text-gray-500 dark:text-gray-400">
              Crie sua conta e verifique seus dados para participar dos melhores eventos de ciclismo.
            </p>

            <div class="mt-6">
              <h1 class="text-gray-500 dark:text-gray-300">Escolha o tipo da conta</h1>

              <div class="mt-3 md:flex md:items-center md:-mx-2">
                <input class="hidden" v-model="userType" type="radio" id="atleta" name="userType" value="atleta" />
                <label for="atleta" :class="[ userType === 'atleta' ? 'text-white bg-blue-500' : 'text-blue-500' ]"
                  class="flex justify-center w-full px-6 py-3 border border-blue-500 rounded-md md:w-auto md:mx-2 focus:outline-none">
                  <UserCircleIcon class="h-6 w-6" :class="[ userType === 'atleta' ? 'text-white' : 'text-blue-500' ]" />
                  <span class="mx-2">
                    atleta
                  </span>
                </label>

                <input class="hidden" v-model="userType" type="radio" id="organizador" name="userType"
                  value="organizador" />
                <label for="organizador"
                  :class="[ userType === 'organizador' ? 'text-white bg-blue-500' : 'text-blue-500' ]"
                  class="flex justify-center w-full px-6 py-3 mt-4 border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 focus:outline-none">
                  <BriefcaseIcon class="h-6 w-6"
                    :class="[ userType === 'organizador' ? 'text-white' : 'text-blue-500' ]" />
                  <span class="mx-2">
                    organizador
                  </span>
                </label>
              </div>
            </div>

            <span class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Nome</label>
                <input autocomplete="given-name" v-model="firstName" type="text" placeholder="John"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Sobrenome</label>
                <input autocomplete="family-name" v-model="lastName" type="text" placeholder="Snow"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Telefone</label>
                <input autocomplete="tel" v-model="phone" type="text" placeholder="(XX) XXXXX-XXXX"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email</label>
                <input autocomplete="email" v-model="email" type="email" placeholder="johnsnow@example.com"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Senha</label>
                <input autocomplete="new-password" v-model="password" type="password" placeholder="Enter your password"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Repita a senha</label>
                <input autocomplete="new-password" v-model="repeatPassword" type="password"
                  placeholder="Enter your password"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <button
                class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>Cadastrar </span>

                <ChevronRightIcon class="h-6 w-6" />
              </button>
            </span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
