<script setup lang="ts">
import { useCityStore } from '@/stores/cityStore';
import { reactive } from 'vue'
import { UserCircleIcon, BriefcaseIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { createUser } from '@/services/UserService';
import useVuelidate from '@vuelidate/core'
import { minLength, helpers, required, sameAs } from '@vuelidate/validators'

const cityStore = useCityStore()

let loading = ref<boolean>(false)
let repeatPassword = ref('')
const form = reactive({
  accountType: '' as string,
  firstName: '' as string,
  lastName: '' as string,
  phoneNumber: '' as string,
  email: '' as string,
  password: '' as string,
  cpf: '' as string,
  sex: '' as string,
  birthDate: '' as string,
  state: '' as string,
  city: '' as string,
  emergencyContactName: '' as string,
  emergencyContactPhoneNumber: '' as string
})


// VALIDATION
const rules = computed(() => {
  const localRules = {
    form: {
      accountType: { required: helpers.withMessage('O tipo da conta criada deve ser informado', required) },
      firstName: { required: helpers.withMessage('O primeiro nome não pode ser nulo', required) },
      lastName: { required: helpers.withMessage('O ultimo nome não pode ser nulo', required) },
      phoneNumber: { required: helpers.withMessage('O telefone não pode ser nulo', required) },
      email: { required: helpers.withMessage('Insira um email válido', required) },
      password: {
        required: helpers.withMessage('Insira uma senha', required),
        minLength: helpers.withMessage('A senha deve conter no mínimo 6 digitos', minLength(6)),
      },
      cpf: { required: helpers.withMessage('CPF precisa ser valido', required) },
      sex: { required: helpers.withMessage('O sexo não pode ser nulo', required) },
      birthDate: { required: helpers.withMessage('Insira uma data de nascimento', required) },
      state: { required: helpers.withMessage('O estado não pode ser nulo', required) },
      city: { required: helpers.withMessage('A cidade não pode ser nula', required) },
      emergencyContactName: { required: helpers.withMessage('O contato para emergências não pode ser nulo', required) },
      emergencyContactPhoneNumber: { required: helpers.withMessage('O telefone do contato de emergências não pode ser nulo', required) }
    },
    repeatPassword: {
      required: helpers.withMessage('Este campo não pode estar vazio', required),
      minLength: helpers.withMessage('A senha deve conter no mínimo 6 digitos', minLength(6)),
      sameAs: helpers.withMessage('As senhas devem ser iguais', sameAs(form.password))
    }
  }

  return localRules
})

const v$ = useVuelidate(rules, { form, repeatPassword })

const submitForm = async () => {
  const isFormCorrect = await v$.value.$validate()
  loading.value = true
  console.log()

  if (isFormCorrect) {
    createUser(form).then(res => {
      console.log(res)
    })
  } else {
    console.log(v$.value.$errors)
  }
}


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
                <input class="hidden" v-model="form.accountType" type="radio" id="atleta" name="accountType"
                  value="atleta" />
                <label for="atleta"
                  :class="[ form.accountType === 'atleta' ? 'text-white bg-blue-500' : 'text-blue-500' ]"
                  class="flex justify-center w-full px-6 py-3 border border-blue-500 rounded-md md:w-auto md:mx-2 focus:outline-none">
                  <UserCircleIcon class="h-6 w-6"
                    :class="[ form.accountType === 'atleta' ? 'text-white' : 'text-blue-500' ]" />
                  <span class="mx-2">
                    atleta
                  </span>
                </label>

                <input class="hidden" v-model="form.accountType" type="radio" id="organizador" name="accountType"
                  value="organizador" />
                <label for="organizador"
                  :class="[ form.accountType === 'organizador' ? 'text-white bg-blue-500' : 'text-blue-500' ]"
                  class="flex justify-center w-full px-6 py-3 mt-4 border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 focus:outline-none">
                  <BriefcaseIcon class="h-6 w-6"
                    :class="[ form.accountType === 'organizador' ? 'text-white' : 'text-blue-500' ]" />
                  <span class="mx-2">
                    organizador
                  </span>
                </label>
              </div>
              <span v-if="v$.form.accountType.$error" class="text-red-500 text-sm">
                {{ v$.form.accountType.$errors[0].$message }}
              </span>
            </div>

            <div class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Nome</label>
                <input autocomplete="given-name" v-model="form.firstName" type="text" placeholder="John"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <span v-if="v$.form.firstName.$error" class="text-red-500 text-sm">
                  {{ v$.form.firstName.$errors[0].$message }}
                </span>
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Sobrenome</label>
                <input autocomplete="family-name" v-model="form.lastName" type="text" placeholder="Snow"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <span v-if="v$.form.lastName.$error" class="text-red-500 text-sm">
                  {{ v$.form.lastName.$errors[0].$message }}
                </span>
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Telefone</label>
                <input autocomplete="tel" v-model="form.phoneNumber" type="text" placeholder="(XX) XXXXX-XXXX"
                  v-mask="'(00) 00000-0000'"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <span v-if="v$.form.phoneNumber.$error" class="text-red-500 text-sm">
                  {{ v$.form.phoneNumber.$errors[0].$message }}
                </span>
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email</label>
                <input autocomplete="email" v-model="form.email" type="email" placeholder="johnsnow@example.com"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <span v-if="v$.form.email.$error" class="text-red-500 text-sm">
                  {{ v$.form.email.$errors[0].$message }}
                </span>
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Senha</label>
                <input autocomplete="new-password" v-model="form.password" type="password"
                  placeholder="Enter your password"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <span v-if="v$.form.password.$error" class="text-red-500 text-sm">
                  {{ v$.form.password.$errors[0].$message }}
                </span>
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Repita a senha</label>
                <input autocomplete="new-password" v-model="repeatPassword" type="password"
                  placeholder="Enter your password"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <span v-if="v$.repeatPassword.$error" class="text-red-500 text-sm">
                  {{ v$.repeatPassword.$errors[0].$message }}
                </span>
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">CPF</label>
                <input v-model="form.cpf" type="text" placeholder="Enter your CPF" v-mask="'000.000.000-00'"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <span v-if="v$.form.cpf.$error" class="text-red-500 text-sm">
                  {{ v$.form.cpf.$errors[0].$message }}
                </span>
              </div>

              <div class="md:flex flex-col md:items-start md:-mx-2">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Sexo</label>
                <div class="flex flex-row items-center">
                  <input v-model="form.sex" type="radio" id="masculino" name="sex" value="masculino" />
                  <label for="masculino">
                    <span class="mx-2">
                      Masculino
                    </span>
                  </label>
                </div>

                <div class="flex flex-row items-center">
                  <input v-model="form.sex" type="radio" id="feminino" name="sex" value="feminino" />
                  <label for="feminino">
                    <span class="mx-2">
                      Feminino
                    </span>
                  </label>
                </div>
                <span v-if="v$.form.sex.$error" class="text-red-500 text-sm">
                  {{ v$.form.sex.$errors[0].$message }}
                </span>
              </div>

              <div class="col-span-2">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Data de nascimento</label>
                <input v-model="form.birthDate" type="date" placeholder="Escolha uma data de nascimento"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <span v-if="v$.form.birthDate.$error" class="text-red-500 text-sm">
                  {{ v$.form.birthDate.$errors[0].$message }}
                </span>
              </div>



              <div>
                <div class="mt-2 grow flex items-center text-sm text-gray-500">
                  <StateInput @@state-changed="form.state = $event" />
                </div>
                <span v-if="v$.form.state.$error" class="text-red-500 text-sm">
                  {{ v$.form.state.$errors[0].$message }}
                </span>
              </div>

              <div>
                <div class="mt-2 grow flex items-center text-sm text-gray-500">
                  <CityInput @@city-changed="form.city = $event" />
                </div>
                <span v-if="v$.form.city.$error" class="text-red-500 text-sm">
                  {{ v$.form.city.$errors[0].$message }}
                </span>
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Contato de emergencia</label>
                <input v-model="form.emergencyContactName" type="text" placeholder="Nome do contato de emergencia"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <span v-if="v$.form.emergencyContactName.$error" class="text-red-500 text-sm">
                  {{ v$.form.emergencyContactName.$errors[0].$message }}
                </span>
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Telefone emergencia</label>
                <input v-model="form.emergencyContactPhoneNumber" type="text" placeholder="(00) 00000-0000"
                  v-mask="'(00) 00000-0000'"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                <span v-if="v$.form.emergencyContactPhoneNumber.$error" class="text-red-500 text-sm">
                  {{ v$.form.emergencyContactPhoneNumber.$errors[0].$message }}
                </span>
              </div>

            </div>



            <button @click="submitForm"
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
