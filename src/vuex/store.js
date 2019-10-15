import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';


Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'user', 
  
  storage: window.localStorage,

  reducer: state => state,
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    user: {
      userName: '',
      password: '',
      logged: false,
    }
  },
  mutations: {
    setUser (state, obj) {
      state.user.userName = obj.userName;

      state.user.password = btoa(obj.password);

      state.user.logged = obj.logged;
    },
  },
  getters:{
    getRedmineAutorization: state => {
      return btoa(state.user.userName + ':') + state.user.password;
    }
  }
})