<template>
  <div class="container">
    <Navbar />
    <div class="medication">
      <h1>Medications</h1>
      <div class="medication__message" v-if="isError">
        <fa :icon="['fas', 'exclamation-circle']" /> {{ message }}
      </div>
      <form class="medication__form" @submit.prevent="handleSubmit">
        <div class="medication__form--container">
          <div class="name">
            <label for="name">Medicine Name:</label><br />
            <input
              type="text"
              autocomplete="off"
              placeholder="Enter medicine name"
              id="name"
              v-model="name"
            />
          </div>
          <div class="doctor">
            <label for="doctor">Doctor:</label><br />
            <input
              type="text"
              placeholder="Enter doctor's name"
              id="doctor"
              autocomplete="off"
              v-model="doctor"
            />
          </div>
          <div class="date">
            <label for="date">Date:</label><br />
            <input
              type="date"
              autocomplete="off"
              placeholder="Enter appointment date"
              id="date"
              v-model="date"
            />
          </div>
        </div>

        <!-- Submit -->
        <button type="submit" class="btn">Submit</button>
      </form>

      <!-- Results table -->
      <div class="medication__result">
        <div class="medication__result--container">
          <table>
            <tr>
              <th>Name</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
            <tr v-for="result in results" :key="result.id">
              <td>{{ result.name }}</td>
              <td>{{ result.doctor }}</td>
              <td>{{ result.date }}</td>
              <td width="30px">
                <fa
                  style="cursor: pointer; color: red"
                  :icon="['fas', 'times']"
                  @click="deleteAppointment(result.id)"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase/config.js'

export default {
  name: 'MedicalAppointments',
  components: { Navbar },
  setup() {
    const name = ref('')
    const doctor = ref('')
    const date = ref('')
    const message = ref('')
    const isError = ref(false)
    const user = supabase.auth.user()
    const results = ref([])

    const handleSubmit = async () => {
      try {
        if (name.value === '' || doctor.value === '' || date.value === '') {
          message.value = 'Please fill the form correctly'
          isError.value = true
        } else {
          const { data, error } = await supabase.from('medications').insert([
            {
              user_id: user.id,
              name: name.value.trim(),
              doctor: doctor.value.trim(),
              date: date.value.trim(),
            },
          ])
          if (error) {
            message.value = error.message
            isError.value = true
          } else if (data) {
            name.value = ''
            doctor.value = ''
            date.value = ''
            getMedications()
          }
        }
      } catch (err) {
        message.value = 'Sorry, Something went wrong'
        isError.value = true
      }
    }

    const getMedications = async () => {
      const { data } = await supabase.from('medications').select('*')

      const filteredData = data.filter((result) => {
        return result.user_id === user.id
      })

      results.value = filteredData
    }

    onMounted(async () => {
      getMedications()
    })

    const deleteAppointment = async (id) => {
      const { data, error } = await supabase
        .from('medications')
        .delete()
        .match({ id: id })

      if (data) {
        getMedications()
      } else if (error) {
        message.value = error.message
        isError.value = true
      }
    }

    return {
      name,
      doctor,
      date,
      handleSubmit,
      isError,
      message,
      results,
      deleteAppointment,
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

  .medication {
    width: 100%;
    padding: 2.5rem 0.625rem 2.5rem 0;
    max-height: 100vh;
    overflow-y: scroll;

    @include md.breakpoint(medium) {
      padding: 2.5rem 1.625rem 2.5rem 0;
    }

    h1 {
      @include md.breakpoint(medium) {
        text-align: center;
      }
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

    &__form {
      margin-top: 30px;

      @include md.breakpoint(medium) {
        max-width: 700px;
        margin: 30px auto 0;
      }

      &--container {
        @include md.breakpoint(medium) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        > div {
          margin-bottom: 15px;
        }
      }
    }

    &__result {
      margin-top: 30px;

      @include md.breakpoint(medium) {
        max-width: 700px;
        margin: 30px auto 0;
      }

      &--container {
        table {
          border-collapse: collapse;
          width: 100%;

          & td,
          & th {
            border: 1px solid var.$darkBlue;
            padding: 8px;
          }
        }
      }
    }
  }
}
</style>