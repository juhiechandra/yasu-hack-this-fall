<template>
  <div class="profile">
    <div class="profile__basics">
      <h1>Basic Information</h1>
      <div class="profile__info">
        <div class="form-container">
          <div class="fullName">
            <label for="fullName">Full Name:</label><br />
            <input
              type="text"
              v-model="fullName"
              id="fullName"
              placeholder="John Doe"
              disabled
            />
          </div>

          <div class="age">
            <label for="age">Age:</label><br />
            <input
              type="number"
              v-model="age"
              id="age"
              placeholder="19"
              disabled
            />
          </div>

          <div class="gender">
            <label for="gender">Gender:</label><br />
            <input
              type="text"
              v-model="gender"
              id="gender"
              placeholder="Female"
              disabled
            />
          </div>

          <div class="bloodGroup">
            <label for="bloodGroup">Blood Group:</label><br />
            <input
              type="text"
              v-model="bloodGroup"
              id="bloodGroup"
              placeholder="B Positive"
              disabled
            />
          </div>

          <div class="allergies">
            <label for="allergies">Allergies:</label><br />
            <input
              type="text"
              v-model="allergies"
              id="allergies"
              placeholder="Peanuts"
              disabled
            />
          </div>

          <div class="disease">
            <label for="disease">Disease:</label><br />
            <input
              type="text"
              id="disease"
              placeholder="Blood Pressure, Sugar"
              v-model="diseases"
              disabled
            />
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
      </div>
    </div>
    <Appointments />
    <Medications />
  </div>
</template>

<script>
import Appointments from '../components/Appointments'
import Medications from '../components/Medications'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/supabase/config.js'

export default {
  name: 'UserProfile',
  components: { Appointments, Medications },
  setup() {
    const fullName = ref('')
    const age = ref(0)
    const gender = ref('')
    const bloodGroup = ref('')
    const allergies = ref('')
    const diseases = ref('')
    const others = ref('')
    const route = useRoute()

    onMounted(async () => {
      const { data } = await supabase
        .from('information')
        .select('*')
        .filter('id', 'eq', route.params.id)

      fullName.value = data[0].full_name
      age.value = data[0].age
      gender.value = data[0].gender
      bloodGroup.value = data[0].blood_group
      allergies.value = data[0].allergies
      diseases.value = data[0].diseases
      others.value = data[0].others
    })

    return {
      fullName,
      age,
      gender,
      bloodGroup,
      allergies,
      diseases,
      others,
    }
  },
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/_breakpoints.scss' as md;
@use '../assets/scss/_variables.scss' as var;

.profile {
  max-width: 60rem;
  margin: 0 auto;
  padding: 2.5rem 1.25rem;

  &__basics {
    div {
      .form-container {
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
    }
  }
}
</style>