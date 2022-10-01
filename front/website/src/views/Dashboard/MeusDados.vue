<template>
   <div class="container text-center">
        <div class="row">
            <div class="col-sm p-3">
                <div class="card">
                    <div class="card-header">
                        Dados Pessoais
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex">
                            <div class="d-flex justify-content-center">
                                <img src="https://d3ifpylmkdyg0z.cloudfront.net/assets/athletes/avatar/original/missing_male-a753bcd69cf76ff21e8e105e532ee3fc.png" style="width: 100px; height: 100px;" alt="imagem de perfil">
                            </div>
                            <div class="w-100 ml-3">
                                <p class="text-center"> Foto do perfil </p>
                                <label for="avatar">Escolha uma foto de perfil: </label>
                                <input name="avatar" accept="image/png, image/jpeg" @change="alterarFoto" type="file" class="custom-file-input w-100" id="inputGroupFile02">
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="input-group">
                                <span class="input-group-text">Nome e Sobrenome</span>
                                <input type="text" v-model="userData.firstName" aria-label="nome" class="form-control">
                                <input type="text" v-model="userData.lastName" aria-label="sobrenome" class="form-control">
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="input-group">
                                <span class="input-group-text">Data de nascimento</span>
                                <input type="date" v-model="userData.birthDate" aria-label="data de nascimento" class="form-control">
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="input-group">
                                <span class="input-group-text">Email</span>
                                <input type="text" v-model="userData.email" aria-label="email" class="form-control">
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="input-group">
                                <span class="input-group-text">Telefone</span>
                                <input type="text" v-model="userData.phoneNumber" aria-label="telefone" class="form-control">
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="input-group d-flex align-items-center">
                                <span class="input-group-text">Sexo</span>
                                <input type="radio" name="sex" value="masculino" checked v-model="userData.sex" aria-label="sexo masculino" class="form-check-input mx-2 my-0">
                                <label for="masculino"> Masculino </label>
                                <input type="radio" name="sex" value="feminino" v-model="userData.sex" aria-label="sexo feminino" class="form-check-input mx-2 my-0">
                                <label for="feminino"> Feminino </label>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div v-if="mudarLocal" class="input-group">
                                <StateInput
                                    iconName="city-variant-outline" 
                                    placeholder="Selecione o Estado"
                                    @selectedStateObject="selectStateMethod"
                                />
                                <CityInput
                                    label=""
                                    @selectedCity="selectedCityReceive = $event"
                                    @eraseSelectedCity="selectedCityReceive = $event;"
                                    :stateObject="this.selectedStateReceive"
                                    iconName="city-variant-outline" 
                                    placeholder="Selecione o Estado"
                                />
                            </div>
                            <div v-else class="input-group d-flex align-items-center">
                                <span class="input-group-text">Estado</span>
                                <input type="text" @focus="mudarLocal = !mudarLocal" name="sex" v-model="userData.state" aria-label="estado" class="form-control mx-2 my-0">
                                <span class="input-group-text">Cidade</span>
                                <input type="text" @focus="mudarLocal = !mudarLocal" name="sex" v-model="userData.city" aria-label="cidade" class="form-control mx-2 my-0">
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="input-group">
                                <span class="input-group-text">CPF</span>
                                <input type="text" v-model="userData.cpf" disabled aria-label="cpf" class="form-control">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-sm p-3">
                <div class="card">
                    <div class="card-header">
                        Contatos de Emergência
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="input-group">
                                <span class="input-group-text">Nome</span>
                                <input type="text" v-model="userData.emergencyContactName" aria-label="nome do contato de emergencia" class="form-control">
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="input-group">
                                <span class="input-group-text">Telefone</span>
                                <input type="text" v-model="userData.emergencyContactPhoneNumber" aria-label="telefone do contato de emergencia" class="form-control">
                            </div>
                        </li>
                    </ul>
                </div>    
            </div>
        </div>
    </div>
</template>

<script>
import CityInput from '@/components/inputs/CityInput.vue'
import StateInput from '@/components/inputs/StateInput.vue'

export default { 
    name: 'DashboardMeusDados',
    components: {
        CityInput,
        StateInput
    },
    watch: {
        selectedCityReceive() {
            this.userData.city = this.selectedCityReceive.nome
        },
        selectedStateReceive() {
            this.userData.state = this.selectedStateReceive.sigla
        }
    },
    data() {
        return {
            selectedStateReceive: undefined,
            selectedCityReceive: undefined,
            mudarLocal: false,
            userData: {
                firstName: this.$store.state.currentUser.firstName,
                lastName: this.$store.state.currentUser.lastName,
                birthDate: this.$store.state.currentUser.birthDate,
                email: this.$store.state.currentUser.email,
                phoneNumber: this.$store.state.currentUser.phoneNumber,
                sex: this.$store.state.currentUser.sex,
                state: this.$store.state.currentUser.state,
                city: this.$store.state.currentUser.city,
                cpf: this.$store.state.currentUser.cpf,
                emergencyContactName: this.$store.state.currentUser.emergencyContactName,
                emergencyContactPhoneNumber: this.$store.state.currentUser.emergencyContactPhoneNumber,
                files: []
            }
        }
    },
    methods: {
        alterarFoto(event) {
            if(event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png') {
                this.userData.files = event.target.files
                console.log(this.userData.files)
             
            } else {
                alert(`O tipo de arquivo ${event.target.files[0].type} deve ser PNG ou JPEG`)
                event.target.value = null
            }
        },
        selectStateMethod($event) {
            this.selectedStateReceive = $event
            this.selectedCityReceive = undefined    
        },
    },
   
}
</script>

<style>
    .meusdados {
        padding: 35px
    }
</style>