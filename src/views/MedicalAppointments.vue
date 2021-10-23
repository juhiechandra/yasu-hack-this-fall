<template>
  <div class="container">
    <Navbar />
    <div class="appointments">
      <h1>Medical Appointments</h1>
      <div class="appointments__message" v-if="isError">
        <fa :icon="['fas', 'exclamation-circle']" /> {{ message }}
      </div>
      <form class="appointments__form" @submit.prevent="handleSubmit">
        <div class="appointments__form--container">
          <div class="name">
            <label for="name">Name:</label><br />
            <input
              type="text"
              autocomplete="off"
              placeholder="Enter doctor's name"
              id="name"
              v-model="name"
            />
          </div>
          <div class="profession">
            <label for="profession">Profession:</label><br />
            <input
              type="text"
              placeholder="Enter doctor's profession"
              id="profession"
              autocomplete="off"
              v-model="profession"
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
      <div class="appointments__result">
        <div class="appointments__result--container">
          <table>
            <tr>
              <th>Name</th>
              <th>Profession</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
            <tr v-for="result in results" :key="result.id">
              <td>{{ result.name }}</td>
              <td>{{ result.profession }}</td>
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
    const profession = ref('')
    const date = ref('')
    const message = ref('')
    const isError = ref(false)
    const user = supabase.auth.user()
    const results = ref([])

    const handleSubmit = async () => {
      try {
        if (name.value === '' || profession.value === '' || date.value === '') {
          message.value = 'Please fill the form correctly'
          isError.value = true
        } else {
          const { data, error } = await supabase.from('appointments').insert([
            {
              user_id: user.id,
              name: name.value.trim(),
              profession: profession.value.trim(),
              date: date.value.trim(),
            },
          ])
          if (error) {
            message.value = error.message
            isError.value = true
          } else if (data) {
            name.value = ''
            profession.value = ''
            date.value = ''
            getAppointments()
          }
        }
      } catch (err) {
        message.value = 'Sorry, Something went wrong'
        isError.value = true
      }
    }

    const getAppointments = async () => {
      const { data } = await supabase.from('appointments').select('*')

      const filteredData = data.filter((result) => {
        return result.user_id === user.id
      })

      results.value = filteredData
    }

    onMounted(async () => {
      getAppointments()
    })

    const deleteAppointment = async (id) => {
      const { data, error } = await supabase
        .from('appointments')
        .delete()
        .match({ id: id })

      if (data) {
        getAppointments()
      } else if (error) {
        message.value = error.message
        isError.value = true
      }
    }

    return {
      name,
      profession,
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

  .appointments {
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