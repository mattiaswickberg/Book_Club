<template>
<div>
    <b-container fluid>
      <!-- Section for feedback to user -->
      <b-row>
        <b-col></b-col>
        <b-col cols='8'>
          <div class='flashWarning' v-if='warningFlash'> {{warningFlash}}</div>
          <div class='flashInfo' v-if='infoFlash'> {{infoFlash}}</div>
          <div class='flashSuccess' v-if='successFlash'> {{successFlash}}</div>
          </b-col>
        <b-col></b-col>
      </b-row>
      <!-- Book details area -->
    <b-row>
      <b-col></b-col>
      <b-col cols='6'>
  <div id='displayBookDetails'>
      <h1> {{book.title}}</h1>
    <div class='mainBookDetails'>
      <img id='bookCover' v-bind:src="image">
      <p>Författare: {{book.author}}</p>
      <p>Titel: {{book.title}}</p>
      <p>Utgivningsår: {{book.publishedYear}}</p>
   </div>

    <div id='minorBookDetails'>
    <p>isbn: {{book.isbn}}</p>
    </div>

<!-- User specific book details-->
    <div v-if='bookcase'>
      <p> <strong> I bokhylla: </strong> {{inBookCase.title}} </p>
      </div>

    <div id='bookAdditional'>
      <strong>Ditt betyg: </strong> {{userRating}}  
      <strong>Medelbetyg:</strong> {{averageRating}}  
      <strong>Antal kommentarer:</strong> {{commentsNumber}}  
    </div>
  </div>
      </b-col>
      <b-col></b-col>
    </b-row>

    <!-- Buttons for user actions -->
    <b-row>
      <b-col></b-col>
      <b-col cols='6'>
        <p></p>
        <b-btn v-b-toggle.collapseRating variant='primary'>Betygsätt bok</b-btn>
        <b-btn v-b-toggle.collapseComment variant='success'>Kommentera</b-btn>
        <b-btn v-if='bookcase' v-b-toggle.collapseChangeCase variant='warning'>Byt bokhylla</b-btn>
        <b-btn v-else v-b-toggle.collapseAddBook variant='warning'>Lägg till i bokhylla</b-btn>
        <b-btn v-b-toggle.collapeRecommendBook variant='outline-success'>Rekommendera bok</b-btn>
        <b-btn v-b-toggle.collapseRemove variant='danger'>Ta bort bok</b-btn>
        <b-collapse id='collapseRemove' class='mt-2'>
          Are you sure you want to remove this book from your bookcase?
          <b-btn v-b-toggle.collapseRemove variant='danger' v-on:click='removeBook'>Remove Book</b-btn>
          </b-collapse> 
          <!-- Rate book -->
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
          <!-- Add comment to book -->
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
        <!-- Add book to bookcase -->
        <b-collapse id='collapseAddBook' class='mt-2'>
            <b-form-select v-model='chosenBookCase' :options='bookCaseNames' class='mb-3' />
            <b-btn variant='success' v-on:click='addBook()'>Lägg till i bokhylla</b-btn>
        </b-collapse>
        <!-- Change which bookcase your book is in -->
        <b-collapse id='collapseChangeCase' class='mt-2'>
          <b-form-select v-model='chosenBookCase' :options='bookCaseNames' class='mb-3' />
          <b-btn variant='success' v-on:click='changeBookCase()'>Flytta till bokhylla</b-btn>
        </b-collapse>
        <!-- Recommend book to other user -->
        <b-collapse id='collapeRecommendBook'>
          <b-form-input v-model='recommendToUser' type='text' placeholder='Type username of the user you want to recommend this book to'></b-form-input>
          <b-btn variant='outline-success' v-on:click='recommend'>Skicka rekommendation</b-btn>
        </b-collapse>
      </b-col>
      <b-col></b-col>
    </b-row>

    <!-- Show comments -->
    <b-row>
      <b-col></b-col>
      <b-col>
        <p></p>
        <div class='commentDiv' v-for='comment in book.comments' :key='comment._id'>
        <p class='commentBody'>{{comment.comment}}</p>
        <p class='commentUser'> Kommentar tillagd av: {{comment.user}} at {{comment.date}}</p>
        <div class='commentReply' v-for='reply in comment.replies' :key='reply._id'>
          <p>{{reply.comment}}</p>
          <p>{{reply.user}} svarade {{reply.date}}</p>
        </div>
        <b-btn size='sm' id='reply' v-b-toggle.collapseReply variant='success'>Svara</b-btn>

        <!-- Reply to comment -->
        <b-collapse id='collapseReply'>
          <b-form-textarea
            v-model='commentReply'
            placeholder='Skriv din kommentar här'
            :rows='4'>
            </b-form-textarea>
          <b-btn variant='success' v-on:click='replyToComment(comment._id)'>Spara svar</b-btn>
        </b-collapse>
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
  import fetchBookCaseMixin from '@/mixins/fetchBookCase'
  import {HTTP} from '@/services/Api'

