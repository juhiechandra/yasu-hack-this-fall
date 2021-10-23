<template>
  <!-- Appointments Result  -->
  <div class="appointments">
    <h1>Appointments</h1>
    <div class="appointments__result">
      <div class="appointments__result--container">
        <table>
          <tr>
            <th>Name</th>
            <th>Profession</th>
            <th>Date</th>
          </tr>
          <tr v-for="result in results" :key="result.id">
            <td>{{ result.name }}</td>
            <td>{{ result.profession }}</td>
            <td>{{ result.date }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase/config.js'
import { useRoute } from 'vue-router'

export default {
  name: 'Appointments',
  setup() {
    const results = ref([])
    const route = useRoute()

    const getAppointments = async () => {
      const { data } = await supabase.from('appointments').select('*')

      const filteredData = data.filter((result) => {
        return result.user_id === route.params.id
      })

      results.value = filteredData
    }

    onMounted(async () => {
      getAppointments()
    })

    return {
      results,
    }
  },
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/_breakpoints.scss' as md;
@use '../assets/scss/_variables.scss' as var;

.appointments {
  margin-top: 30px;

  &__result {
    margin-top: 15px;

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
</style>