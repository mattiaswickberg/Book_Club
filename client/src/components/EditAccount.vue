<template>
<div>
    <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col>
  <h1> Edit account page</h1>

      </b-col>
      <b-col></b-col>
    </b-row>

  </b-container>
</div>
  
</template>

<script>  
import isLoggedInMixin from '@/mixins/checkAuth'

export default {
  name: 'EditAccount',
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
