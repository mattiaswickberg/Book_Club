 <template>
<div id='searchBody'>
    <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col cols = '8'>
  <h1>Sökresultat:</h1>
  <div class='pagination'>
    <table id='result'>
      <tr>
        <th>Omslag: </th>
        <th>Författare: </th>
        <th>Titel: </th>
        <th>Språk: </th>
        <th>År: </th>
        <th>Detaljer</th>
        <!-- <th>Lägg till</th> -->
      </tr>
      <tr id='bookRow' v-for="item in searchResult" :key='item.isbn[0]'>
        <td v-if="item.author">
          <img class='bookCover' v-bind:src="item.images[0].smallThumbnail" v-bind:alt="item.author + ': ' + item.title">
        </td>
        <td v-if="item.creator">
          <img class='bookCover' src='/static/blank-book-cover-small.png'>
        </td>
        <td v-if="item.creator">
          {{item.creator}}
        </td>
        <td v-if="item.author">
          {{item.author}}
        </td>
        <td>
          {{item.title}}
        </td>
        <td>
          {{item.language}}
        </td>
        <td v-if="item.date">
          {{item.date}}
        </td>
        <td v-if="item.publishedYear">
          {{item.publishedYear}}
        </td>
        <router-link :to="{ name: 'ViewBookDetails', params: {book: item}}">
          <td>Visa mer</td>
        <!-- <td>
          <b-form-select v-model='bookCase' :options='bookCaseNames' class='mb-3' /><b-btn variant='success' v-on:click='addBook(index)'>Lägg till i bokhylla</b-btn>
          </td> -->
          </router-link>
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
        console.log('Fething book cases...')
        console.log(response)
        this.bookCases = response
        response.forEach(element => {
          this.bookCaseNames.push(element.title)
        })
        console.log(this.bookCases)
      })
  },
    watch: {
    '$route.params.search'(newSearch, oldSearch) {
      this.getSearchResults(this.$route.params)
    }
  },
    methods: {
      getSearchResults(searchTerms) {
        console.log(this.$route.params.search)
      return HTTP.post('search', searchTerms)
      .then(response => {
        console.log(response.data.list)
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
        console.log(response)
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
  background-color: whitesmoke;
  width: 100%;
}

#result {
  border: solid black 2px;
}

td {
  border: solid black 1px;
  padding: 2px;
}

.bookCover {
  width:50px;
}

</style>
