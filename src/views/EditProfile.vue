<template>
  <div class="container">
    <Navbar />
    <div class="edit">
      <h1>Edit Profile</h1>
      <div class="edit__message" v-if="isError">
        <fa :icon="['fas', 'exclamation-circle']" /> {{ message }}
      </div>
      <form class="edit__info" @submit.prevent="handleSubmit">
        <div class="edit__info--container">
          <div class="fullName">
            <label for="fullName">Full Name:</label><br />
            <input type="text" v-model="fullName" id="fullName" />
          </div>

          <div class="age">
            <label for="age">Age:</label><br />
            <input type="number" v-model="age" id="age" />
          </div>

          <div class="gender">
            <label for="gender">Gender:</label><br />
            <input type="text" v-model="gender" id="gender" />
          </div>

          <div class="bloodGroup">
            <label for="bloodGroup">Blood Group:</label><br />
            <input type="text" v-model="bloodGroup" id="bloodGroup" />
          </div>

          <div class="allergies">
            <label for="allergies">Allergies:</label><br />
            <input type="text" v-model="allergies" id="allergies" />
          </div>

          <div class="disease">
            <label for="disease">Disease:</label><br />
            <input type="text" id="disease" v-model="diseases" />
          </div>

          <div class="other">
            <label for="other">Others:</label><br />
            <textarea
              cols="30"
              id="other"
              rows="10"
              placeholder="Any other things...Write here"
              v-model="others"
            ></textarea>
          </div>
        </div>

        <!-- Save -->
        <button type="submit" class="btn">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import getMedicalHistory from '@/composables/getMedicalHistory.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase/config.js'

export default {
  name: 'EditProfile',
  components: { Navbar },
  setup() {
    const message = ref('')
    const isError = ref(false)
    const router = useRouter()
    const user = supabase.auth.user()

    const { fullName, age, gender, bloodGroup, allergies, diseases, others } =
      getMedicalHistory()

    const handleSubmit = async () => {
      try {
        if (
          fullName.value === '' ||
          age.value === '' ||
          gender.value === '' ||
          bloodGroup.value === '' ||
          allergies.value === '' ||
          diseases.value === '' ||
          others.value === ''
        ) {
          message.value = 'Please fill the form correctly'
          isError.value = true
        } else {
          const { data, error } = await supabase
            .from('information')
            .update([
              {
                id: user.id,
                full_name: fullName.value.trim(),
                age: age.value,
                gender: gender.value.trim(),
                blood_group: bloodGroup.value.trim(),
                allergies: allergies.value.trim(),
                diseases: diseases.value.trim(),
                others: others.value.trim(),
              },
            ])
            .match({ id: user.id })
          if (!error && data.length > 0) {
            router.push({ name: 'MedicalHistory' })
          } else {
            message.value = error.message
            isError.value = true
          }
        }
      } catch (err) {
        console.log(err.message)
        message.value = 'Sorry, Something went wrong'
        isError.value = true
      }
    }

    return {
      fullName,
      age,
      gender,
      bloodGroup,
      allergies,
      diseases,
      others,
      handleSubmit,
      message,
      isError,
    }
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

  .edit {
    width: 100%;
    padding: 2.5rem 0.625rem 2.5rem 0;
    max-height: 100vh;
    overflow-y: scroll;

    @include md.breakpoint(medium) {
      padding: 2.5rem 1.625rem 2.5rem 0;
    }

    &__message {
      width: 100%;
      background: red;
      font-weight: 600;
      border-radius: 8px;
      color: var.$white;
      padding: 0.8125rem;
      margin: 1.25rem 0;

      svg {
        margin-right: 0.5rem;
      }
    }

    &__info {
      &--container {
        margin-top: 2.1875rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 3.125rem;

        input {
          width: 100%;
        }

        .other {
          grid-column: 1 / 3;

          textarea {
            width: 100%;
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