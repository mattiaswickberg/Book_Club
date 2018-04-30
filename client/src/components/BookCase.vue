<template>
<div>
    <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col cols='10'>
        <table class='bookCase'>
                  <tr>
                  <th class='caseTitle'>{{bookCase.title}}</th>
                  </tr>
                  <tr>
                  <td v-for='book in bookCase.books' :key='book.title' class='book'>
                    <router-link :to="{ name: 'ViewBookDetails', params: {book: book, bookcase: bookCase._id}}">
                  <div>
                   <p><img class='bookImage' v-bind:src="book.images[0].smallThumbnail" v-bind:alt="book.author + ': ' + book.title"></p>
                   <figcaption>{{book.title}}</figcaption>
                   </div>
                   </router-link>
                  </td>
                  </tr>
                </table>
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
}

.book {
  display: inline-block;
  border: 1px solid white;
  padding: 5px;
  width: 150px;
  height: 175px;
}

.bookImage {
  height: 100%;
}

.caseTitle {
  font-size: 150%;
  text-align: center;
  color: darkslategray;
}
</style>
