<template>
<div>
    <p>We all float down here</p>

  <form id='createAccount' action='/createaccount' method='post'>
      <div class='form-group'>
        <label for='inputEmail'>Mailadress</label>
        <input type='email' class='form-control' ref='inputEmail' placeholder='Fyll i din mailadress'>
      </div>
      <div class='form-group'>
        <label for='inputPassword1'>Password</label>
        <input type='password' class='form-control' ref='inputPassword1' placeholder='Lösenord' required>
      </div>
      <div class='form-group'>
        <label for='inputPassword2'>Repeat password</label>
        <input v-on:change='checkPassword' type='password' class='form-control' ref='inputPassword2' placeholder='Upprepa lösenord' required>
      </div>
      <button type='submit' class='btn btn-primary'>Skapa konto</button>
  </form>

</div>
</template>

<script>
export default {
  name: 'CreateAccount', 
  data () {
    return {}
  },
  methods: {
      checkPassword: function () {
        var password1 = this.$refs.inputPassword1
        var password2 = this.$refs.inputPassword2
        
        if(password1.value !== password2.value) {
          password2.setCustomValidity('Passwords don\'t match')
        }
    }, 


  }
}
</script>

<style lang="scss" scoped>

</style>
