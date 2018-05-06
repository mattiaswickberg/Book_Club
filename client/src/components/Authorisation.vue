<template>
  <div>
    <h1>
      Inloggningen lyckades!
    </h1>
    <router-link to="MainLoggedIn">
      <b-btn>Gå till huvudsidan</b-btn>
    </router-link>
  </div>
</template>

<script>
import {HTTP} from '@/services/Api'
export default {
  created() {
        console.log('Query is: ')
        console.log(this.$route.query)
        this.user === this.$route.query.user
        console.log('User: ')
        console.log(this.user)
      },
      mounted() {
      }
    }
</script>

<style lang="scss" scoped>

</style>
