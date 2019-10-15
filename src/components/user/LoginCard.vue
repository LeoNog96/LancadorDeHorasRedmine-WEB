<template>
  <div class="login-card">
     <form novalidate class="md-layout" @submit.prevent="login">
      <md-card class="md-layout-item md-size-50 md-small-size-50">

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('userName')">
                <label for="user-name">Usuário</label>
                <md-input name="user-name" id="first-name" v-model="form.userName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.userName.required">Usuário é requerido</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="first-name">Senha</label>
                <md-input type="password" name="password" id="password" v-model="form.password" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.password.required">Senha é requerida</span>
                <span class="md-error" v-else-if="!$v.form.password.minlength">Senha inválida</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Entrar</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'

import {
  required,
  minLength
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data:()=>({
    form: {
      userName: null,
      password: null,
    },
    sending: false,
  }),
  validations: {
    form: {
      userName: {
        required,
       
      },
      password: {
        required,
        minLength:  minLength(8)
      },
    }
      
  },
  methods:{
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.userName = null;
      this.form.password = null;
    },
    login(){
      
      this.$v.$touch()

      if (!this.$v.$invalid) {
        
        this.sending = true;

        window.setTimeout(() => {
          this.$emit('login',this.form);
          this.sending = false
          this.clearForm()
        }, 1500)
        
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-card{
    margin-top: 10%;
    margin-left: 30%;
  }
</style>