<template>

<b-container fluid>
  <div class='mainLoggedIn' v-if='loggedIn'>
    <b-row>

    </b-row>
    <b-row>

    </b-row>
    <b-row>

    </b-row>

  </div>

<div class='mainNotLoggedIn' v-else>
  <b-row>
    <b-col>
          <h1>Välkommen till SSIS bokcirkel!</h1>
    </b-col>
  </b-row>
  <b-row>
    <b-col></b-col>
    <b-col cols='8'>
      <p>
      Här kommer du att kunna lägga till böcker du läst, eller vill läsa, och diskutera, 
      kommentera och rekommendera böcker till andra elever på skolan. 
    </p>
    <p>För att skapa ett konto, välj ett av nedanstående alternativ.</p>
    </b-col>
    <b-col></b-col>
  </b-row>
  <b-row id='createAccountDiv'>
    <b-col></b-col>
    <b-col cols = '3'>
      <router-link to="createaccount">
        <div id='createAccount'>Skapa med mail och lösenord.</div>
        </router-link>
</b-col>
    <b-col cols='3'>
          <div id='googleAccount'><p>Skapa konto med ditt googlekonto</p>
          <a href=''><img id='googleLogo' src='../assets/google.jpg'></a></div>
    </b-col>
    <b-col></b-col>
  </b-row>
  <b-row>
    <b-col></b-col>
    <b-col><p>Eller logga in om du redan har ett konto.</p></b-col>
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

#createAccount {
  width: 100%;
  height: 100%;
  float: left;
  background-color: darkkhaki;
  padding: 10px;
}

#googleAccount {
  width: 100%;
  height: 100%;
  float: right;
  background-color: darkkhaki;
  padding: 10px;
}

#googleLogo {
  max-height: 150px;
}
</style>
