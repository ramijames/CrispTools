<template>
  <main id="register-form" class="flex flex-col justify-center pt-20 pb-36">
    <section class="flex flex-col justify-center px-12">
      <h2 class="text-slate-900 dark:text-white text-4xl mb-2 self-center">Sign in to your account</h2>
      <p class="text-slate-500 dark:text-white/50 text-lg mb-2 self-center">Don't have an account? <router-link class="underline text-blue-500" to="/register">Register now</router-link></p>
      <!-- Sign in with Google -->
      <Button
        btnType="primary"
        btnText="Sign in with Google"
        :onClick="signInWithGoogle"
        class="self-start mt-4 mb-1 self-center"
      />
      <section class="w-full lg:w-1/2 mx-auto flex flex-row my-6 justify-center">
        <div class="flex w-1/4 h-0.5 bg-slate-100 dark:bg-slate-800 self-center"></div>
        <p class="flex text-slate-500 dark:text-white/30 text-sm uppercase self-center mx-6">Or</p>
        <div class="flex w-1/4 h-0.5 bg-slate-100 dark:bg-slate-800 self-center"></div>
      </section>

      <!-- Sign in with Email/password -->
      <input class="dark:bg-slate-900 mb-2 dark:text-white w-full lg:w-1/2 mx-auto border dark:border-slate-100/10  px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-sm shadow-black/5" type='text' placeholder="Email" v-model='email'/>
      <input class="dark:bg-slate-900 dark:text-white w-full lg:w-1/2 mx-auto border dark:border-slate-100/10  px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none text-slate-700 shadow text-slate-700 shadow-sm shadow-black/5" type='password' placeholder="Password" v-model='password'/>
      <p v-if="errMsg" class="w-full lg:w-1/2 mx-auto my-2 bg-red-500 text-white">{{ errMsg }}</p>
      <Button
            btnType="primary"
            btnText="Sign in with email"
            :onClick="signIn"
            class="self-center mt-8" 
          />
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'vue-router'
import Button from '@/components/shared/Button.vue';

const email = ref('')
const password = ref('')
const errMsg = ref()

const router = useRouter()

const signIn = () => {
  signInWithEmailAndPassword(getAuth(),email.value, password.value)
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

// Sign in with Google
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('Successfully logged in with Google!');
      router.push('/');
    })
    .catch((error) => {
      errMsg.value = 'Failed to log in with Google';
    });
};
</script>

<style scoped>


</style>