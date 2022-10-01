<template>
    <div class="w-100 h-100 p-2">
        <div class="w-100">
            <InscricoesOuEventos v-if="this.$store.state.currentUser.accountType === 'atleta'" title="Minhas Inscrições" :eventos="eventos"></InscricoesOuEventos>
            <InscricoesOuEventos v-else title="Meus Eventos" :eventos="eventos"></InscricoesOuEventos>
        </div>
        <div class=" h-100" v-if="this.$store.state.currentUser.accountType === 'atleta'">
            <ProximosEventos></ProximosEventos>
        </div>
        <template v-else >
            <b-button @click="createEvent">CADASTRAR EVENTO</b-button>
        </template>
        <router-view />
       
    </div>
</template>

<script>
import InscricoesOuEventos from '@/components/InscricoesOuEventos.vue'
import ProximosEventos from '@/components/ProximosEventos.vue'

export default { 
    name: 'DashboardInicio',
    components: {
        InscricoesOuEventos,
        ProximosEventos
    },
    data() {
        return {
            cadastrarEvento: false,
            eventos: [
                { id: 1, EVENTO: 'Corrida 1', 'ATLETA(S)': 1, STATUS: 'pagamento pendente' },
                { id: 2, EVENTO: 'Corrida 2', 'ATLETA(S)': 2, STATUS: 'pago' },
                { id: 3, EVENTO: 'Corrida 3', 'ATLETA(S)': 4, STATUS: 'evento encerrado' },
                { id: 4, EVENTO: 'Corrida 4', 'ATLETA(S)': 1, STATUS: 'evento encerrado' }
            ]
        }
    },
    methods: {
        createEvent() {
            this.$router.push({ name: 'cadastrarEvento' })
        }
    }
}
</script>