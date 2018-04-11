 <template>
<div>
    <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col>
  <h1> Display search result page</h1>
  <div class='pagination'>
    <ul>
      <li v-for="item in search" :key='item.title'>
        {{item}}
      </li>
    </ul>
  </div>

      </b-col>
      <b-col></b-col>
    </b-row>

  </b-container>
</div>
  
</template>

<script>
import isLoggedInMixin from '@/mixins/checkAuth'

export default {
  name: 'SearchResult',
  mixins: [isLoggedInMixin],
  props: ['search'],
  data () {
    return {
      user: false
    }
  },
    created() {
    this.checkIfLoggedIn()
    .then(response => {
      this.user = response
      console.log(this.user)
    })
    .catch(error => console.log(error))
  },
    methods: {
    searchBook: function() {
      console.log('searching for: ' + this.search.data)
      return HTTP.post('search', this.search)
      .then( function(response) {
        console.log(response)
        
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
