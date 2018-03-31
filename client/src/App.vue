<template>
<b-container fluid>
  <b-row id='header'>
    <b-col>
          <img id='logo' src="./assets/logo.png">
    </b-col>
    <b-col cols='9' id='topBar'>
      <h1>This is the top bar</h1>
    </b-col>
    <b-col>

    </b-col>
  </b-row>
  <b-row id='middle'>
    <b-col>
      <h1>Left sidebar</h1>
    </b-col>
    <b-col cols='9'>
      <h1>Main area</h1>
       <div id='app'>

    <div>
      <h1>
        SSIS Bokcirkel
      </h1>
    </div>
    <router-view/>
  </div>
    </b-col>
    <b-col>
      <h1>Right sidebar</h1>
    </b-col>
  </b-row>
  <b-row id='footer'>
    <b-col cols='12'>
          <h1>This is the footer</h1>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>

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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $grey;
  margin-top: 5px;
}

#logo {
  height: 100px;
}

#topBar {
  background-color: $lightPurple;
  height: 100px;
}

#middle {
}

#footer {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 50px;
  text-align: center;
  background-color: $lightBlue;
}
</style>
