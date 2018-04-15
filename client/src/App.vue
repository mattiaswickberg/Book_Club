<template>
<b-container fluid>
  <div id='body'>
  <b-row id='header'>
    <b-col>
      <router-link to='/'>
        <img id='logo' src="./assets/logo.png">
        </router-link>
    </b-col>
    <b-col cols='6' id='topBar'>
      <div id='title'>
              <h1>SSIS Bokcirkel</h1>
              <form id='searchField' @submit.prevent='searchBook'>
                <input type=text v-model='search.data' placeholder="Sök bok"><button type='submit'><i class="material-icons">search</i></button>
              </form>
      </div>

    </b-col>
    <b-col>
      <div id='userArea' v-if='user'>
        <img :src='user.image'> 
        <br> {{user.username}} 
        <b-button id='logoutButton' :size='sm' :variant='primary' v-on:click='logout'>Logga ut</b-button>
        </div>
      <div id='loginForm' v-else>
        <form id='loginForm' @submit.prevent="login">
    <div>
        <input type="text" v-model="userData.username" placeholder="username"/>
    </div>
    <div>
        <input type="password" v-model="userData.password" placeholder="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
</form>
<a href="/auth/google">
<b-button id='loginButton' :size="sm" :variant="primary">
Or sign In with <img id='googleLogo' src='./assets/google.jpg'>
</b-button>
</a>
</div>
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
  </div>
</b-container>
</template>

<script>
import isLoggedInMixin from '@/mixins/checkAuth'
import {HTTP} from '@/services/Api'
export default {
  name: 'App',
  mixins: [isLoggedInMixin],
  data () {
    return {
          user: false,
          search : {
            data: ''
          },
          userData: {
            username: '',
            password: ''
          }
    }
  },
  created() {
    if (this.$session.exists()) {
      this.user = true
    }
  },
  methods: {
    logout: function (event) {
      this.$session.destroy()
      return HTTP.get('logout')
    },
    login: function () {
      return HTTP.post('login', this.userData)
      .then(response => {
        // console.log(response.data)
        this.$session.start()
        this.$session.set('user', response.data)
        this.$router.push({ name: 'Account' })
      })
    },
    searchBook: function() {
      this.$router.push('/searchresult/' + this.search.data)
    }
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
  background-image: url('./assets/book_circle.jpeg');
  background-size: 100%;
  background-repeat: no-repeat;
  font-family: $fonts;
  color: $black;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: $white;
  margin-top: 0px;
}

#logo {
  height: 100px;
}

#googleLogo {
  max-width: 20px;
}

#header {
    background-color: $darkPink;
    padding: 5px;
    color: $white;
}

#topBar {
  height: auto;
  text-align: center;
  color: $white;
}

#title {
  margin-top: 20px;
  color: $white;
}

#middle {
    background-color: $white; 
    color: $black;
    padding-bottom: 50px;
}

#footer {
  position: relative;
  bottom: 0px;
  width: 100%;
  height: 50px;
  text-align: center;
  background-color:$darkPink;
  color: $white;
  right: 0px;
  left: 0px;
  margin-top: 10px;
}

#author {
  padding: 10px;
  color: $white;
}

h1 {
  font-family: $fonts;
}

b-row {
  padding: 10px;
  margin: 10px;
}

#searchButton {
  width: 35px;
  height: 35px;
}

form input button {
  display: inline-block;
}
</style>
