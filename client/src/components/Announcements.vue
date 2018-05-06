<template>
<div>
  <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col cols='10'>
        <div>
          <h1>Meddelanden till SSIS bokcirkel</h1>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>

  </b-container>
</div>
  
</template>

<script>
import router from '@/router/index'
export default {
  data() {
    return {

    }
  },
  beforeCreate: function () {
    let user = this.$session.get('user')
    if (user.role !== 'student') {
      router.push('/')
    }
  }
  }
</script>

<style lang="scss" scoped>

</style>
