<template>
<div>
    <b-container fluid>
      <!-- Section for feedback to user -->
      <b-row>
        <b-col></b-col>
        <b-col sm='8'>
          <div class='flashWarning' v-if='warningFlash'> {{warningFlash}}</div>
          <div class='flashInfo' v-if='infoFlash'> {{infoFlash}}</div>
          <div class='flashSuccess' v-if='successFlash'> {{successFlash}}</div>
          </b-col>
        <b-col></b-col>
      </b-row>
    <b-row>
      <b-modal 
              id='changeBookCaseModal'
              title='Byt namn på bokhylla'
              @ok='changeCase'>
            <div class="modal-body">
              <form>
                <label>Skriv in det nya namnet:</label>
                <b-form-input type='text'
                              v-model='newCaseName'
                              placeholder='Bokhyllans namn'>
                </b-form-input>
              </form>
        </div>
          </b-modal>
          <b-modal 
              id='removeBookCaseModal'
              title='Ta bort bokhylla'
              @ok='removeCase'>
              <div class='modal-body'>
                Är du säker på att du vill ta bort den här bokhyllan?
              </div>
          </b-modal>
      <b-col></b-col>
      <b-col sm='10'>
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
        <b-btn v-b-modal.removeBookCaseModal variant='danger' id='removeBookCase'>Ta bort bokhylla</b-btn>
        <b-btn v-b-modal.changeBookCaseModal variant='warning' id='renameBookCase'>Byt namn på bokhylla</b-btn>
      </b-col>
      <b-col></b-col>
    </b-row>

  </b-container>
</div>
  
</template>

<script>  
import fetchBookCaseMixin from '@/mixins/fetchBookCase'
import {HTTP} from '@/services/Api'

export default {
  name: 'BookCase',
  mixins: [fetchBookCaseMixin],
  data () {
    return {
      user: false,
      bookCase: '',
      newCaseName: '',
      successFlash: '',
      infoFlash: '',
      warningFlash: '',
    }
  },
    created() {
      this.user = this.$session.user
      this.fetchBookCase(this.$route.params.id).then(response => {
        this.bookCase = response
      })
  },
  methods: {
    changeCase: function () {
      HTTP.post('/changebookcasename', {id: this.bookCase._id, newName: this.newCaseName}).then(response => {
        if(response.data === 'Bookcase updated') {
          this.successFlash = response.data
          this.bookCase.title = this.newCaseName
        } else { this.infoFlash = response.data }
            })
    },
    removeCase: function() {
      HTTP.delete('/bookcase', { params: {id: this.bookCase._id} }).then(response => {
        if (response.data === 'Bookcase removed') {
          this.successFlash = response.data
        } else {
          this.infoFlash = response.data
        }
      })
    }
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
