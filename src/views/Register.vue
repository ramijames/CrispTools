<template>
  <main id="register-form" class="flex flex-col justify-center py-[10rem]">
    <section class="flex flex-col justify-center w-2/3 px-12">
      <h2 class="text-slate-900 dark:text-white text-4xl mb-2">Register an account</h2>
      <p class="text-slate-500 dark:text-white/50 text-lg mb-2">Already have an account? <router-link to="/sign-in">Sign in</router-link></p>
      <p class="mb-2"><input class="dark:bg-slate-900 dark:text-white w-full border dark:border-slate-100/10  px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-sm shadow-black/5" type='text' placeholder="Email" v-model='email'/></p>
      <p class="mb-2"><input class="dark:bg-slate-900 dark:text-white w-full border dark:border-slate-100/10  px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-sm shadow-black/5" type='password' placeholder="Password" v-model='password'/></p>
      <p v-if="errMsg">{{ errMsg }}</p>
      <Button
            btnType="primary"
            btnText="Register"
            :onClick="register" 
          />
    </section>
    <section class="people-box">

    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import Button from '@/components/shared/Button.vue';

const email = ref('')
const password = ref('')

const router = useRouter() // get a reference to our vue router
const register = () => {
  createUserWithEmailAndPassword(getAuth(),email.value, password.value) // need .value because ref()
  .then((data) => {
    console.log('Successfully registered!');
    router.push('/')
  })
  .catch(error => {
    console.log(error.code)
    alert(error.message);
  });
}

</script>

<style scoped>



</style>