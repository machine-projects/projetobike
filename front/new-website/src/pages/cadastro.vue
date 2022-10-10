<script setup lang="ts">
import { getCities, getStates } from '@/services/CityService'
import { ref, reactive } from 'vue'
import type { Option } from '@/types/CityTypes'

const selectedState = ref<Option | undefined>(undefined)
const states = reactive<Option[]>([])
const cities = reactive<Option[]>([])

// ========== WATCH SELECTED STATE PROP TO FETCH STATE CITIES ==========
watch(selectedState, (newSelectedState, oldSelectedState) => {
  if (newSelectedState) {
    getCities(newSelectedState).then(res => {
      Object.assign(cities, [...res.data])
    })
  }

})

// ========================= FETCH STATES ===============================
onMounted(() => {
  getStates().then(res => {
    const temp = res.data.map(({ id, nome, sigla }: Option) => {
      return { id, nome, sigla: sigla?.toLowerCase() }
    })
    states.push(...temp)
  })
})
</script>

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
      accountType: '' as string,
      firstName: '' as string,
      lastName: '' as string,
      phoneNumber: '' as string,
      email: '' as string,
      password: '' as string,
      repeatPassword: '' as string,
      cpf: '' as string,
      sex: '' as string,
      birthDate: '' as string,
      state: '' as string,
      city: '' as string,
      emergencyContactName: '' as string,
      emergencyContactPhoneNumber: '' as string
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
                <input class="hidden" v-model="accountType" type="radio" id="atleta" name="accountType"
                  value="atleta" />
                <label for="atleta" :class="[ accountType === 'atleta' ? 'text-white bg-blue-500' : 'text-blue-500' ]"
                  class="flex justify-center w-full px-6 py-3 border border-blue-500 rounded-md md:w-auto md:mx-2 focus:outline-none">
                  <UserCircleIcon class="h-6 w-6"
                    :class="[ accountType === 'atleta' ? 'text-white' : 'text-blue-500' ]" />
                  <span class="mx-2">
                    atleta
                  </span>
                </label>

                <input class="hidden" v-model="accountType" type="radio" id="organizador" name="accountType"
                  value="organizador" />
                <label for="organizador"
                  :class="[ accountType === 'organizador' ? 'text-white bg-blue-500' : 'text-blue-500' ]"
                  class="flex justify-center w-full px-6 py-3 mt-4 border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 focus:outline-none">
                  <BriefcaseIcon class="h-6 w-6"
                    :class="[ accountType === 'organizador' ? 'text-white' : 'text-blue-500' ]" />
                  <span class="mx-2">
                    organizador
                  </span>
                </label>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
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
                <input autocomplete="tel" v-model="phoneNumber" type="text" placeholder="(XX) XXXXX-XXXX"
                  v-mask="'(00) 00000-0000'"
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

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">CPF</label>
                <input v-model="cpf" type="text" placeholder="Enter your CPF" v-mask="'000.000.000-00'"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div class="md:flex flex-col md:items-start md:-mx-2">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Sexo</label>
                <div class="flex flex-row items-center">
                  <input v-model="sex" type="radio" id="masculino" name="sex" value="masculino" />
                  <label for="masculino">
                    <span class="mx-2">
                      Masculino
                    </span>
                  </label>
                </div>

                <div class="flex flex-row items-center">
                  <input v-model="sex" type="radio" id="feminino" name="sex" value="feminino" />
                  <label for="feminino">
                    <span class="mx-2">
                      Feminino
                    </span>
                  </label>
                </div>
              </div>

              <div class="col-span-2">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Data de nascimento</label>
                <input v-model="birthDate" type="date" placeholder="Escolha uma data de nascimento"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>



              <div>
                <div class="mt-2 grow flex items-center text-sm text-gray-500">
                  <SelectInput @@selecionado="selectedState = $event, state = $event.sigla" name="Estado"
                    :options="states" />
                </div>

              </div>

              <div>
                <div class="mt-2 grow flex items-center text-sm text-gray-500">
                  <SelectInput @@selecionado="city = $event.nome" name="Cidade" :options="cities" />
                </div>
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Contato de emergencia</label>
                <input v-model="emergencyContactName" type="text" placeholder="Nome do contato de emergencia"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Telefone emergencia</label>
                <input v-model="emergencyContactPhoneNumber" type="text" placeholder="(00) 00000-0000"
                  v-mask="'(00) 00000-0000'"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

            </div>



            <button
              class="flex items-center justify-between w-full px-6 py-3 mt-5 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              <span>Cadastrar </span>

              <ChevronRightIcon class="h-6 w-6" />
            </button>

          </div>
        </div>
      </div>
    </form>
  </div>
</template>
