<template>
  <main id="signin-form" class="flex flex-col justify-center py-[10rem]">
    <section class="flex flex-col justify-center w-2/3 px-12">
      <h2 class="text-slate-900 dark:text-white text-4xl mb-2">Sign in to your account</h2>
      <p class="text-slate-500 dark:text-white/50 text-lg mb-2">Don't have an account? <router-link to="/register">Register</router-link></p>
      <p class="mb-2"><input class="dark:bg-slate-900 dark:text-white w-full border dark:border-slate-100/10  px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-sm shadow-black/5" type='text' placeholder="Email" v-model='email'/></p>
      <p class="mb-2"><input class="dark:bg-slate-900 dark:text-white w-full border dark:border-slate-100/10  px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-sm shadow-black/5" type='password' placeholder="Password" v-model='password'/></p>
      <p v-if="errMsg">{{ errMsg }}</p>
      <Button
            btnType="primary"
            btnText="Sign in"
            :onClick="signIn" 
          />
    </section>
    <section class="people-box">

    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import Button from '@/components/shared/Button.vue';

const email = ref('')
const password = ref('')
const errMsg = ref() // ERROR MESSAGE

const router = useRouter() // get a reference to our vue router

const signIn = () => { // we also renamed this method 
signInWithEmailAndPassword(getAuth(),email.value, password.value) // THIS LINE CHANGED
  .then((data) => {
    console.log('Successfully logged in!');
    router.push('/')
  })
  .catch(error => {
    switch (error.code) {
      case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
      case 'auth/user-not-found':
          errMsg.value = 'No account with that email was found'
          break
      case 'auth/wrong-password':
          errMsg.value = 'Incorrect password'
          break  
      default:
          errMsg.value = 'Email or password was incorrect'
          break
    }
  });
}
</script>

<style scoped>


</style>