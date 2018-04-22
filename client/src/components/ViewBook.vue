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
      ratings: {{book.ratings}} <!--Change this to computed value -->
      comments: {{book.comments}} <!-- change this to v-for that displays comments as separate divs-->
    </div>
  </div>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols='6'>
        <b-btn variant='primary'>Rate book</b-btn>
        <b-btn variant='success'>Add Comment</b-btn>
        <b-btn variant='warning' v-on:click='removeBook'>Remove from your bookcase</b-btn>
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
