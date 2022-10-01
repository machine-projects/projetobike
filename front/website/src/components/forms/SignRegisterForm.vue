<template>
 <div class="login-page">
      <transition name="fade">
         <div v-if="!registerActive" class="wallpaper-login"></div>
      </transition>
      <div class="wallpaper-register"></div>

      <div class="container">
         <div class="row">
            <div class="col-lg-6 col-md-10 col-sm-8 mx-auto">
                <div 
                    v-if="!registerActive" 
                    class="card login p-5" 
                >
                    <h1>
                        Login
                    </h1>
                    
                    <span v-show="emailEmUsoError" class="color-danger"> {{ createUserError }} </span>
                      <span v-show="usuarioCriadoSuccess" class="color-success"> Usuário criado com sucesso </span>

                    <form 
                    class="form-group"
                    >
                    <input 
                        v-model="cpfLogin" 
                        type="text" 
                        class="form-control my-2" 
                        placeholder="CPF"
                        v-mask="'###.###.###-##'" 
                        @focus="cpfLoginEmpty = false"

                    />
                    <span v-show="cpfLoginEmpty" class="color-danger"> Por favor informe o CPF</span>
                    <input
                        v-model="passwordLogin" 
                        @focus="passwordLoginEmpty = false"
                        type="password" 
                        class="form-control my-2" 
                        placeholder="Senha" 
                    >
                    <span v-show="passwordLoginEmpty" class="color-danger"> Por favor informe a senha <br></span>
                    <input 
                        type="submit" 
                        class="btn btn-primary my-2" 
                        @click.prevent="doLogin"
                    >
                    <p>
                        Ainda não tem uma conta? 
                        <a href="#" @click="registerActive = !registerActive, emptyFields = false">
                        Cadastre-se aqui
                        </a>
                    </p>
                    <p>
                        <a href="#">
                        Esqueceu sua senha?
                        </a>
                    </p>
                    </form>
                </div>

              <div 
                v-else 
                class="card register p-5" 
              >
                <h1>Cadastre-se</h1>
                <form class="form-group">
                  <input 
                    v-model="registerEmail" 
                    @focus="registerEmailEmpty = false"

                    type="email" 
                    class="form-control my-2" 
                    placeholder="Email" 
                  >
                  <span v-show="registerEmailEmpty" class="text-danger"> Por favor informe um email</span>
                  <input 
                    v-model="registerPassword" 
                    @focus="registerPasswordEmpty = false; registerPasswordWrongLength = false;"
                    type="password" 
                    class="form-control my-2" 
                    placeholder="Senha" 
                  >
                  <span v-show="registerPasswordEmpty" class="text-danger"> Por favor informe sua senha</span>
                  <span v-show="registerPasswordWrongLength" class="text-danger"> A senha deve possuir mais de 6 dígitos</span>
                  <input 
                    v-model="registerPasswordConfirm" 
                    @focus="passwordMatchError = false; registerPasswordConfirmEmpty = false"
                    type="password" 
                    class="form-control my-2" 
                    placeholder="Confirme a senha" 
                  >
                  <span v-show="passwordMatchError" class="text-danger"> As senhas devem ser iguais</span>
                  <span v-show="registerPasswordConfirmEmpty" class="text-danger"> Por favor repita sua senha</span>
                  <input 
                    v-model="registerFirstName" 
                    @focus="registerFirstNameEmpty = false"
                    type="text" 
                    class="form-control my-2" 
                    placeholder="Primeiro Nome" 
                  >
                  <span v-show="registerFirstNameEmpty" class="text-danger"> Por favor informe seu nome</span>
                  <input 
                    v-model="registerLastName" 
                    @focus="registerLastNameEmpty = false"
                    type="text" 
                    class="form-control my-2" 
                    placeholder="Sobrenome" 
                  >
                  <span v-show="registerLastNameEmpty" class="text-danger"> Por favor informe seu sobrenome</span>
                  <input 
                    v-model="registerCPF" 
                    @focus="registerCPFEmpty = false"
                    type="text" 
                    class="form-control my-2" 
                    placeholder="CPF"
                    v-mask="'###.###.###-##'" 
                  />
                  <span v-show="registerCPFEmpty" class="text-danger"> Informe seu CPF</span>
                  <b-form-group label="Sexo" v-slot="{ ariaDescribedby }">
                    <div class="d-flex flex-row gap-4">
                     <b-form-radio v-model="registerSex" @change="registerSexEmpty = false" :aria-describedby="ariaDescribedby" name="sex-fields" value="masculino">Masculino</b-form-radio>
                     <b-form-radio v-model="registerSex" @change="registerSexEmpty = false" :aria-describedby="ariaDescribedby" name="sex-fields" value="feminino">Feminino</b-form-radio>
                    </div>
                  <span v-show="registerSexEmpty" class="text-danger"> Por favor informe o sexo</span>
                  </b-form-group>

                 
                  <div class="my-3">
                    <label for="birth-date">Data de nascimento</label>
                    <b-form-datepicker id="birth-date" v-model="registerBirthDate" @shown="registerBirthDateEmpty = false" class="mb-2"></b-form-datepicker>
                  </div>
                  <span v-show="registerBirthDateEmpty" class="text-danger"> Informe sua data de nascimento</span>
                                    
    
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-6">
                        <StateInput 
                        label="Estado:"
                        iconName="city-variant-outline" 
                        placeholder="Selecione o Estado"
                        @selectedStateObject="selectStateMethod"
                        />
                      </div>
                  <span v-show="selectedStateReceiveEmpty" class="text-danger"> Informe o estado </span>
                      <div class="col-sm-6">
                        <CityInput 
                          label="Cidade:"
                          @selectedCity="selectedCityReceive = $event; selectedCityReceiveEmpty = false"
                          @eraseSelectedCity="selectedCityReceive = $event;"
                          :stateObject="this.selectedStateReceive"
                          iconName="city-variant-outline" 
                          placeholder="Selecione o Estado"
                        />
                      </div>
                  <span v-show="selectedCityReceiveEmpty" class="text-danger"> Informe a cidade</span>
                    </div>
                  </div>

                   <input 
                    v-model="registerPhoneNumber" 
                    @focus="registerPhoneNumberEmpty = false"
                    type="tel" 
                    class="form-control my-2" 
                    placeholder="Telefone para contato" 
                    v-mask="'(##) # ####-####'"
                  >
                  <span v-show="registerPhoneNumberEmpty" class="text-danger"> Informe seu numero de telefone</span>
                    <input 
                    v-model="registerEmergencyContactName" 
                    @focus="registerEmergencyContactNameEmpty = false"
                    type="text" 
                    class="form-control my-2" 
                    placeholder="Nome do Contato de Emergência" 
                  >
                  <span v-show="registerEmergencyContactNameEmpty" class="text-danger"> Informe o nome do contato de emergência</span>
                  <input 
                    v-model="registerEmergencyContactPhoneNumber" 
                    @focus="registerEmergencyContactPhoneNumberEmpty = false"
                    type="tel" 
                    class="form-control my-2" 
                    placeholder="Telefone do Contato de Emergência" 
                    v-mask="'(##) # ####-####'"
                  >
                  <span v-show="registerEmergencyContactPhoneNumberEmpty" class="text-danger"> Informe o telefone do contato de emergencia <br></span>

                  <input 
                    type="submit" 
                    class="btn btn-primary my-2" 
                    @click.prevent="doRegister"
                    @submit.prevent
                  >
                  <p>
                    Já tem uma conta? 
                    <a href="#" @click="registerActive = !registerActive">
                      Faça seu login
                    </a>
                  </p>
                </form>
              </div>
            </div>
         </div>

      </div>
   </div>
