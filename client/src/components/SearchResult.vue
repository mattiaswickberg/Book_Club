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
        <th>ISBN: </th>
        <th>Typ: </th>
        <th>Språk: </th>
        <th>År: </th>
      </tr>
      <tr v-for="item in searchResult" :key='item.title'>
        <td></td>
        <td>
          {{item.creator}}
        </td>
        <td>
          {{item.title}}
        </td>
        <td>
          {{item.isbn}}
        </td>
        <td>
          {{item.type}}
        </td>
        <td>
          {{item.language}}
        </td>
        <td>
          {{item.date}}
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
import {HTTP} from '@/services/Api'
export default {
  name: 'SearchResult',
  mixins: [isLoggedInMixin],
  data () {
    return {
      searchResult: []
    }
  },
    created() {
      this.getSearchResults(this.$route.params)
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
      }
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

</style>
