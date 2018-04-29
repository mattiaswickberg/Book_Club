<template>
<div>
    <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col cols='6'>
  <h1> {{book.title}}</h1>
  <div id='displayBookDetails'>
    <div class='mainBookDetails'>
      <img v-bind:src="book.images[0].thumbnail">
      <p>Författare: {{book.author}}</p>
      <p>Titel: {{book.title}}</p>
      <p>Utgivningsår: {{book.publishedYear}}</p>
   </div>

    <div id='minorBookDetails'>
    <p>isbn: {{book.isbn}}</p>
    </div>

    <div id='bookAdditional'>
      Your rating: {{book.ratings}} <!--Change this to computed value -->
      Average rating: {{book.ratings}}
      comments: {{book.comments}} <!-- change this to v-for that displays comments as separate divs-->
    </div>
  </div>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols='6'>
        <b-btn variant='primary' v-on:click='rateBook'>Betygsätt bok</b-btn>
        <b-btn v-b-toggle.collapseComment variant='success'>Kommentera</b-btn>
        <b-btn variant='warning' v-on:click='removeBook'>Ta bort bok från bokhylla</b-btn>
        <b-collapse id='collapseComment' class='mt-2'>
          <b-form>
            <b-label>Kommentar:</b-label>
            <b-form-textarea id='comment'
            v-model='commentText'
            placeholder='Skriv din kommentar här'
            :rows='4'>
            </b-form-textarea>
            <b-btn variant='success' v-on:click='addComment'>Spara kommentar</b-btn>
          </b-form>
        </b-collapse>
      </b-col>
      <b-col></b-col>
    </b-row>

  </b-container>
</div>
  
</template>

<script>  
  import fetchBookMixin from '@/mixins/fetchBook'
  import {HTTP} from '@/services/Api'

export default {
  name: 'ViewBook',
  mixins: [fetchBookMixin],
  data () {
    return {
      user: false,
      book: '',
      bookcase: ''
    }
  }, 
  methods: {
    removeBook: function(caseID) {
      HTTP.delete('/book', {params: {bookID: this.book._id, caseID: this.bookcase}})
    }
  },
  created () {
    this.fetchBook(this.$route.params.id)
    .then(response => {
      this.book = response
    })
    this.bookcase = this.$route.params.bookcase
    console.log(this.$route.params)
    
  }
}
</script>

<style lang="scss" scoped>
#displayBookDetails {
  background: whitesmoke;
  border: 1px solid grey;
}

#mainBookDetails {
font-size: 120%;
}

#minorBookDetails {
font-size: 80%;
}
</style>
