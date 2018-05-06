<template>
<b-container fluid>
  <div>
  <b-row id='header'>
    <b-col id = 'headerCol' cols='12'>
    <b-navbar toggleable='md' type='dark' variant='info'>
      <b-navbar-toggle target='nav_collapse'></b-navbar-toggle>
      <b-navbar-brand href='#/mainloggedin'><img id='logo' src="./assets/logo.png"></b-navbar-brand>
      <b-collapse is-nav id='nav_collapse'>
        <b-navbar-nav>
          <b-nav-item href='#/mybooks'>Mina böcker</b-nav-item> 
          <b-nav-item href='#/profile'>Profile</b-nav-item>
          <div v-if='user'>
          <b-nav-item-dropdown text='Admin' right v-if='user.role === "admin"'>
            <b-dropdown-item href='#/users'>Users</b-dropdown-item>
            <b-dropdown-item href='#/announcements'>Announcements</b-dropdown-item>
            </b-nav-item-dropdown>
            </div>
        </b-navbar-nav>
        <b-navbar-nav class='ml-auto'>
        <b-nav-form id='searchField' @submit.prevent='searchBook'>
                <b-form-input type=text v-model='search.data' placeholder="Sök bok"/>
                  <b-button type='submit'><i class="material-icons">search</i></b-button>
              </b-nav-form>

              <div id='userArea' v-if='user'>
                <img :src='user.image'> 
                <p> {{user.username}} </p>  
                <b-button id='logoutButton' size='sm' v-on:click='logout'>Logga ut</b-button>
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
<b-btn id='loginButton' size="sm" variant="primary">
Or sign In with <img id='googleLogo' src='./assets/google.jpg'>
</b-btn>
</a>
</div>
</b-navbar-nav>
      </b-collapse>
    </b-navbar>
    </b-col>
  </b-row>
  <b-row id='middle'>
    <b-col>
    </b-col>
    <b-col cols='10'>
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
import {HTTP} from '@/services/Api'
export default {
  name: 'App',
  data () {
    return {
      user: {
        role: ''
      },
      search : {
        data: ''
          },
      userData: {
        username: '',
        password: ''
      },
    }
  },
  created () {
    this.user = this.$session.get('user')
  },
  mounted() {
  },
  updated() {
  },
  watch: {
  },
  methods: {
    logout: function (event) {
      this.$session.destroy()
      this.user = ''
      return HTTP.get('logout').then(response => {
        if (response.data === 'logged out') {
          this.$router.push({name: 'Main'})
        }
      })
    },
    login: function () {
      return HTTP.post('login', this.userData)
      .then(response => {
        console.log('Login response: ')
        console.log(response.data)
        this.$session.start()
        this.$session.set('user', response.data)
        this.$set(this.user = response.data)
        this.$router.push({ name: 'MainLoggedIn' })
      })
    },
    searchBook: function() {
      this.$router.push('/searchresult/' + this.search.data)
    }
  }
}
</script>

<style lang="scss">

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
    padding: 0px;
    color: $white;
    width: auto;
}

#headerCol {
  padding: 0px;
}

#title {
  margin-top: 20px;
  color: $white;
}

#middle {
    background-color: $white; 
    color: $black;
    padding-bottom: 50px;
    min-height: 579px;
}

#footer {
  position: relative;
  bottom: 0px;
  width: auto;
  height: 50px;
  text-align: center;
  background-color:$darkPink;
  color: $white;
  right: 0px;
  left: 0px;
  margin-top: 10px;
}

#userArea, #loginForm {
  padding: 5px;
  margin: 5px;
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

#loginForm {
  display:inline-block;
}

form input button {
  display: inline-block;
}

a {
  color: black;
}

.flashWarning {
  background-color: hsla(337, 100, 44, 0.51);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 130%;
  padding: 20px;
  margin: 10px;
  width: 100%;
}

.flashSuccess {
  background-color: hsla(120, 71%, 51%, 0.60);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 130%;
  padding: 20px;
  margin: 10px;
  width: 100%;
}

.flashInfo {
  background-color: hsla(62, 95%, 51%, 0.60);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 130%;
  padding: 20px;
  margin: 10px;
  width: 100%;
}

</style>
