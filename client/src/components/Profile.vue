<template>
<div>
    <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col cols='10'>
        <div id='ProfileDiv'>
          <h1> {{user.username}}s profilsida </h1>
          <b-form v-if='editing'>
            <label>Användarnamn:</label> 
            <b-form-input type='text' v-model='editingUser.username' :value='user.username'></b-form-input>
            <label>Mailadress:</label>
            <b-form-input type='email' v-model='editingUser.mailadress' :value='user.mail'></b-form-input>
            <b-btn v-on:click='editAccount'>Spara ändringar</b-btn>
            <b-btn v-b-toggle.collapseDelete variant='danger'>Ta bort konto</b-btn>
            <b-collapse id='collapseDelete' class='mt-2'>
              Är du säker på att du vill stänga av ditt konto?
              <b-form-input type='text' v-model='closeAccountValidation' placeholder='Skriv in ditt användarnamn för att stänga av konto'></b-form-input>
            <b-btn v-b-toggle.collapseRemove variant='danger' v-on:click='closeAccount'>Stäng konto</b-btn>
          </b-collapse>
          </b-form>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>

  </b-container>
</div>
  
</template>

<script>  

export default {
  name: 'Profile',
  data () {
    return {
      user: false,
      editing: true,
      editingUser: {
        username: '',
        mailadress: '',
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
      console.log(this.editingUser)
    },
    closeAccount: function () {
      console.log(this.closeAccountValidation)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
