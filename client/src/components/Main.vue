<template>

<b-container fluid>
  <div id='mainLoggedIn' v-if='loggedIn'>
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
    <b-col cols='4'>
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
      <p> </p>
      </div>
      </div>
    </b-col>
    <b-col></b-col>
  </b-row>
  </div>
</b-container>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      loggedIn: false
    }
  }
}
</script>

<style lang="scss" scoped>

#welcome {
  background-color: hsla(279, 56%, 31%, 0.75);
  color: white;
  font-size: 120%;
}

#loginButton {
  background-color: #c2eee7;
  color: black;
  width: 100%;  
  font-size: 130%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
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
