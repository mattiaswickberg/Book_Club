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
          <b-modal 
              id='deletingUser'
              title='Delete user'
              @ok='removeUser'>
            <div class="modal-body">
              <form>
                <label>Delete User Account for {{editingUser.username}}</label>
                <b-form-input type='text'
                              v-model='deleteuser'
                              placeholder='Type "Delete" + users username'>
                </b-form-input>
              </form>
        </div>
          </b-modal>
        </div>
      
        <div id='userList'>
          <div v-for='user in users' :key='user._id' class='editUserInfo  '>
            <div>
            <br>Username: {{user.username}}
            <br>Mail: {{user.mail}}
            <br>Role: {{user.role}}
            <br>Joined: {{user.joined}}
            <br>Active:{{user.active}}
            <br>Id: {{user._id}}
            </div>
            <div class='deleteButton'>
            <b-btn variant='danger' v-b-modal.deletingUser @click='userClicked(user)'>Delete User</b-btn>
            </div>
            <div class='editButton'>
            <b-btn v-b-modal.editingUser @click='userClicked(user)'>Edit User</b-btn>
            </div>
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
        password: '',
      },
      deleteuser: '',
      userInFocus: ''
    }
  },
  methods: {
    userClicked: function (user) {
      this.userInFocus = user
      this.editingUser.username = user.username
      this.editingUser.role = user.role
      this.editingUser.mail = user.mail
      this.editingUser.active = user.active
      this.editingUser.password = ''
      this.editingUser._id = user._id
      this.modalVisible = true
    },
    saveUser: function() {
      HTTP.post('/updateuser', this.editingUser).then(response => {
        console.log(response)
      })
    },
    removeUser: function() {
      if(this.deleteuser === 'Delete ' + this.editingUser.username) {
        HTTP.delete('user', { params: { user: this.userInFocus } }).then(response => {
          if (response.data === 'Account could not be removed') {
            this.infoFlash = response.data
          } else if (response.data === 'Account removed') {
            this.successFlash = response.data
          } else { console.log (response.data) }
      })
    }
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

.deleteButton {
  float: left;
}

.editUserInfo {
  display: inline-block;
}
</style>
