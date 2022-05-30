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
                    :class="{ error: emptyFields }"
                >
                    <h1>
                        Login
                    </h1>
                    
                    <form 
                    class="form-group"
                    >
                    <input 
                        v-model="emailLogin" 
                        type="email" 
                        class="form-control my-2" 
                        placeholder="Email" 
                        required
                    />
                    <input
                        v-model="passwordLogin" 
                        type="password" 
                        class="form-control my-2" 
                        placeholder="Senha" 
                        required
                    >
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
                :class="{ error: emptyFields }"
              >
                <h1>Sign Up</h1>
                <form class="form-group">
                  <input 
                    v-model="emailReg" 
                    type="email" 
                    class="form-control my-2" 
                    placeholder="Email" 
                    required
                  >
                  <input 
                    v-model="passwordReg" 
                    type="password" 
                    class="form-control my-2" 
                    placeholder="Senha" 
                    required
                  >
                  <input 
                    v-model="confirmReg" 
                    type="password" 
                    class="form-control my-2" 
                    placeholder="Confirme a senha" 
                    required
                  >
                  <input 
                    type="submit" 
                    class="btn btn-primary my-2" 
                    @click="doRegister"
                  >
                  <p>
                    Já tem uma conta? 
                    <a href="#" @click="registerActive = !registerActive, emptyFields = false">
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

export default {
  name: "SignRegisterForm",
 data() {
      return {
        registerActive: false,
        emailLogin: "",
        passwordLogin: "",
        emailReg: "",
        passwordReg: "",
        confirmReg: "",
        emptyFields: false
      }
    },
    methods: {
      doLogin() {
        if (this.emailLogin === "" || this.passwordLogin === "") {
          this.emptyFields = true;
        } else {
          this.$emit('loginFields', { "email": this.emailLogin, password: this.passwordLogin})
        }
      },      
      doRegister() {
         if (this.emailReg === "" || this.passwordReg === "" || this.confirmReg === "") {
            this.emptyFields = true;
         } else {
            alert("You are now registered");
         }
      }
    }
};
</script>


<style scoped>

</style>



<!-- doLogout() {
        store.dispatch('logOut');
      }, -->