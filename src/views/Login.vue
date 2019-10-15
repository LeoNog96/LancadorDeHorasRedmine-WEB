<template>
  <div class="login">
    <login-card @login="logon"></login-card>
  </div>
</template>

<script>
import LoginCard from '../components/user/LoginCard'

export default {
  components:{
    LoginCard,
  },
  methods:{
    logon(userLogin){

      var user = {
        userName: userLogin.userName,

        password: userLogin.password,

        logged: true,
      }
      
      this.$store.commit('setUser', user);
      
      this.$router.replace('/')
    },
  }
}
</script>

<style lang="scss" scoped>
  div {
    text-align: center;
  }
</style>