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
  data () {
    return {
      user: ''
    }
  },
  created() {
        console.log('Query is: ')
        console.log(this.$route.query)
        this.$session.start()
        this.$session.set('user', this.$route.query.user)
        this.user = this.$route.query.user
        console.log('User: ')
        console.log(this.user)
        App.$forceupdate()
      },
      mounted() {
      }
    }
</script>

<style lang="scss" scoped>

</style>
