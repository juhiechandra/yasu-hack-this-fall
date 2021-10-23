import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import { supabase } from '@/supabase/config';

// auth guard
const requireAuth = (to, from, next) => {
  const user = supabase.auth.user();

  if (!user) {
    next({ name: 'Signup' });
  } else {
    const checkProfile = async () => {
      const { data } = await supabase
        .from('information')
        .select('full_name')
        .filter('id', 'eq', user.id);

      if (!data.length > 0) {
        next({ name: 'CreateProfile' });
      } else {
        next();
      }
    };

    checkProfile();
  }
};

const requireNoAuth = (to, from, next) => {
  const user = supabase.auth.user();

  if (user) {
    next({ name: 'Home' });
  } else {
    next();
  }
};

const createProfileAuth = (to, from, next) => {
  const user = supabase.auth.user();

  if (!user) {
    next({ name: 'Signup' });
  } else {
    const checkProfile = async () => {
      const { data } = await supabase
        .from('information')
        .select('full_name')
        .filter('id', 'eq', user.id);

      if (data.length > 0) {
        next({ name: 'Home' });
      } else {
        next();
      }
    };

    checkProfile();
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth,
    meta: {
      title: 'Yasu | Homepage',
    },
  },
  {
    path: '/create',
    name: 'CreateProfile',
    component: () =>
      import(
        /* webpackChunkName: "createProfile" */ '../views/CreateProfile.vue'
      ),
    beforeEnter: createProfileAuth,
    meta: {
      title: 'Yasu | Create Profile',
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
    beforeEnter: requireNoAuth,
    meta: {
      title: 'Yasu | Signup',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter: requireNoAuth,
    meta: {
      title: 'Yasu | Login',
    },
  },
  {
    path: '/medical-history',
    name: 'MedicalHistory',
    component: () =>
      import(
        /* webpackChunkName: "medicalHistory" */ '../views/MedicalHistory.vue'
      ),
    beforeEnter: requireAuth,
    meta: {
      title: 'Yasu | Medical History',
    },
  },
  {
    path: '/edit',
    name: 'EditProfile',
    component: () =>
      import(/* webpackChunkName: "editProfile" */ '../views/EditProfile.vue'),
    beforeEnter: requireAuth,
    meta: {
      title: 'Yasu | Edit Profile',
    },
  },
  {
    path: '/appointments',
    name: 'MedicalAppointments',
    component: () =>
      import(
        /* webpackChunkName: "medicalAppointments" */ '../views/MedicalAppointments.vue'
      ),
    beforeEnter: requireAuth,
    meta: {
      title: 'Yasu | Medical Appointments',
    },
  },
  {
    path: '/medications',
    name: 'Medications',
    component: () =>
      import(/* webpackChunkName: "medications" */ '../views/Medications.vue'),
    beforeEnter: requireAuth,
    meta: {
      title: 'Yasu | Medications',
    },
  },
  {
    path: '/history',
    name: 'CardHistory',
    component: () =>
      import(/* webpackChunkName: "cardHistory" */ '../views/CardHistory.vue'),
    beforeEnter: requireAuth,
    meta: {
      title: 'Yasu | Card History',
    },
  },
  {
    path: '/user-profile/:id',
    name: 'UserProfile',
    params: true,
    component: () =>
      import(/* webpackChunkName: "userProfile" */ '../views/UserProfile.vue'),
    meta: {
      title: 'Yasu | User Profile',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
