<template>
  <div class="login">
    <div class="login__container">
      <div class="login__text">
        <h2>Login To Continue</h2>
      </div>
      <div class="login__message" v-if="isError">
        <fa :icon="['fas', 'exclamation-circle']" /> {{ message }}
      </div>
      <form class="login__form" @submit.prevent="handleSubmit">
        <div class="email">
          <label for="email">Email:</label><br />
          <input
            type="email"
            autocomplete="off"
            id="email"
            v-model="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="password">
          <label for="password">Password:</label><br />
          <input
            type="password"
            id="password"
            v-model="password"
            autocomplete="off"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="btn">Login</button>
      </form>
      <div class="login__others">
        <p>
          Don't have an account?
          <router-link :to="{ name: 'Signup' }">Signup</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/config.js'

export default {
  name: 'login',
  setup() {
    const email = ref('')
    const password = ref('')
    const isError = ref(false)
    const message = ref('')
    const router = useRouter()

    // Loging in users with email
    const handleSubmit = async () => {
      try {
        const { user, error } = await supabase.auth.signIn({
          email: email.value.trim(),
          password: password.value.trim(),
        })
        if (!error && user.aud === 'authenticated') {
          isError.value = false
          message.value = ''
          email.value = ''
          password.value = ''
          router.push({ name: 'Home' })
        } else {
          message.value = error.message
          isError.value = true
        }
      } catch (err) {
        message.value = 'Sorry, Something Went Wrong'
        isError.value = true
      }
    }
    return { email, password, isError, message, handleSubmit }
  },
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/_variables.scss' as var;
@use '@/assets/scss/_breakpoints.scss' as md;

.login {
  @include md.breakpoint(medium) {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__container {
    padding: 2rem 1.125rem;
    margin: 0 auto;

    @include md.breakpoint(medium) {
      border: 1px solid var.$darkBlue;
      padding: 2.5rem;
      border-radius: 1.5rem;
    }
  }

  &__text {
    h2 {
      text-align: center;
    }
  }

  &__message {
    width: 100%;
    margin-top: 25px;
    background: red;
    font-weight: 600;
    border-radius: 8px;
    color: var.$white;
    padding: 0.8125rem;
    margin-bottom: 1.25rem;

    svg {
      margin-right: 0.5rem;
    }
  }

  &__form {
    input {
      width: 100%;

      @include md.breakpoint(medium) {
        width: 20rem;
      }
    }

    .email {
      margin: 1.5625rem 0;
    }

    .btn {
      margin-top: 1.875rem;
      width: 100%;
    }
  }

  &__others {
    margin-top: 1.875rem;
    text-align: center;

    p {
      font-weight: 400;

      a {
        font-weight: 700;
        color: var.$darkBlue;
        text-decoration: underline;
      }
    }
  }
}
</style>