export default {
  name: 'ViewBook',
  mixins: [fetchBookMixin, fetchBookCasesMixin, fetchBookCaseMixin],
  data () {
    return {
      user: false,
      book: '',
      rating: '',
      bookCaseNames: [],
      bookCases: [],
      chosenBookCase: '',
      bookcase: '',
      commentText: '',
      commentReply: '',
      bookInDb: false,
      inBookCase: '',
      warningFlash: '',
      infoFlash: '',
      successFlash: '',
      recommendToUser: ''
    }
  },
  computed: {
    image: function() {
      if(this.bookInDb) {
        if (this.book.images[0] !== undefined) { 
        return this.book.images[0].thumbnail } else {
          return '/static/blank-book-cover.png'
        }
      }      
    },
    userRating: {
    get: function () {
      if(this.bookInDb) {
        let userRating = this.book.ratings.filter(rating => rating.user === this.user._id)
        if (userRating.length > 0) {return userRating[0].rating} else { return 0 }
      } else return 'Bok ej i databas'
      }
    }, 
    averageRating: function () {
      if (this.bookInDb) {
        let count = 0
      let sum = 0
      this.book.ratings.forEach(element => {
        sum += element.rating
        count += 1        
      })
      if( count > 0) { return (sum / count).toPrecision(3) } else { return 'unrated' }
      } else {return 'Unrated'}
      
    },
    commentsNumber: function () {
      if(this.bookInDb) {
        return this.book.comments.length
      } else return 0
    }
  },

  methods: {
    removeBook: function () {
      HTTP.delete('/book', {
        params: {
          bookID: this.book._id, 
          caseID: this.bookcase
          }
          }).then(response => {
            console.log(response)
            if (response.data === 'Book removed from bookcase') {
              this.successFlash = response.data
              } else {
                this.warningFlash = 'Book could not be removed for some reason'
              }
              })
    },
    addBook: function () {
      if (this.chosenBookCase.length === 0) {
        this.warningFlash = 'Du måste välja en bokhylla att lägga till boken i!'
      } else {
        let selectedBookCase = this.bookCases.filter(bcase => bcase.title === this.chosenBookCase)
      HTTP.post('/book', {
        user: this.user,
        bookcase: selectedBookCase[0],
        book: this.book
      }).then(response => {
        if (response.data === 'Book added') {
          this.successFlash = response.data
        } else {
          this.warningFlash = response.data
        }
      })
      }      
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
    replyToComment: function(commentID) {
      if (this.commentReply.length > 0) {
        HTTP.post('/commentreply', {
        user: this.user,
        book: this.book,
        comment: commentID,
        reply: this.commentReply
      }).then(response => {
        if (response === 'Reply saved') {
          successFlash = response.data
        } else {
          infoFlash = response.data
        }
      })
      }
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
    changeBookCase: function() {
      if (this.chosenBookCase.length === 0) {
        this.infoFlash = 'Du måste välja en bokhylla att flytta boken till!'
      } else {
        this.addBook()
        this.removeBook()
      }
    },
    recommend: function () {
      HTTP.post('/recommend', {
        user: this.user,
        toUser: this.recommendToUser,
        book: this.book
      }).then(response => {
        if(response.data === 'Recommendation sent') {
          this.successFlash = response.data
        } else { warningFlash = response.data }
        console.log(response)
      }).catch(err => console.log(err))
    }
  },
  created () {
    if(this.$route.params.id) {
      this.fetchBook(this.$route.params.id)
    .then(response => {
      this.book = response
      this.bookInDb = true
    })
    this.bookcase = this.$route.params.bookcase
    this.fetchBookCase(this.bookcase).then(response => {
      this.inBookCase = response
    })
    } else {
      this.book = this.$route.params.book
      }

    console.log(this.book)

  // Check if book is already in users bookcases, and if it is, set flag and save bookcase info

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

.commentDiv {
  border: 1px solid black;
  background-color: beige;
}

.commentBody {
  font-size: 110%;
}

.commentUser {
  font-size: 80%;
}

.commentReply {
  font-size: 80%;
  background-color: beige;
  margin-left: 20%;
  width: 80%;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 0px;
  border: 1px solid black;
}

.commentReply p {
  padding: 0px;
  margin: 0px;
}

#reply {
  float: right;
}

#bookCover {
  max-width: 200px;
}

</style>
