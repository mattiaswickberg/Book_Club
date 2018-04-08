<template>
<div>
  <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col>
        <div>
          <h1> Account page</h1>


        </div>
      </b-col>
      <b-col></b-col>
    </b-row>

  </b-container>
</div>
  
</template>

<script>
import isLoggedInMixin from '@/mixins/checkAuth'

export default {
  name: 'Account',
    mixins: [isLoggedInMixin],
  data () {
    return {
      user: false
    }
  },
    created() {
    this.checkIfLoggedIn()
    .then(response => {
      this.user = response
      console.log(this.user)
    })
    .catch(error => console.log(error))
  }
}
</script>

<style lang="scss" scoped>

</style>
