import { supabase } from '@/supabase/config.js';
import { onMounted, ref } from 'vue';

const getInfo = () => {
  const fullName = ref('');
  const age = ref(0);
  const gender = ref('');
  const bloodGroup = ref('');
  const allergies = ref('');
  const diseases = ref('');
  const others = ref('');

  onMounted(async () => {
    const user = supabase.auth.user();

    const { data } = await supabase
      .from('information')
      .select('*')
      .filter('id', 'eq', user.id);

    if (data.length > 0) {
      fullName.value = data[0].full_name;
      age.value = data[0].age;
      gender.value = data[0].gender;
      bloodGroup.value = data[0].blood_group;
      allergies.value = data[0].allergies;
      diseases.value = data[0].diseases;
      others.value = data[0].others;
    }
  });

  return { fullName, age, gender, bloodGroup, allergies, diseases, others };
};

export default getInfo;
