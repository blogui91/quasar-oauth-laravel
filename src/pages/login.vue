<template lang="pug">
  div(class="login-view layout-padding")
    q-card.bg-white.card(inline)
      q-card-title
        span(my-slot="subtitle")
          h5.title.text-indigo.color-5 Login
      q-card-main
        form(@submit.prevent="authenticate")
          q-field.email(
            icon="email"
            type="email"
            label=""
            helper=""
            error-label="We need a valid email"
            )
            q-input(v-model="form.username" stack-label="Email" required)
          q-field.password(
            icon="lock"
            label=""
            helper=""
            error-label="Write a password"
          )
            q-input(type="password" v-model="form.password" stack-label="Password" required)
          .row.justify-start.items-center
            q-btn(type="submit" big class="bg-primary full-width text-white") Login
</template>
<script>
import { QInput, QField, QBtn, QCard, QCardTitle, QCardMain, Notify } from 'quasar'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    loginError () {
      Notify.create({
        message: 'Email or password incorrect',
        icon: 'lock',
        timeout: 2500,
        color: 'negative',
        textcolor: '#fff'
      })
    },
    async authenticate () {
      const { username, password } = this.form
      try {
        let authentication = await this.$oauth.login(username, password)
        let redirection = '/' // Default route
        if (this.$route.query.redirect && authentication) {
          redirection = this.$route.query.redirect
        }
        this.$router.replace(redirection)
      } catch (error) {
        // Error in Login
        console.log(error)
        this.loginError()
      }
    },
    ...mapActions('users', [])

  },
  components: {
    QField,
    QInput,
    QBtn,
    QCard,
    QCardTitle,
    QCardMain
  }
}
</script>
<style lang="scss">
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
  background-color: #ddd;
  // background: rgb(45,181,253);
  // background: linear-gradient(0deg, rgba(45,181,253,1) 10%, rgba(75,161,209,1) 25%, rgba(34,195,195,1) 92%);
  .email , .password{
    margin-bottom: 2rem;
  }
  .card {
    padding: 10px;
    min-width: 400px;
    min-height: 320px;
    .title{
      margin: 0;
      padding-left: 1rem;
      border-left: 3px solid #2546b1;
      text-transform: uppercase;
      font-weight: 500;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      letter-spacing: 1px;
    }
  }
  form {
    max-width: 420px;
  }
}
</style>
