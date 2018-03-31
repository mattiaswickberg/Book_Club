<template>
<b-container fluid>
  <b-row id='header'>
    <b-col>
          <img id='logo' src="./assets/logo.png">
    </b-col>
    <b-col cols='9' id='topBar'>
      <div id='title'>
              <h1>SSIS Bokcirkel</h1>
      </div>

    </b-col>
    <b-col>
      <div id='userArea' v-if='loggedIn'>User info</div>
      <div id='loginForm' v-else>Login Field</div>
    </b-col>
  </b-row>
  <b-row id='middle'>
    <b-col>
    </b-col>
    <b-col cols='9'>
       <div id='app'>
    <router-view/>
  </div>
    </b-col>
    <b-col>
    </b-col>
  </b-row>
  <b-row id='footer'>
    <b-col cols='12'>
      <div id='author'>
          <h5>Site author: Mattias Wickberg</h5>
      </div>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  name: 'App',
  data: {
    loggedIn: false
  }
}
</script>

<style lang="scss" scoped>

$fonts: 'Avenir', Helvetica, Arial, sans-serif;

$darkPink: #c40064;
$lightPink: #fdbbd9;
$darkGreen: #00837c;
$lightGreen: #c2eee7;
$darkOrange: #c9472d;
$lightOrange: #ffc89f;
$darkBlue: #006ebf;
$lightBlue: #cae5ff;
$darkPurple: #5d237d;
$lightPurple: #ebd6f2;
$yellow: #fcbf0a;
$black: #333333;
$white: #ffffff;
$grey: #f5f3ee;

#app {
  font-family: $fonts;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: $grey;
  margin-top: 0px;
  min-height: 40rem;
  padding: 5px;
}

#logo {
  height: 100px;
}

#header {
    background-color: $lightPurple;
    padding: 5px;
}

#topBar {
  height: 100px;
  text-align: center;
}

#title {
  margin-top: 20px;
}

#middle {
    background-color: $white; 
}

#footer {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 50px;
  text-align: center;
  background-color: $lightGreen;
}

#author {
  padding: 10px;
}

h1 {
  font-family: $fonts;
}
</style>
