<template>

<b-container fluid>
  <div id='mainLoggedIn' v-if='user'>
    <b-row>

    </b-row>
    <b-row>

    </b-row>
    <b-row>

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
        <b-button id='loginButton' :size='lg' :variant='success'>
          Skapa med mail och lösenord.
        </b-button> </router-link>
            <div id='createAccountDiv'> 
            </div>
            <div>
      <a href='http://localhost:3000/auth/google'>
      <b-button id='loginButton' :size="lg" :variant="primary">Logga in med ditt googlekonto
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
import isLoggedInMixin from '@/mixins/checkAuth'

export default {
  name: 'Main',
  mixins: [isLoggedInMixin],
  data () {
    return {
      user: false
    }
  },
    created() {
    this.checkIfLoggedIn()
    .then(response => {
      this.user = response
    })
    .catch(error => console.log(error))
  }
}
</script>

<style lang="scss" scoped>

#mainNotLoggedIn {
  margin-top: 100px;
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
</style>
