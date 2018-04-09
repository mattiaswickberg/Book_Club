<template>
<div>
  <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col>
        <div>
          <h1> Account page</h1>
          <div id='bookCases'>
            <!-- Render book cases and books <div v-for='cases in cases'> -->

            </div>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col></b-col>
      <b-col>
        <b-button :size='lg' :variant='primary' v-on:click='addNewCase'>Lägg till bokhylla</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols='6'>
        <div v-if='newCase'>
          <form id='createBookcase' @submit.prevent='createBookCase'>
        <input type='text' v-model='bookCase.title' class='form-control' placeholder="Name of bookcase">
        <input type='submit' value='Skapa bokhylla'>
        </form>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>

  </b-container>
</div>
  
</template>

<script>
import isLoggedInMixin from '@/mixins/checkAuth'
import {HTTP} from '@/services/Api'

export default {
  name: 'Account',
    mixins: [isLoggedInMixin],
  data () {
    return {
      user: false,
      newCase: false,
      bookCase: {
        title: ''
      },
      cases: []
    }
  },
    created() {
    this.checkIfLoggedIn()
    .then(response => {
      this.user = response
      console.log(this.user)
      // fetch book cases from user
    })
    .catch(error => console.log(error))
  },
  methods: {
    addNewCase: function() {
      if (this.newCase) {
        this.newCase = false
      } else { 
        this.newCase = true
        }
    },
    createBookCase: function() {
      console.log('Adding book case' + this.bookCase)
      return HTTP.post('bookcase', this.bookCase)
      .then( function (response) {
        console.log(response)
        this.newCase = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
