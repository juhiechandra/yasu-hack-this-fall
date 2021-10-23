<template>
  <div class="container">
    <Navbar />
    <div class="history">
      <fa :icon="['fas', 'times-circle']" />
      <h1>Sorry, No History To Show...</h1>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'CardHistory',
  components: { Navbar },
  setup() {},
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/_breakpoints.scss' as md;

.container {
  display: flex;
  gap: 1.5rem;

  @include md.breakpoint(medium) {
    gap: 2.5rem;
  }

  .history {
    width: 100%;
    padding: 2.5rem 0.625rem 2.5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    max-height: 100vh;
    overflow-y: scroll;

    @include md.breakpoint(medium) {
      padding: 2.5rem 1.625rem 2.5rem 0;
    }

    svg {
      font-size: 1.6rem;
    }
  }
}
</style>