<template>
  <div class="navbar">
    <router-link class="navbar__logo" :to="{ name: 'Home' }">Yasu</router-link>
    <div class="navbar__links">
      <router-link :to="{ name: 'MedicalHistory' }">
        <fa :icon="['fas', 'book-medical']" />
      </router-link>
      <router-link :to="{ name: 'MedicalAppointments' }">
        <fa :icon="['fas', 'briefcase-medical']" />
      </router-link>
      <router-link :to="{ name: 'Medications' }">
        <fa :icon="['fas', 'prescription-bottle-alt']" />
      </router-link>
      <router-link :to="{ name: 'CardHistory' }">
        <fa :icon="['fas', 'history']" />
      </router-link>
    </div>
    <div class="navbar__profile" @click="logoutUser">
      <fa :icon="['fas', 'sign-out-alt']" />
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase/config.js'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter()

    const logoutUser = async () => {
      const { error } = await supabase.auth.signOut()
      if (!error) {
        router.push({ name: 'Login' })
      }
    }

    return { logoutUser }
  },
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/_variables.scss' as var;
@use '../assets/scss/_breakpoints.scss' as md;

.navbar {
  background: var.$darkBlue;
  padding: 2.5rem 0.625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;

  @include md.breakpoint(medium) {
    padding: 2.5rem 1.625rem;
  }

  &__logo {
    font-size: 26px;
    font-family: 'Vibur', cursive;
    color: var.$white;
  }

  &__links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.875rem;

    a {
      color: var.$white;
      font-size: 22px;

      &.router-link-exact-active {
        background-color: var.$white;
        color: var.$darkBlue;
        padding: 10px 12px;
        border-radius: 10px;
      }
    }
  }

  &__profile {
    font-size: 1.5625rem;
    cursor: pointer;
    color: var.$white;
  }
}
</style>