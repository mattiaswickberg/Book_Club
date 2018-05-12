<template>
<div>
  <b-container fluid>
    <b-row>
    <b-col></b-col>
    <b-col cols='8'>
      <h1>SSIS bokklubbs användare</h1>
      </b-col>
    <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols='4'>
        <div>
          <b-modal 
              id='editingUser'
              title='Edit user'
              @ok='saveUser'>
            <div class="modal-body">
              <form>
                <label>Username:</label>
                <b-form-input type='text'
                              v-model='editingUser.username'>
                </b-form-input>
                <label>Mail:</label>
                <b-form-input type='mail'
                              v-model='editingUser.mail'>
                </b-form-input>
                <label>Role:</label>
                <b-form-input type='text'
                              v-model='editingUser.role'>
                </b-form-input>
                <label>Active:</label>
                <b-form-input type='text'

                              v-model='editingUser.active'>
                </b-form-input>
                <label>Enter new Password:</label>
                <b-form-input type='password'
                              v-model='editingUser.password'>
                </b-form-input>
              </form>
        </div>
          </b-modal>
        </div>
      
        <div id='userList'>
          <div v-for='user in users' :key='user._id'>
            <br>Username: {{user.username}}
            <br>Mail: {{user.mail}}
            <br>Role: {{user.role}}
            <br>Joined: {{user.joined}}
            <br>Active:{{user.active}}
            <br>Id: {{user._id}}
            <b-btn v-b-modal.editingUser @click='userClicked(user)'>Edit User</b-btn>
          </div>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>

  </b-container>
</div>
  
</template>

<script>
import router from '@/router/index'
import {HTTP} from '@/services/Api'
export default {
  data() {
    return {
      users: [],
      modalVisible: false,
      editingUser: {
        username: '',
        role: '',
        mail: '',
        active: '',
        _id: '',
        password: ''
      }
    }
  },
  methods: {
    userClicked: function (user) {
      this.editingUser.username = user.username
      this.editingUser.role = user.role
      this.editingUser.mail = user.mail
      this.editingUser.active = user.active
      this.editingUser.password = ''
      this.editingUser._id = user._id
      this.modalVisible = true
    },
    saveUser: function() {
      console.log(this.editingUser)
      HTTP.post('/updateuser', this.editingUser).then(responce => {
        console.log(response)
      })
    }
  },
  beforeCreate: function () {
    let user = this.$session.get('user')
    if (user.role !== 'admin') {
      router.push('/')
    }
  },
  created () {
    HTTP.get('/users').then(response => {
      this.users = response.data
    })
  }
  }
</script>

<style lang="scss" scoped>
#userList {
  text-align: left;
}

.editButton {
  float: right;
}
</style>
