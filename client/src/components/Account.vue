<template>
<div>
  <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col>
        <div>
          <h1> Account page</h1>
          <div id='bookCases'>
            <!-- Render book cases and books -->
              <div v-for='item in cases' :key='item.name' class='caseDiv'>
                {{item.title}}
                {{item.books}}
                <!-- <div v-for='item in item.books' :key='item.title' class='book'>
                  {{item.title}}
                </div> -->
              </div>
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
import fetchBookCasesMixin from '@/mixins/fetchBookCases'
import fetchBooksMixin from '@/mixins/fetchBooks'
import {HTTP} from '@/services/Api'

export default {
  name: 'Account',
    mixins: [isLoggedInMixin, fetchBookCasesMixin],
  data () {
    return {
      user: false,
      newCase: false,
      bookCase: {
        title: '',
        user: ''
      },
      cases: []
    }
  },
    created() {
      // Check who's logged in
      console.log(this.$session.get('user'))

      // fetch book cases from user
      let user = this.$session.get('user')
      this.fetchBookCases(user._id)
      .then(response => {
        console.log('Book cases are: ')
        console.log(response)
        this.cases = response
      })
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
      this.bookCase.user = this.$session.get('user')
      return HTTP.post('bookcase', this.bookCase)
      .then(response => {
        // console.log(response)
        this.newCase = false
      let user = this.$session.get('user')
      this.fetchBookCases(user._id)      
      .then(response => {
        this.cases = response
      })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.caseDiv {
  overflow:hidden;
  background-color: whitesmoke;
  border: solid grey 1px;
  margin: 1px;
}

.book {
  display:inline;
}
</style>
