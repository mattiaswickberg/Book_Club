<template>

<b-container fluid>
  <div id='mainLoggedIn' v-if='user'>
    <b-row>
      <b-col></b-col>
      <b-col sm='6'>
        <div id='loggedIn'>
          <h1>Välkommen {{user.username}}!</h1>
        </div>
        <div id='adminInfo'>
          <h1>
            Info div for admins
          </h1>
        </div>
      </b-col>
      <b-col>
        <!-- This area is for recommendations from other users -->
        <h2>Rekommenderade böcker</h2>
        <div class='recBook' v-for='book in recommendedBooks' :key='book.title'>
          <router-link :to="{ name: 'ViewBookDetails', params: {id: book.book._id}}">
                  <div>
                   <p><img class='bookImage' v-bind:src="book.book.images[0].thumbnail" v-bind:alt="book.author + ': ' + book.title"></p>
                   <figcaption><strong>{{book.book.author}}:</strong> <i>{{book.book.title}}</i></figcaption>
                   <p class='recBy'> This book was recommended to you by: <strong>{{book.fromUser}}</strong></p>
                   <b-btn v-on:click='dismissRecommendation'>Ignorera rekommendation</b-btn>
                   </div>
                   </router-link>
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
      kommentera och rekommendera böcker till andra elever på skolan. Du kommer också få 
      boktips från lärare på skolan, eller kanske vill du tipsa resten av skolan?
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
      <p>Om du redan har ett konto, logga in uppe till höger</p>
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
  name: 'Main',
  data () {
    return {
    }
  },
  computed: {
    user: function() {
      return this.$session.get('user')
    },
    recommendedBooks: function() {
      return this.user.recommendedBooks
    }
  },
    created() {
      if(!this.$session.exists()) {
        HTTP.get('/sessionstatus')
      .then(response => {
        if(response.data !== null && response.data !== undefined) {
          this.$session.start()
          this.$session.set('user', response.data)
        }
        })
        .catch(error => {
              reject(error.response.data)
            })
      }
  }
}
</script>

<style lang="scss" scoped>

#mainNotLoggedIn {
  background-image: url('../assets/book_circle.jpeg');
  background-size: 100%;
  background-repeat: no-repeat;
}

#loggedIn {
  background-color: hsla(279, 56%, 31%, 0.75);
  color: white;
  padding: 20px;
  font-size: 120%;
}

#welcome {
  background-color: hsla(0, 0%, 100%, 0.60);
  color: black;
  font-size: 120%;
  padding: 20px;
}

#loginButton {
  background-color: #c2eee7;
  color: black;
  width: 100%;  
  font-size: 100%;
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
}

.recBy {
  font-size: 90%;
}

.bookImage {
  width: 50%;
  text-align: center;
}
</style>