</template>

<script>
import StateInput from "../inputs/StateInput.vue";
import CityInput from "../inputs/CityInput.vue";
import axios from 'axios';

export default {  
  name: "SignRegisterForm",
  components: {
    StateInput,
    CityInput
  },
 data() {
      return {
        registerActive: false,
        cpfLogin: "",
        passwordLogin: "",
        registerEmail: "",
        registerFirstName: "",
        registerLastName: "",
        registerPassword: "",
        registerPasswordConfirm: "",
        registerCPF: "",
        registerSex: "",
        registerBirthDate: "",
        selectedStateReceive: undefined,
        selectedCityReceive: undefined,
        registerPhoneNumber: "",
        registerEmergencyContactName: "",
        registerEmergencyContactPhoneNumber: "",
        registerAccountType: "atleta",
        // error messages
        passwordMatchError: false,
        cpfLoginEmpty: false,
        passwordLoginEmpty: false,
        registerEmailEmpty: false,
        registerFirstNameEmpty: false,
        registerLastNameEmpty: false,
        registerPasswordEmpty: false,
        registerPasswordConfirmEmpty: false,
        registerCPFEmpty: false,
        registerSexEmpty: false,
        registerBirthDateEmpty: false,
        selectedStateReceiveEmpty: false,
        selectedCityReceiveEmpty: false,
        registerPhoneNumberEmpty: false,
        registerEmergencyContactNameEmpty: false,
        registerEmergencyContactPhoneNumberEmpty: false,
        registerPasswordWrongLength: false,
        emailEmUsoError: false,
        createUserError: undefined,
        usuarioCriadoSuccess: false,

      }
    },
    methods: {
       selectStateMethod($event) {
        this.selectedStateReceive = $event
        this.selectedCityReceive = undefined
        this.selectedStateReceiveEmpty = false
      },
      eraseSelectedCity() {
        this.selectedCityReceive = ""
      },
      doLogin() {
        if (this.cpfLogin === "" || this.passwordLogin === "") {
          if (this.cpfLogin === "" && this.passwordLogin === "") {
            this.cpfLoginEmpty = true;
            this.passwordLoginEmpty = true;
          } else if (this.cpfLogin === "" && this.passwordLogin !== "") {
            this.cpfLoginEmpty = true;
            this.passwordLogin = false;
          } else if (this. cpfLogin !== "" && this.passwordLogin === "") {
            this.cpfLoginEmpty = false;
            this.passwordLoginEmpty = true;
          }
        } else {
          this.$emit('loginFields', { "cpf": this.cpfLogin, "password": this.passwordLogin})
        }
      },          
      doRegister() {
         if (this.registerEmail === "" || this.registerFirstName === "" || this.registerLastName === "" || this.registerPassword === "" || this.registerPasswordConfirm === "" || this.registerCPF === "" || this.registerSex === "" || this.registerBirthDate === "" || this.selectedStateReceive === "" || this.selectedCityReceive === "" || this.registerPhoneNumber === "" || this.registerEmergencyContactName === "" || this.registerEmergencyContactPhoneNumber === "" || this.registerPassword.length < 6 || this.registerPassword !== this.registerPasswordConfirm) {
           if (this.registerPassword !== this.registerPasswordConfirm) {
             this.passwordMatchError = true;
           }
           if (this.registerPassword.length < 6) {
             this.registerPasswordWrongLength = true;
           }
           if (this.registerEmail == "") {
             this.registerEmailEmpty = true;
            }
            if (this.registerFirstName == "") {
             this.registerFirstNameEmpty = true;           
            } 
            if (this.registerLastName === "") {
              this.registerLastNameEmpty = true;         
            }
            if (this.registerPassword === "") {
              this.registerPasswordEmpty = true;            
            }
            if (this.registerPasswordConfirm === "") {
              this.registerPasswordConfirmEmpty = true;
            }
            if (this.registerCPF === "") {
              this.registerCPFEmpty = true;
            }
            if (this.registerSex === "") {
              this.registerSexEmpty = true;
            }
            if (this.registerBirthDate === "") {
              this.registerBirthDateEmpty = true;
            }
            if (this.selectedStateReceive === undefined) {
              this.selectedStateReceiveEmpty = true;
            }
            if (this.selectedCityReceive === undefined) {
              this.selectedCityReceiveEmpty = true;
            }
            if (this.registerPhoneNumber === "") {
              this.registerPhoneNumberEmpty = true;
            }
            if (this.registerEmergencyContactName === "") {
              this.registerEmergencyContactNameEmpty = true;
            }
            if (this.registerEmergencyContactPhoneNumber === "") {
              this.registerEmergencyContactPhoneNumberEmpty = true;
            }
            
         } else {

           axios.post('http://localhost:3000/api/v1/users/', {
              "email": this.registerEmail,
              "firstName": this.registerFirstName,
              "lastName": this.registerLastName,
              "password": this.registerPassword,
              "cpf": this.registerCPF,
              "sex": this.registerSex,
              "birthDate": this.registerBirthDate,
              "state": this.selectedStateReceive.nome,
              "city": this.selectedCityReceive.nome,
              "phoneNumber": this.registerPhoneNumber,
              "emergencyContactName": this.registerEmergencyContactName,
              "emergencyContactPhoneNumber": this.registerEmergencyContactPhoneNumber,
              "accountType": "atleta"
            })
            .then(function (response) {
             console.log(response.response)

             if (response.data.statusCode == 201) {
               let self = this
               self.usuarioCriadoSuccess = true;
             }

            })
            .catch(function (error)   {
             console.log(error.response);
              if (error.response.data.statusCode == 404) {
                let self = this
               self.emailEmUsoError = true;
               self.usuarioCriadoSuccess = error.response.data.message[0]
             }
  });

            }
         },
      }
    }

</script>


<style scoped>

</style>



<!-- doLogout() {
        store.dispatch('logOut');
      }, -->


      