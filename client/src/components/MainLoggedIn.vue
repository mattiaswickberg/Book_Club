<template>

<b-container fluid>
  <div id='mainLoggedIn' v-if='user'>
    <b-row>
      <b-col cols='1'></b-col>
      <b-col sm='8'>
        <div id='loggedIn'>
          <h1>Välkommen {{user.username}}!</h1>
        </div>
        <div id='adminInfo'>
          <div class='announcement' v-for='announcement in announcements' :key='announcement._id'>
          <h2>{{announcement.title}}</h2>
          <img class='announcementImage' v-bind:src="announcement.image">
          <div class='announcementText'>{{announcement.content}}</div>
          <span v-if='announcement.date' class='announcementDate'>Meddelandet publicerades: {{announcement.date}} </span> <span class='announcementUser' v-if='announcement.user'> av {{announcement.user}}</span>
        </div>
        </div>
        <div class='flashWarning' v-if='warningFlash'> {{warningFlash}}</div>
          <div class='flashInfo' v-if='infoFlash'> {{infoFlash}}</div>
          <div class='flashSuccess' v-if='successFlash'> {{successFlash}}</div>
      </b-col>
      <b-col cols='3'>
        <!-- This area is for recommendations from other users -->
        <h3>Rekommenderade böcker</h3>
        <div v-if='recommendedBooks'>
        <div class='recBook' v-for='book in recommendedBooks' :key='book.title'>
          <router-link :to="{ name: 'ViewBookDetails', params: {id: book.book._id}}">
                  <div>
                   <p><img v-if='book.book.images[0]' class='bookImage' v-bind:src="book.book.images[0].thumbnail" v-bind:alt="book.author + ': ' + book.title"></p>
                   <figcaption><strong>{{book.book.author}}:</strong> <i>{{book.book.title}}</i></figcaption>
                   <p class='recBy'> This book was recommended to you by: <strong>{{book.fromUser}}</strong></p>
                   </div>
                   </router-link>
                   <b-btn v-on:click='dismissRecommendation(book.book._id)'>Ignorera rekommendation</b-btn>
        </div>
        </div>
        <div v-else>
          Du har inga rekommenderade böcker just nu.
          </div>
          </b-col>
    </b-row>

  </div>

<div id='mainNotLoggedIn' v-else>
  <b-row>
    <b-col>
    </b-col>
    <b-col sm='5'>
      <div id='welcome'>
          <h1>Välkommen till SSIS bokcirkel!</h1>
          <p>
      Här kommer du att kunna lägga till böcker du läst, eller vill läsa, och diskutera, 
      kommentera och rekommendera böcker till andra elever på skolan. 
      </p>
      <p>För att skapa ett konto, välj ett av nedanstående alternativ.</p>
      <router-link to="createaccount">
        <b-button id='loginButton' size='lg' variant='success'>
          Skapa med mail och lösenord.
        </b-button> </router-link>
            <div id='createAccountDiv'> 
            </div>
            <div>
      <a href='/auth/google'>
      <b-button id='loginButton' size="lg" variant="primary">Logga in med ditt googlekonto
            <img id='googleLogo' src='../assets/google.jpg'>
            </b-button>
      </a>
      <p>Eller logga in uppe till höger</p>
      </div>
      </div>
    </b-col>
    <b-col></b-col>
  </b-row>
  </div>
</b-container>
</template>

<script>
import {HTTP} from '@/services/Api'
export default {
  name: 'MainLoggedIn',
  data () {
    return {
      user: '',
      announcements: [],
      infoFlash: '',
      warningFlash: '',
      successFlash: ''
    }
  },
  computed: {
    recommendedBooks: function() {
      return this.user.recommendedBooks
    }
  },
    created() {
      HTTP.get('/announcements').then(response => {
      console.log(response.data)
      if(response.data.length !== 0) {
        response.data.forEach(element => {
          if(element.archived !== true) {
            this.announcements.push(element)
          }
        });
        
      } else {
        this.announcements.push({
          title: 'No announcements yet'
        })
      }
    })
        if(this.$session.exists()) {
        this.user = this.$session.get('user')
        console.log('User found')
        console.log(this.user)
      }
  },
  mounted() {
  },
  methods: {
    dismissRecommendation: function (bookID) {
      // send to server to remove recommendations
      HTTP.post('/dismissrecommendation', {
        bookID: bookID,
        user: this.user._id
      }).then(response => {
        if ( response.data === 'Recommendation removed') {
          this.successFlash = response.data
          this.user.recommendedBooks.forEach(element => {
            if (element.book._id === bookID) {
          this.user.recommendedBooks.splice(this.user.recommendedBooks.indexOf(element), 1)
        }
        this.$session.set('user', this.user)
          })
        } else {
          console.log(response.data)
        }
      }).catch(err => { console.log(err) })
      // fetch revised list
    }
  }
}
</script>

<style lang="scss" scoped>

#mainNotLoggedIn {
  background-image: url('../assets/book_circle.jpeg');
  background-size: 100%;
  background-repeat: no-repeat;
  min-height: 300px;
}

#loggedIn {
  background-color: hsla(279, 56%, 31%, 0.75);
  color: white;
  padding: 20px;
  font-size: 120%;
}

#welcome {
  background-color: hsla(279, 56%, 31%, 0.75);
  color: white;
  font-size: 120%;
  padding: 20px;
}

#loginButton {
  background-color: #c2eee7;
  color: black;
  width: 100%;  
  font-size: 120%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  word-wrap: normal;
}

#createAccount {
  width: 100%;
  height: 100%;
  float: left;
  padding: 10px;
}

#googleAccount {
  width: 100%;
  height: 100%;
  float: right;
  padding: 10px;
}

#googleLogo {
  max-height: 50px;
}

.recBook {
  width: 100%;
  border: 1px solid black;
  padding: 5px;
  margin: 1px;
}

.recBy {
  font-size: 90%;
}

#adminInfo {
 margin-left: 15%;
 margin-right: 15%;
 text-align: center;
}

.bookImage {
  width: 50%;
  text-align: center;
}

.announcement {
  border: 2px solid whitesmoke;
  padding: 10px;
  margin: 20px;
}

.announcementImage {
  width: 40%;
  margin-top: 10px;
  margin-bottom: 20px;
}

</style>
