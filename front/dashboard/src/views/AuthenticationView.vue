<template>
  <h1>teste</h1>
</template>

<script>
import store from '../store'
import router from '@/router/index'

export default {
  created() {
    this.setToken()
    store.commit('logIn')
    router.push('/dashboard')
  },
  methods: {
    setToken() {
      localStorage.setItem('access_token', this.$route.query.token)

    },
  }
}
</script>


<style lang="css" scoped>
  .p-0 {
    padding: 0;
  }

  .my-1 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .mr-1 {
    margin-right: 1rem;
  }

  .w-75 {
    width: 75%;
    margin: auto;
  }
</style>
