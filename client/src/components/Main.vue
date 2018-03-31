<template>

<b-container fluid>
<div class='main'>
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
  <b-row>
    <b-col></b-col>
    <b-col cols = '3'>
      <div id='createAccount'>Skapa med mail och lösenord.</div>
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
    return {}
  }
}
</script>

<style lang="scss" scoped>

#createAccount {
  float: left;
}

#googleAccount {
  float: right;
}

#googleLogo {
  max-height: 150px;
}
</style>
