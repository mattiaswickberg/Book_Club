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
import App from '@/App'
export default {
  data () {
    return {
      user: ''
    }
  },
  computed: {
    vueRoot() {
      return this.$root
    }
  },
  created() {
        console.log('Query is: ')
        console.log(this.$route.query)
        this.$session.start()
        this.$session.set('user', this.$route.query.user)
        this.vueRoot.user =  this.$session.get('user')
      }
    }
</script>

<style lang="scss" scoped>

</style>
