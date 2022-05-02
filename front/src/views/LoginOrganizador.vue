<template>
 <div id="organizador-page" class="d-flex flex-column justify-content-center">
        <SignRegisterForm />
  </div> 
</template>

<script>
 import SignRegisterForm from '@/components/forms/SignRegisterForm.vue'
  export default {
    name: 'LoginOrganizador',
    components: {
      SignRegisterForm
    }
  }
</script>


<style scoped>
   #organizador-page {
     height: calc(100vh - 56.84px);
  }
</style>