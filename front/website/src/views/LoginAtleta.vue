<template>
  <div>
  <NavBar/>
  <div id="atleta-page" class="d-flex flex-column justify-content-center">
        <SignRegisterForm />
  </div>
  </div>
</template>

<script>
 import SignRegisterForm from '@/components/forms/SignRegisterForm.vue'
 import NavBar from '@/components/NavBar.vue'

  export default {
    name: 'LoginAtleta',
    components: {
      SignRegisterForm,
      NavBar
    }
  }
</script>

<style scoped>
  #atleta-page {
    height: calc(100vh - 58px);
  }
</style>
