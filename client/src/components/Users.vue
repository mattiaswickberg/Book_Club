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
          <div id="editModal" class="modal fade">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Item Clicked!</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Name: {{editingUser.username }}</p>
          <p>Description: {{ editingUser.role }}</p>
          <p>Price: {{ editingUser.mail }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Save changes</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
        </div>
        <div id='userList'>
          <div v-for='user in users' :key='user._id'>
            <br>Username: {{user.username}}
            <br>Mail: {{user.mail}}
            <br>Role: {{user.role}}
            <br>Joined: {{user.joined}}
            <br>Active:{{user.active}}
            <br>Id: {{user._id}}
            <b-btn on:click='userClicked(user)' class='editButton'>Edit User</b-btn>
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
      editingUser: {
        username: '',
        role: '',
        mail: '',
        active: '',
        id: ''
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
      $('#editModal').modal('show')
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
