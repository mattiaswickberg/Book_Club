<template>
<div>
    <b-container fluid>
      <b-row>
        <b-col></b-col>
        <b-col cols='8'>
          <div class='flashWarning' v-if='warningFlash'> {{warningFlash}}</div>
          <div class='flashInfo' v-if='infoFlash'> {{infoFlash}}</div>
          <div class='flashSuccess' v-if='successFlash'> {{successFlash}}</div>
          </b-col>
        <b-col></b-col>
      </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols='10'>
        <div id='ProfileDiv'>
          <h1> {{user.username}}s profilsida </h1>
          <b-form v-if='editing'>
            <label>Användarnamn:</label> 
            <b-form-input type='text' v-model='editingUser.username' :value='user.username'></b-form-input>
            <label>Mailadress:</label>
            <b-form-input type='email' v-model='editingUser.mail' :value='user.mail'></b-form-input>
            <b-btn v-on:click='editAccount'>Spara ändringar</b-btn>
            <b-btn v-b-toggle.collapseDelete variant='danger'>Ta bort konto</b-btn>
            <b-collapse id='collapseDelete' class='mt-2'>
              Är du säker på att du vill radera ditt konto? Detta kan inte ångras!
              <b-form-input type='text' v-model='closeAccountValidation' placeholder='Skriv in ditt användarnamn för att stänga av konto'></b-form-input>
            <b-btn v-b-toggle.collapseDelete variant='danger' v-on:click='closeAccount'>Radera konto</b-btn>
          </b-collapse>
          </b-form>
          <div v-else>
            <p>Användarnamn: {{user.username}}</p>
            <p>Mail: {{user.mail}} </p>
            <p>Gick med {{user.joined}} </p>
            <b-btn v-on:click='editing = true'>Ändra</b-btn>
          </div>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>

  </b-container>
</div>
  
</template>

<script>  
import {HTTP} from '@/services/Api'
export default {
  name: 'Profile',
  data () {
    return {
      warningFlash: '',
      successFlash: '',
      infoFlash: '',
      user: false,
      editing: false,
      editingUser: {
        username: '',
        mail: '',
      },
      closeAccountValidation: ''
    }
  },
    created() {
      this.user = this.$session.get('user')
      console.log('User is: ')
      console.log(this.user)
  },
  methods: {
    editAccount: function () {
      if(this.editingUser.username.length === 0) {this.editingUser.username = this.user.username}
      if(this.editingUser.mail.length === 0) {this.editingUser.mail = this.user.mail}
      let data = {
        user: this.user,
        newUsername: this.editingUser.username,
        newMail: this.editingUser.mail
      }
      return HTTP.post('editaccount', data)
      .then(response => {
        if (response.data === 'Can\'t make changes' || response.data === 'Username already in use') {
          this.infoFlash = response.data
        } else if (response.data === 'Account updated') {
          this.successFlash = response.data
        } else { console.log(response)}
      })
    },
    closeAccount: function () {
      console.log(this.closeAccountValidation)
      if (this.closeAccountValidation === this.user.username) {
        return HTTP.delete('user', { params: { user: this.user } }).then(response => {
          if (response.data === 'Account removed') {
            this.$session.destroy()
            this.$router.push({name: 'Main'})
          } else if (response.data === 'Account could not be removed') {
            this.infoFlash = response.data
          }
        })
      } else { this.infoFlash = 'Account not closed, verification failed.' }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
