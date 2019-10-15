<template>
  <div class="apps">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button v-if="user.logged" class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <md-button to="/">
          <img id="logo" alt="Datacoper logo" src="../assets/logo.png">
        </md-button>
        <div class="md-toolbar-section-end">
          <md-button id="login" v-if="!user.logged" to="/login">Login</md-button>
          <md-button id="sair" v-if="user.logged" v-on:click="logoff" >Sair</md-button>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Menu</md-toolbar>

        <md-list>
          <md-list-item>
            <md-button to="/timer">
            <md-icon>timer</md-icon>
            <span>  Minhas Tarefas</span>
            </md-button>
          </md-list-item>
          <md-list-item>
            <md-button to="/task">
              <md-icon>assignment_turned_in</md-icon>
              <span>  Tarefas Redmine</span>
            </md-button>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: {
      userName: null,
      password: null,
      logged: false
    },
    menuVisible: false
  }),
  components:{
   
  },
  methods:{
    init(){
      this.user = this.$store.state.user;
    },
    logoff(){
      this.user.userName = '';
      
      this.user.password = '';
      
      this.user.logged = false;
      
      this.$store.commit('setUser', this.user);
      
      this.$router.replace('/')
    }
  },
  mounted(){
    this.init();
  }
}
</script>

<style lang="scss" scoped>
  .md-app {
    height: 100vh;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>