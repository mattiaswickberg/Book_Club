<template>
<div>
    <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col cols='6'>
  <div id='displayBookDetails'>
      <h1> {{book.title}}</h1>
    <div class='mainBookDetails'>
      <!-- <img v-bind:src="book.images[0].thumbnail"> -->
      <p>Författare: {{book.author}}</p>
      <p>Titel: {{book.title}}</p>
      <p>Utgivningsår: {{book.publishedYear}}</p>
   </div>

    <div id='minorBookDetails'>
    <p>isbn: {{book.isbn}}</p>
    </div>

    <div id='bookAdditional'>
      <!-- Ditt betyg: {{rating}} -->
      Medelbetyg: {{averageRating}} 
      Antal kommentarer: {{commentsNumber}} 
    </div>
  </div>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols='6'>
        <p></p>
        <b-btn v-b-toggle.collapseRating variant='primary'>Betygsätt bok</b-btn>
        <b-btn v-b-toggle.collapseComment variant='success'>Kommentera</b-btn>
        <b-btn v-b-toggle.collapseAddBook variant='warning'>Lägg till i bokhylla</b-btn>
        <b-btn v-b-toggle.collapseRemove variant='danger'>Ta bort bok</b-btn>
        <b-collapse id='collapseRemove' class='mt-2'>
          Are you sure you want to remove this book from your bookcase?
          <b-btn v-b-toggle.collapseRemove variant='danger' v-on:click='removeBook'>Remove Book</b-btn>
          </b-collapse> 
        <b-collapse id='collapseRating' class='mt-2'>
          <b-form>
            <label>Betyg:</label>
            <b-form-radio-group id='rateBookForm' v-model='rating'>
              <b-form-radio value='1'>1</b-form-radio>
              <b-form-radio value='2'>2</b-form-radio>
              <b-form-radio value='3'>3</b-form-radio>
              <b-form-radio value='4'>4</b-form-radio>
              <b-form-radio value='5'>5</b-form-radio>
            </b-form-radio-group>
            <b-btn v-on:click='rateBook'>Spara betyg</b-btn>
          </b-form>
        </b-collapse>
        <b-collapse id='collapseComment' class='mt-2'>
          <b-form>
            <label>Kommentar:</label>
            <b-form-textarea id='comment'
            v-model='commentText'
            placeholder='Skriv din kommentar här'
            :rows='4'>
            </b-form-textarea>
            <b-btn variant='success' v-on:click='addComment'>Spara kommentar</b-btn>
          </b-form>
        </b-collapse>
        <b-collapse id='collapseAddBook' class='mt-2'>
            <b-form-select v-model='chosenBookCase' :options='bookCaseNames' class='mb-3' />
            <b-btn variant='success' v-on:click='addBook()'>Lägg till i bokhylla</b-btn>
        </b-collapse>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col>
        <p></p>
        <div id='commentDiv' v-for='comment in book.comments' :key='comment._id'>
        <p id='commentBody'>{{comment.comment}}</p>
        <p id='commentUser'> Added by user: {{comment.user}} at {{comment.date}}</p>
        <b-btn size='sm' id='reply' v-on:click='replyToComment(comment._id)'>Svara</b-btn>
        <!-- Add collapse to reply to comment and method-->
      </div>      
      </b-col>
      <b-col></b-col>
    </b-row>

  </b-container>
</div>
  
</template>

<script>  
  import fetchBookMixin from '@/mixins/fetchBook'
  import fetchBookCasesMixin from '@/mixins/fetchBookCases'
  import {HTTP} from '@/services/Api'

export default {
  name: 'ViewBook',
  mixins: [fetchBookMixin, fetchBookCasesMixin],
  data () {
    return {
      user: false,
      book: '',
      bookCaseNames: [],
      bookCases: [],
      chosenBookCase: '',
      bookcase: '',
      commentText: ''
    }
  },
  computed: {
    /* rating: function () {
      let userRating = this.book.ratings.filter(rating => rating.user === this.user._id)
      console.log(userRating)
      if (userRating.length > 0) {return userRating[0].rating} else { return 0 }
    }, 
    averageRating: function () {
      let count = 0
      let sum = 0
      this.book.ratings.forEach(element => {
        sum += element.rating
        count += 1        
      })
      if( count > 0) { return (sum / count).toPrecision(3) } else { return 'unrated' }
    },
    commentsNumber: function () {
      return this.book.comments.length
    } */
  },

  methods: {
    removeBook: function () {
      HTTP.delete('/book', {
        params: {
          bookID: this.book._id, 
          caseID: this.bookcase
          }
          }).then(response => {(console.log(response))})
    },
    addBook: function () {
      HTTP.post('/book', {
        user: this.user,
        bookcase: this.chosenBookCase,
        book: this.book
      }).then(response => {
        console.log(response)
      })
    },
    addComment: function() {
      HTTP.post('/comment', {
        bookID: this.book._id,
        comment: this.commentText,
        user: this.$session.get('user')
      }).then(response => {
        console.log(response)
      })
    },
    rateBook: function () {
      HTTP.post('/rating', {
        bookID: this.book._id,
        rating: this.rating,
        user: this.$session.get('user')
      }).then(response => {
        console.log(response)
      })
    },
    replyToComment: function (commentID) {
      console.log(commentID)
    }
  },
  created () {
    this.book = this.$route.params.book
    /* 
    this.fetchBook(this.$route.params.id)
    .then(response => {
      this.book = response
    })
    this.bookcase = this.$route.params.bookcase
    console.log(this.$route.params) */

    this.user = this.$session.get('user')

    this.fetchBookCases(this.user._id)
      .then(response => {
        console.log('Fething book cases...')
        console.log(response)
        this.bookCases = response
        response.forEach(element => {
          this.bookCaseNames.push(element.title)
        })
        console.log(this.bookCases)
      })
    
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

#commentDiv {
  border: 1px solid black;
  background-color: bisque;
}

#commentBody {
  font-size: 110%;
}

#commentUser {
  font-size: 80%;
}

#reply {
  float: right;
}
</style>
