<template>
  <div class="home">
     <NavBar />
    <CarrosselBanner />
    <BuscarCorridas class="w-75 m-auto"/>

     <div 
      class="py-4"
    >
      <b-card 
        class="w-75 m-auto text-center"
      >
        <div class="rounded bg-secondary text-light d-flex flex-row align-items-center">
          <mdicon 
            name="calendar-check" 
            class="mx-3"
          />
          <h2
            class="m-0"
          >
            Eventos Encerrados
          </h2>
        </div>
      </b-card>
    </div>
  
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import CarrosselBanner from '@/components/CarrosselBanner.vue'
import BuscarCorridas from '@/components/BuscarCorridas.vue'

export default {
  name: 'HomeView',
  components: {
   CarrosselBanner,
   BuscarCorridas,
   NavBar
   
  }
}
</script>
