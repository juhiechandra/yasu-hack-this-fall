<template>
  <div class="container">
    <Navbar />
    <div class="home">
      <div class="home__content">
        <h1>
          Hello <span>{{ name }}</span
          >!
        </h1>
        <h3>Welcome to Yasu 👋</h3>
      </div>
      <div class="home__tabs">
        <div class="home__dashboard">
          <h2>DASHBOARD</h2>
          <div class="home__dashboard--appointments" v-if="isAvailable">
            <h2>
              Upcoming <br />
              Appointments
            </h2>
            <div>
              <p>Name: {{ doctorName }}</p>
              <p>Profession: {{ profession }}</p>
              <p>Date: {{ date }}</p>
            </div>
          </div>
          <div class="home__dashboard--appointments" v-if="!isAvailable">
            <h2>
              No Upcoming <br />
              Appointments
            </h2>
          </div>
          <div class="home__dashboard--tabs">
            <router-link :to="{ name: 'MedicalHistory' }">
              <div class="tab">
                <fa :icon="['fas', 'book-medical']" />
                <p>Medical History</p>
              </div>
            </router-link>
            <router-link :to="{ name: 'MedicalAppointments' }">
              <div class="tab">
                <fa :icon="['fas', 'briefcase-medical']" />
                <p>Medical Appointments</p>
              </div>
            </router-link>
            <router-link :to="{ name: 'Medications' }">
              <div class="tab">
                <fa :icon="['fas', 'prescription-bottle-alt']" />
                <p>Medications</p>
              </div>
            </router-link>
            <router-link :to="{ name: 'CardHistory' }">
              <div class="tab">
                <fa :icon="['fas', 'history']" />
                <p>Card History</p>
              </div>
            </router-link>
          </div>
        </div>
        <div class="qr-code">
          <QrcodeVue :value="qrValue" size="300" level="L"></QrcodeVue>
          <div class="qr-part">
            <h2>Full Name: {{ name }}</h2>
            <h2>{{ email }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { supabase } from '@/supabase/config.js'
import { onMounted, ref } from 'vue'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'Home',
  components: { Navbar, QrcodeVue },
  setup() {
    const name = ref('')
    const doctorName = ref('')
    const date = ref('')
    const email = ref('')
    const profession = ref('')
    const isAvailable = ref(false)
    const user = supabase.auth.user()
    const qrValue = ref('')

    const getAppointments = async () => {
      const { data } = await supabase.from('appointments').select('*')

      const filteredData = data.filter((result) => {
        return result.user_id === user.id
      })

      if (filteredData) {
        isAvailable.value = true

        doctorName.value = filteredData[0].name
        date.value = filteredData[0].date
        profession.value = filteredData[0].profession
      } else {
        isAvailable.value = false
      }
    }

    onMounted(async () => {
      const user = supabase.auth.user()

      const { data } = await supabase.from('information').select('*')

      const myUser = data.filter((data) => {
        return data.id === user.id
      })

      name.value = myUser[0].full_name
      email.value = user.email

      qrValue.value = `https://peaceful-yalow-10288d.netlify.app/user-profile/${user.id}`

      getAppointments()
    })

    return { name, doctorName, date, profession, isAvailable, qrValue, email }
  },
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/_variables.scss' as var;
@use '../assets/scss/_breakpoints.scss' as md;

.container {
  display: flex;
  gap: 1.5rem;

  @include md.breakpoint(medium) {
    gap: 2.5rem;
  }

  .home {
    width: 100%;
    padding: 2.5rem 0.625rem 2.5rem 0;
    max-height: 100vh;
    overflow-y: scroll;

    @include md.breakpoint(medium) {
      padding: 2.5rem 1.625rem 2.5rem 0;
    }

    &__content {
      h1 {
        font-size: 35px;

        @include md.breakpoint(medium) {
          font-size: 45px;
        }
      }

      h3 {
        font-weight: 400;
        font-size: 20px;

        @include md.breakpoint(medium) {
          font-size: 25px;
        }
      }
    }

    &__tabs {
      margin-top: 40px;

      @include md.breakpoint(large) {
        display: flex;
        gap: 50px;
        align-items: flex-start;
      }
    }

    &__dashboard {
      background-color: var.$gray;
      border-radius: 10px;
      padding: 28px 17px;

      @include md.breakpoint(large) {
        flex: 1;
      }

      &--appointments {
        background-color: var.$purple;
        color: var.$white;
        border-radius: 10px;
        padding: 10px;
        margin-top: 15px;

        > div {
          margin-top: 10px;
        }
      }

      &--tabs {
        @include md.breakpoint(medium) {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 13px;
        }

        a {
          background-color: var.$white;
          padding: 1rem;
          border-radius: 10px;
          display: flex;
          gap: 20px;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;

          .tab {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;

            p {
              font-weight: 700;
            }
          }
        }
      }
    }

    .qr-code {
      background: linear-gradient(180deg, #967dd6 0%, #eeb1bc 100%);
      padding: 40px 10px;
      border-radius: 10px;
      margin-top: 20px;

      @include md.breakpoint(large) {
        margin-top: 0;
        display: flex;
        flex: 1;
        padding: 40px;
        justify-content: space-between;
        align-items: center;
        text-align: center;
      }

      h2 {
        color: var.$darkBlue;
        text-align: center;
        margin-top: 15px;

        @include md.breakpoint(large) {
          flex: 1;
        }
      }
    }
  }
}
</style>
