<template>
  <div>
    <h1>
      Auth page
    </h1>
  </div>
</template>

<script>
import {HTTP} from '@/services/Api'
export default {
  created() {
        HTTP.get('/sessionstatus')
            .then(response => {
        console.log(response.data)
        this.$session.start()
        this.$session.set('user', response.data)
            })
            .catch(error => {
              reject(error.response.data)
            })
      },
      mounted() {
        this.$router.push({ name: 'Account' })
      }
    }
</script>

<style lang="scss" scoped>

</style>
