<template>
<div>
    <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col cols='10'>
        <div class='bookCase'>
                  <div class='caseTitle'>{{bookCase.title}}</div>
                  <div v-for='book in bookCase.books' :key='book.title' class='book'>
                    <router-link :to="{ name: 'ViewBookDetails', params: {book: book, bookcase: bookCase._id}}">
                      <div>
                   <img class='bookImage' v-bind:src="book.images[0].smallThumbnail" v-bind:alt="book.author + ': ' + book.title">
                   </div>
                   <div class='bookTitle'>{{book.title}}</div>
                   </router-link>
                  </div>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>

  </b-container>
</div>
  
</template>

<script>  
import fetchBookCaseMixin from '@/mixins/fetchBookCase'

export default {
  name: 'BookCase',
  mixins: [fetchBookCaseMixin],
  data () {
    return {
      user: false,
      bookCase: ''
    }
  },
    created() {
      this.user = this.$session.user
      this.fetchBookCase(this.$route.params.id).then(response => {
        console.log('bookcase:')
        console.log(response)
        this.bookCase = response
      })
  }
}
</script>

<style lang="scss" scoped>
.bookCase {
  width: 100%;
  overflow: auto;
}

.book {
  display: inline-block;
  border: 1px solid white;
  padding: 5px;
  max-height: 10%;
}

.bookImage {
  height: 175px;
}

.caseTitle {
  font-size: 150%;
  text-align: center;
  color: darkslategray;
  padding: 20px;
}

.bookTitle {
  font-size: 95%;
}

</style>
