 <template>
<div id='searchBody'>
    <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col sm = '8'>
  <h1>Sökresultat:</h1>
  <div v-if='searchResult.length === 0'>
          <h2>No results found</h2>
        </div>
  <div class='pagination'>
    <table id='result'>
      <tr>
        <th>Omslag: </th>
        <th>Författare: </th>
        <th>Titel: </th>
        <th>Språk: </th>
        <th>År: </th>
      </tr>
      <tr id='bookRow' v-for="item in searchResult" :key='item.isbn[0]'>
        <td v-if="item.author">
          <router-link :to="{ name: 'ViewBookDetails', params: {book: item}}">
          <img class='bookCover' v-bind:src="item.images[0].smallThumbnail" v-bind:alt="item.author + ': ' + item.title">
          </router-link>
        </td>
        <td v-if="item.creator">
          <router-link :to="{ name: 'ViewBookDetails', params: {book: item}}">
          <img class='bookCover' src='/static/blank-book-cover-small.png'>
          </router-link>
        </td>
        <td v-if="item.creator">
          <router-link :to="{ name: 'ViewBookDetails', params: {book: item}}">
          {{item.creator}}
          </router-link>
        </td>
        <td v-if="item.author">
          <router-link :to="{ name: 'ViewBookDetails', params: {book: item}}">
          {{item.author}}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'ViewBookDetails', params: {book: item}}">
          {{item.title}}
          </router-link>
        </td>
        <td>
          {{item.language}}
        </td>
        <td v-if="item.date">
          {{item.date}}
        </td>
        <td v-else-if="item.publishedYear">
          {{item.publishedYear}}
        </td>
        <td v-else>
          Unknown
        </td>
      </tr>
      
    </table>
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
import {HTTP} from '@/services/Api'
export default {
  name: 'SearchResult',
  mixins: [isLoggedInMixin, fetchBookCasesMixin],
  data () {
    return {
      searchResult: [],
      bookCaseNames: [],
      bookCases: [],
      bookCase: ''
    }
  },
    created() {
      this.getSearchResults(this.$route.params)
      // fetch book cases from user
      let user = this.$session.get('user')
      this.fetchBookCases(user._id)
      .then(response => {
        this.bookCases = response
        response.forEach(element => {
          this.bookCaseNames.push(element.title)
        })
      })
  },
    watch: {
    '$route.params.search'(newSearch, oldSearch) {
      this.getSearchResults(this.$route.params)
    }
  },
    methods: {
      getSearchResults(searchTerms) {
      return HTTP.post('search', searchTerms)
      .then(response => {
        this.searchResult = response.data.list
      })
      },
      addBook(index) {
        var selectedBookCase = this.bookCases[0]._id
        this.bookCases.forEach(element => {
          if (element.title === this.bookCase) {
            selectedBookCase = element._id
          }
        })
        HTTP.post('/book', {
          book: this.searchResult[index], 
          bookcase: selectedBookCase,
          user: this.$session.get('user')
      }).then(response => {
        this.$router.push('/account')
      })
      }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
#searchBody {
  width: 100%;
}

#result {
  width: 100%;
  background-color: whitesmoke;
  border: solid black 2px;
}

td {
  padding: 2px;
}

.bookCover {
  width:50px;
}

</style>
