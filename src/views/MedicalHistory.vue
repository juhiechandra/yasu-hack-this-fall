<template>
  <div class="container">
    <Navbar />
    <div class="history">
      <h1>Medical History</h1>
      <div class="history__info">
        <div class="history__info--container">
          <div class="fullName">
            <label for="fullName">Full Name:</label><br />
            <input type="text" v-model="fullName" id="fullName" disabled />
          </div>

          <div class="age">
            <label for="age">Age:</label><br />
            <input type="number" v-model="age" id="age" disabled />
          </div>

          <div class="gender">
            <label for="gender">Gender:</label><br />
            <input type="text" v-model="gender" id="gender" disabled />
          </div>

          <div class="bloodGroup">
            <label for="bloodGroup">Blood Group:</label><br />
            <input type="text" v-model="bloodGroup" id="bloodGroup" disabled />
          </div>

          <div class="allergies">
            <label for="allergies">Allergies:</label><br />
            <input type="text" v-model="allergies" id="allergies" disabled />
          </div>

          <div class="disease">
            <label for="disease">Disease:</label><br />
            <input type="text" id="disease" v-model="diseases" disabled />
          </div>

          <div class="other">
            <label for="other">Others:</label><br />
            <textarea
              cols="30"
              id="other"
              rows="10"
              placeholder="Any other things...Write here"
              v-model="others"
              disabled
            ></textarea>
          </div>
        </div>

        <!-- Edit -->
        <router-link :to="{ name: 'EditProfile' }">
          <button type="submit" class="btn">Edit</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import getMedicalHistory from '@/composables/getMedicalHistory.js'

export default {
  name: 'MedicalHistory',
  components: { Navbar },
  setup() {
    const { fullName, age, gender, bloodGroup, allergies, diseases, others } =
      getMedicalHistory()

    return { fullName, age, gender, bloodGroup, allergies, diseases, others }
  },
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/_breakpoints.scss' as md;
@use '../assets/scss/_variables.scss' as var;

.container {
  display: flex;
  gap: 1.5rem;

  @include md.breakpoint(medium) {
    gap: 2.5rem;
  }

  .history {
    width: 100%;
    padding: 2.5rem 0.625rem 2.5rem 0;
    max-height: 100vh;
    overflow-y: scroll;

    @include md.breakpoint(medium) {
      padding: 2.5rem 1.625rem 2.5rem 0;
    }

    &__info {
      &--container {
        margin-top: 2.1875rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 3.125rem;

        input {
          width: 100%;

          &:disabled {
            background-color: #f8f3f3;
          }
        }

        .other {
          grid-column: 1 / 3;

          textarea {
            width: 100%;

            &:disabled {
              background-color: #f8f3f3;
            }
          }
        }
      }

      .btn {
        text-align: right;
        margin-top: 1.25rem;
      }
    }
  }
}
</style>