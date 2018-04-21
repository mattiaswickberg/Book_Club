<template>
<div>
    <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col>
  <h1> View book page</h1>
  {{book}}

      </b-col>
      <b-col></b-col>
    </b-row>

  </b-container>
</div>
  
</template>

<script>  

export default {
  name: 'ViewBook',
  data () {
    return {
      user: false,
      book: ''
    }
  }, 
  created () {
    this.book = this.$route.params
    console.log(this.$route.params)
  }
}
</script>

<style lang="scss" scoped>

</style>
